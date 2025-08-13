import { Component, OnInit } from '@angular/core';
import { changelogStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { ChangelogPageData } from '@interface/changelog-page-data.interface';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';
import { ChangelogService } from '@services/changelog.service';

@Component({
  selector: 'page-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  animations: [changelogStaggerAnimation]
})
export class ChangelogComponent implements OnInit {
  animationState = '';
  error: string | null = null;

  // Data from API - null until loaded
  changelogPageData: ChangelogPageData | null = null;

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
        this.changelogPageData = data;

        // Update SEO data
        this.updateSEOData(data.seoData);

        this.loadingService.hide();

        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: (error) => {
        console.error('Failed to load changelog content:', error);
        this.error =
          'Failed to load changelog content. Please try again later.';
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
