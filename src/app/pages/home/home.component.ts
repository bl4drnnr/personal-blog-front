import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { HomeService } from '@services/home.service';
import {
  fadeInUpStaggerAnimation,
  blogPostAnimation,
  projectAnimation
} from '@shared/animations/fade-in-up.animation';
import { HomePageData } from '@interface/home-page-data.interface';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

// TODO: INTRODUCE THE SEARCH FUNCTIONALITY BY CLICKING ON TAGS AND MAKE THEM UPPER CASE
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

  // Data from API - null until loaded
  homePageData: HomePageData | null = null;

  ngOnInit() {
    this.loadHomePageData();
  }

  loadHomePageData(): void {
    this.loadingService.show();
    this.error = null;

    this.homeService.getHomePageData().subscribe({
      next: (data: HomePageData) => {
        this.homePageData = data;

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
      error: (error) => {
        console.error('Failed to load home page content:', error);
        this.error = 'Failed to load page content. Please try again later.';
        this.loadingService.hide();
      }
    });
  }

  private updateSEOData(seoData: PageSeoData): void {
    this.seoService.updatePageTitle(seoData.metaTitle);
    this.seoService.updateMetaDescription(seoData.metaDescription);
    this.seoService.updateMetaKeywords(seoData.metaKeywords);

    this.seoService.updateOpenGraphTags({
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      image: seoData.ogImage,
      url: window.location.href,
      type: 'website'
    });

    this.seoService.updateStructuredData(seoData.structuredData);
  }
}
