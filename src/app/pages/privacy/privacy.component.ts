import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import {
  PrivacyLayoutData,
  PrivacyPageContent,
  PrivacyPageData
} from '@interface/privacy-page-data.interface';
import { PrivacyService } from '@services/privacy.service';

@Component({
  selector: 'page-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class PrivacyComponent implements OnInit {
  animationState = '';
  error: string | null = null;

  // Data properties - will be populated from backend API
  pageContent: PrivacyPageContent = {
    title: '',
    lastUpdated: '',
    sections: []
  };

  layoutData: PrivacyLayoutData = {
    footerText: '',
    heroImageMain: '',
    heroImageSecondary: '',
    heroImageMainAlt: '',
    heroImageSecondaryAlt: '',
    logoText: '',
    breadcrumbText: '',
    heroTitle: ''
  };

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
        this.pageContent = data.pageContent;
        this.layoutData = data.layoutData;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: () => {
        this.error =
          'Failed to load privacy policy content. Please try again later.';
        this.loadingService.hide();

        // Set fallback page title even on error
        this.seoService.updatePageTitle('Privacy Policy');
      }
    });
  }

  private updateSEOData(seoData: any): void {
    if (seoData.metaTitle) {
      this.seoService.updatePageTitle(seoData.metaTitle);
    } else {
      this.seoService.updatePageTitle('Privacy Policy');
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
