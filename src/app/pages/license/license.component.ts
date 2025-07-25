import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { LicenseTile } from '@shared/interfaces/license-tile.interface';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import {
  LicenseService,
  LicensePageData,
  LicenseLayoutData,
  LicensePageContent
} from '@services/license.service';

@Component({
  selector: 'page-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class LicenseComponent implements OnInit {
  animationState = '';
  error: string | null = null;

  // Data properties - will be populated from backend API
  pageContent: LicensePageContent = {
    title: '',
    licenseDate: '',
    paragraphs: [],
    additionalInfo: {
      title: '',
      paragraphs: []
    }
  };

  layoutData: LicenseLayoutData = {
    footerText: '',
    heroImageMain: '',
    heroImageSecondary: '',
    heroImageMainAlt: '',
    heroImageSecondaryAlt: '',
    logoText: '',
    breadcrumbText: '',
    heroTitle: ''
  };

  licenseTiles: LicenseTile[] = [];

  constructor(
    private seoService: SEOService,
    private licenseService: LicenseService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadLicensePageData();
  }

  loadLicensePageData(): void {
    this.loadingService.show();
    this.error = null;

    this.licenseService.getLicensePageData().subscribe({
      next: (data: LicensePageData) => {
        this.pageContent = data.pageContent;
        this.layoutData = data.layoutData;
        this.licenseTiles = data.licenseTiles;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: () => {
        this.error = 'Failed to load license content. Please try again later.';
        this.loadingService.hide();

        // Set fallback page title even on error
        this.seoService.updatePageTitle('License');
      }
    });
  }

  private updateSEOData(seoData: any): void {
    if (seoData.metaTitle) {
      this.seoService.updatePageTitle(seoData.metaTitle);
    } else {
      this.seoService.updatePageTitle('License');
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
        url: window.location.href
      });
    }

    if (seoData.structuredData) {
      this.seoService.updateStructuredData(seoData.structuredData);
    }
  }
}
