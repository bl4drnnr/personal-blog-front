import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuTile } from '@shared/interfaces/menu-tile.interface';
import { MenuService } from '@services/menu.service';
import { SEOService } from '@services/seo.service';
import { menuTileAnimation } from '@shared/animations/fade-in-up.animation';
import { Subject, takeUntil } from 'rxjs';
import { MenuPageData } from '@interface/menu-page-data.interface';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

@Component({
  selector: 'page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.scss'],
  animations: [menuTileAnimation]
})
export class PageMenuComponent implements OnInit, OnDestroy {
  animationState = '';
  menuTiles: MenuTile[] = [];
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
    this.heroImageMain = data.pageContent.heroImageMain;
    this.heroImageMainAlt = data.pageContent.heroImageMainAlt;
    this.logoText = data.pageContent.logoText;
    this.breadcrumbText = data.pageContent.breadcrumbText;
    this.menuTiles = data.pageContent.menuTiles;

    // Update SEO data
    this.updateSEOData(data.seoData);
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
