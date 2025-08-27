import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { LicensePageData } from '@interface/license-page-data.interface';
import { LicenseService } from '@services/license.service';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

@Component({
  selector: 'page-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class LicenseComponent implements OnInit {
  animationState = '';
  error: string | null = null;

  // Data from API - null until loaded
  licensePageData: LicensePageData | null = null;

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
        this.licensePageData = data;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: (error) => {
        console.error('Failed to load license content:', error);
        this.error = 'Failed to load license content. Please try again later.';
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
