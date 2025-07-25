import { Component, OnInit } from '@angular/core';
import { ChangelogEntry } from '@shared/interfaces/changelog-entry.interface';
import { changelogStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import {
  ChangelogService,
  ChangelogPageData,
  ChangelogLayoutData,
  ChangelogPageContent
} from '@services/changelog.service';

@Component({
  selector: 'page-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  animations: [changelogStaggerAnimation]
})
export class ChangelogComponent implements OnInit {
  animationState = '';
  error: string | null = null;
  changelogEntries: ChangelogEntry[] = [];

  // Data properties - will be populated from backend API
  pageContent: ChangelogPageContent = {
    title: '',
    content: ''
  };

  layoutData: ChangelogLayoutData = {
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
    private changelogService: ChangelogService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadChangelogPageData();
  }

  loadChangelogPageData(): void {
    this.loadingService.show();
    this.error = null;

    this.changelogService.getChangelogPageData().subscribe({
      next: (data: ChangelogPageData) => {
        this.pageContent = data.pageContent;
        this.layoutData = data.layoutData;
        this.changelogEntries = data.entries;

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
          'Failed to load changelog content. Please try again later.';
        this.loadingService.hide();

        // Set fallback page title even on error
        this.seoService.updatePageTitle('Changelog');
      }
    });
  }

  private updateSEOData(seoData: any): void {
    if (seoData.metaTitle) {
      this.seoService.updatePageTitle(seoData.metaTitle);
    } else {
      this.seoService.updatePageTitle('Changelog');
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
