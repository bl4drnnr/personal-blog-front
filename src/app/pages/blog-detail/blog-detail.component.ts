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
import { BlogService } from '@services/blog.service';
import { Post } from '@interface/post.interface';
import { SEOService } from '@services/seo.service';
import { Subscription } from 'rxjs';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUpStaggerAnimation]
})
export class BlogDetailComponent
  implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked
{
  post!: Post;

  get title() {
    return this.post?.title || '';
  }

  get description() {
    return this.post?.description || '';
  }

  get formattedDate() {
    return this.post ? dayjs(this.post.publishDate).format('MMMM D, YYYY') : '';
  }

  get tags() {
    return this.post?.tags || [];
  }

  get featuredImage() {
    return this.post?.featuredImage || '';
  }

  get blogContent() {
    return this.post?.content || '';
  }

  animationState = '';
  scrollProgress = 0;
  isFooterReached = false;
  toc: TocItem[] = [];
  isFullscreen = false;
  @ViewChild('contentRef', { static: false }) contentRef!: ElementRef;
  private lastContent: string = '';
  private subscription: Subscription = new Subscription();

  get processedContent(): string {
    return this.mathService.processImages(this.blogContent);
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private scrollAnimationService: ScrollAnimationService,
    private scrollUtilitiesService: ScrollUtilitiesService,
    private mathService: MathService,
    private blogService: BlogService,
    private seoService: SEOService
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

    // Load post data based on route parameter
    this.route.params.subscribe(async (params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadPost(slug);
      } else {
        await this.router.navigate(['/404']);
      }
    });
  }

  private loadPost(slug: string): void {
    this.blogService.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post = post;
        this.updateSEO();

        // Trigger content processing after data is loaded
        setTimeout(() => {
          this.buildTableOfContents();
          this.highlightAllCode();
          this.processMathInContent();
        }, 100);
      },
      error: async (error) => {
        console.error('Error loading post:', error);
        // Navigate to 404 if post not found
        await this.router.navigate(['/404']);
      }
    });
  }

  private updateSEO(): void {
    this.seoService.updateDetailPageSEO({
      title: this.post.title,
      description: this.post.description,
      featuredImage: this.post.featuredImage,
      date: this.post.publishDate,
      slug: this.post.slug,
      type: 'blog',
      updatedDate: this.post.updatedDate
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
