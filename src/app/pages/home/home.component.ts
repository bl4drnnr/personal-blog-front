import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { HomeService } from '@services/home.service';
import {
  fadeInUpStaggerAnimation,
  blogPostAnimation,
  projectAnimation
} from '@shared/animations/fade-in-up.animation';
import {
  HomePageData,
  HomeLayoutData,
  HomeFaq,
  HomeWhysSection,
  HomePageContent
} from '@interface/home-page-data.interface';
import { Project } from '@interface/project.interface';
import { Post } from '@interface/post.interface';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInUpStaggerAnimation, blogPostAnimation, projectAnimation]
})
export class HomeComponent implements OnInit {
  animationState = '';
  projectsAnimationState = '';
  postsAnimationState = '';
  error: string | null = null;

  constructor(
    private seoService: SEOService,
    private homeService: HomeService,
    private loadingService: LoadingService
  ) {}

  // Data properties - will be populated from backend API
  pageContent: HomePageContent = {
    title: '',
    subtitle: '',
    description: '',
    marqueeLeftText: '',
    marqueeRightText: '',
    latestProjectsTitle: '',
    latestPostsTitle: '',
    whySectionTitle: '',
    faqSectionTitle: ''
  };

  layoutData: HomeLayoutData = {
    footerText: '',
    heroImageMain: '',
    heroImageSecondary: '',
    heroImageMainAlt: '',
    heroImageSecondaryAlt: '',
    logoText: '',
    breadcrumbText: '',
    heroTitle: ''
  };

  projects: Project[] = [];
  posts: Post[] = [];
  faqQuestions: HomeFaq[] = [];
  whysSection: HomeWhysSection = {
    title: '',
    whyBlocks: [],
    features: []
  };

  ngOnInit() {
    this.loadHomePageData();
  }

  loadHomePageData(): void {
    this.loadingService.show();
    this.error = null;

    this.homeService.getHomePageData().subscribe({
      next: (data: HomePageData) => {
        this.pageContent = data.pageContent;
        this.layoutData = data.layoutData;
        this.projects = data.projects;
        this.posts = data.posts;
        this.faqQuestions = data.faqQuestions;
        this.whysSection = data.whysSection;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animations after data is loaded with staggered timing
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);

        // Stagger project animations to start after other content
        setTimeout(() => {
          this.projectsAnimationState = 'loaded';
        }, 600);

        // Stagger post animations to start after projects
        setTimeout(() => {
          this.postsAnimationState = 'loaded';
        }, 1200);
      },
      error: () => {
        this.error = 'Failed to load page content. Please try again later.';
        this.loadingService.hide();

        // Set fallback page title even on error
        this.seoService.updatePageTitle('Home');
      }
    });
  }

  private updateSEOData(seoData: any): void {
    if (seoData.metaTitle) {
      this.seoService.updatePageTitle(seoData.metaTitle);
    } else {
      this.seoService.updatePageTitle('Home');
    }

    if (seoData.metaDescription) {
      this.seoService.updateMetaDescription(seoData.metaDescription);
    }

    if (seoData.metaKeywords) {
      this.seoService.updateMetaKeywords(seoData.metaKeywords);
    }

    if (seoData.ogTitle || seoData.ogDescription || seoData.ogImage) {
      this.seoService.updateOpenGraphTags({
        title: seoData.ogTitle,
        description: seoData.ogDescription,
        image: seoData.ogImage,
        url: window.location.href,
        type: 'website'
      });
    }

    if (seoData.structuredData) {
      this.seoService.updateStructuredData(seoData.structuredData);
    }
  }
}
