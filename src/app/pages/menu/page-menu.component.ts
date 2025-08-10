import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuTile } from '@shared/interfaces/menu-tile.interface';
import { MenuService } from '@services/menu.service';
import { SEOService } from '@services/seo.service';
import { menuTileAnimation } from '@shared/animations/fade-in-up.animation';
import { Subject, takeUntil } from 'rxjs';
import { MenuPageData } from '@interface/menu-page-data.interface';

@Component({
  selector: 'page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.scss'],
  animations: [menuTileAnimation]
})
export class PageMenuComponent implements OnInit, OnDestroy {
  animationState = '';
  menuTiles: MenuTile[] = [];
  footerText = '';
  heroImageMain = '';
  heroImageMainAlt = '';
  logoText = '';
  breadcrumbText = '';

  private destroy$ = new Subject<void>();

  constructor(
    private menuService: MenuService,
    private seoService: SEOService
  ) {}

  ngOnInit() {
    this.loadMenuPageData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMenuPageData() {
    this.menuService
      .getMenuPageData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MenuPageData) => {
          this.processMenuPageData(data);
          this.triggerAnimations();
        },
        error: (error) => {
          console.error('Error loading menu page data:', error);

          // Set fallback page title even on error
          this.seoService.updatePageTitle('Menu');

          this.triggerAnimations();
        }
      });
  }

  private processMenuPageData(data: MenuPageData) {
    // Set page data
    this.footerText = data.pageContent.footerText;
    this.heroImageMain = data.pageContent.heroImageMain;
    this.heroImageMainAlt = data.pageContent.heroImageMainAlt;
    this.logoText = data.pageContent.logoText;
    this.breadcrumbText = data.pageContent.breadcrumbText;
    this.menuTiles = data.pageContent.menuTiles;

    // Update SEO data
    this.updateSEOData(data.seoData);
  }

  private updateSEOData(seoData: any): void {
    if (seoData.metaTitle) {
      this.seoService.updatePageTitle(seoData.metaTitle);
    } else {
      this.seoService.updatePageTitle('Menu');
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

  private triggerAnimations() {
    // Trigger tile animations after view initialization
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }

  getFlowItemId(index: number): string | null {
    switch (index) {
      case 0:
        return 'menu-homepage-tile';
      case 7:
        return 'menu-style-guide-tile';
      case 11:
        return 'menu-menu-tile';
      default:
        return null;
    }
  }
}
