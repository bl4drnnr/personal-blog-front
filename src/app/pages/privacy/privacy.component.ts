import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { PrivacyPageData } from '@interface/privacy-page-data.interface';
import { PrivacyService } from '@services/privacy.service';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

@Component({
  selector: 'page-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class PrivacyComponent implements OnInit {
  animationState = '';
  error: string | null = null;

  // Data from API - null until loaded
  privacyPageData: PrivacyPageData | null = null;

  constructor(
    private seoService: SEOService,
    private privacyService: PrivacyService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadPrivacyPageData();
  }

  loadPrivacyPageData(): void {
    this.loadingService.show();
    this.error = null;

    this.privacyService.getPrivacyPageData().subscribe({
      next: (data: PrivacyPageData) => {
        this.privacyPageData = data;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: (error) => {
        console.error('Failed to load privacy policy content:', error);
        this.error =
          'Failed to load privacy policy content. Please try again later.';
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
