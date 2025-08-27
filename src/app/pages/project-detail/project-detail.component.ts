import hljs from 'highlight.js';
import dayjs from 'dayjs';
import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  AfterViewChecked
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollAnimationService } from '@services/scroll-animation.service';
import {
  ScrollUtilitiesService,
  TocItem
} from '@services/scroll-utilities.service';
import { MathService } from '@services/math.service';
import { ProjectsService } from '@services/projects.service';
import { LoadingService } from '@services/loading.service';
import { Project } from '@interface/project.interface';
import { SEOService } from '@services/seo.service';
import { SocialLinksService } from '@services/social-links.service';
import { SocialLink } from '@interface/social-link.interface';
import { CopyrightService } from '@services/copyright.service';
import { Copyright } from '@interface/copyright.interface';
import { Subscription } from 'rxjs';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUpStaggerAnimation]
})
export class ProjectDetailComponent
  implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked
{
  project!: Project;

  get title() {
    return this.project.title;
  }

  get description() {
    return this.project.description;
  }

  get formattedDate() {
    return dayjs(this.project.date).format('MMMM D, YYYY');
  }

  get tags() {
    return this.project.tags!;
  }

  get featuredImage() {
    return this.project.featuredImage!;
  }

  get blogContent() {
    return this.project.content!;
  }

  animationState = '';
  scrollProgress = 0;
  isFooterReached = false;
  toc: TocItem[] = [];
  isFullscreen = false;
  socialLinks: SocialLink[] = [];
  copyrightData: Copyright = {
    copyrightLinks: [],
    copyrightEmail: '',
    copyrightText: ''
  };
  @ViewChild('contentRef', { static: false }) contentRef!: ElementRef;
  private lastContent: string = '';
  private subscription: Subscription = new Subscription();

  get processedContent(): string {
    return this.mathService.processImages(this.blogContent);
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public router: Router,
    private scrollAnimationService: ScrollAnimationService,
    private scrollUtilitiesService: ScrollUtilitiesService,
    private mathService: MathService,
    private projectsService: ProjectsService,
    private loadingService: LoadingService,
    private seoService: SEOService,
    private socialLinksService: SocialLinksService,
    private copyrightService: CopyrightService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.scrollAnimationService.scrollProgress$.subscribe((progress) => {
        this.scrollProgress = progress;
        this.scrollUtilitiesService.checkFooterScroll();
      })
    );

    this.subscription.add(
      this.scrollUtilitiesService.isFooterReached$.subscribe((isReached) => {
        this.isFooterReached = isReached;
      })
    );

    this.loadSocialLinks();
    this.loadCopyrightData();

    // Load project data based on route parameter
    this.route.params.subscribe(async (params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadProject(slug);
      } else {
        // Navigate to 404 if no slug provided
        await this.router.navigate(['/404']);
      }
    });
  }

  private loadProject(slug: string): void {
    this.loadingService.show();

    this.projectsService.getProjectBySlug(slug).subscribe({
      next: (project) => {
        this.project = project;
        this.updateSEO();

        this.loadingService.hide();

        // Trigger content processing after data is loaded
        setTimeout(() => {
          this.buildTableOfContents();
          this.highlightAllCode();
          this.processMathInContent();
        }, 100);
      },
      error: async (error) => {
        console.error('Error loading project:', error);
        this.loadingService.hide();
        // Navigate to 404 for invalid slugs
        await this.router.navigate(['/404']);
      }
    });
  }

  private updateSEO(): void {
    this.seoService.updateDetailPageSEO({
      title: this.project.title,
      description: this.project.description,
      featuredImage: this.project.featuredImage,
      date: this.project.date,
      slug: this.project.slug,
      type: 'project',
      metaKeywords: this.project.metaKeywords
    });
  }

  private loadSocialLinks(): void {
    this.socialLinksService.getPublicSocialLinks().subscribe({
      next: (response) => {
        this.socialLinks = response;
      },
      error: (error) => {
        console.error('Failed to load social links:', error);
      }
    });
  }

  private loadCopyrightData(): void {
    this.copyrightService.getCopyrightData().subscribe({
      next: (response) => {
        this.copyrightData = response;
      },
      error: (error) => {
        console.error('Failed to load copyright data:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.highlightAllCode();
    this.buildTableOfContents();

    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }

  ngAfterViewChecked() {
    if (this.contentRef && this.blogContent !== this.lastContent) {
      this.highlightAllCode();
      setTimeout(() => {
        this.processMathInContent();
      }, 50);
      this.lastContent = this.blogContent;
    }
  }

  buildTableOfContents() {
    if (!this.contentRef) return;
    this.toc = this.scrollUtilitiesService.buildTableOfContents(
      this.contentRef.nativeElement
    );
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.location.replaceState(
        this.location.path(false).split('#')[0],
        '',
        '#' + id
      );
    }
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    setTimeout(() => {
      if (this.isFullscreen) {
        document.body.classList.add('blog-fullscreen-active');
      } else {
        document.body.classList.remove('blog-fullscreen-active');
      }
    }, 10);
  }

  private highlightAllCode() {
    if (this.contentRef) {
      const blocks = this.contentRef.nativeElement.querySelectorAll('pre code');
      blocks.forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
    }
  }

  private processMathInContent() {
    if (this.contentRef) {
      this.mathService.renderMathInElement(this.contentRef.nativeElement);
    }
  }
}
