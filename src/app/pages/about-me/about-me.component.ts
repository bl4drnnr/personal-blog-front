import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { AboutService } from '@services/about.service';
import { AboutPageData } from '@interface/about-page-data.interface';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

@Component({
  selector: 'page-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class AboutMeComponent implements OnInit {
  animationState = '';
  error: string | null = null;

  constructor(
    private seoService: SEOService,
    private aboutService: AboutService,
    private loadingService: LoadingService
  ) {}

  // Data from API - null until loaded
  aboutPageData: AboutPageData | null = null;

  ngOnInit() {
    this.loadAboutPageData();
  }

  loadAboutPageData(): void {
    this.loadingService.show();
    this.error = null;

    this.aboutService.getAboutPageData().subscribe({
      next: (data: AboutPageData) => {
        this.aboutPageData = data;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: (error) => {
        console.error('Failed to load about page content:', error);
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
