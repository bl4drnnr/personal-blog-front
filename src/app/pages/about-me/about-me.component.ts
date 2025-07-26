import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { Experience } from '@interface/experience.interface';
import { Certificate } from '@interface/certificate.interface';
import { AboutService } from '@services/about.service';
import {
  AboutLayoutData,
  AboutPageData
} from '@interface/about-page-data.interface';

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

  // Data properties - will be populated from backend API
  pageContent = {
    title: '',
    content: ''
  };

  layoutData: AboutLayoutData = {
    footerText: '',
    heroImageMain: '',
    heroImageSecondary: '',
    heroImageMainAlt: '',
    heroImageSecondaryAlt: '',
    logoText: '',
    breadcrumbText: '',
    heroTitle: '',
    contactTiles: []
  };

  experiences: Experience[] = [];
  certificates: Certificate[] = [];
  contactTiles: any[] = [];

  ngOnInit() {
    this.loadAboutPageData();
  }

  loadAboutPageData(): void {
    this.loadingService.show();
    this.error = null;

    this.aboutService.getAboutPageData().subscribe({
      next: (data: AboutPageData) => {
        this.pageContent = data.pageContent;
        this.layoutData = data.layoutData;
        this.experiences = data.experiences;
        this.certificates = data.certificates;
        this.contactTiles = data.layoutData.contactTiles || [];

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: () => {
        this.error = 'Failed to load page content. Please try again later.';
        this.loadingService.hide();

        // Set fallback page title even on error
        this.seoService.updatePageTitle('About');
      }
    });
  }

  private updateSEOData(seoData: any): void {
    if (seoData.metaTitle) {
      this.seoService.updatePageTitle(seoData.metaTitle);
    } else {
      this.seoService.updatePageTitle('About');
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
