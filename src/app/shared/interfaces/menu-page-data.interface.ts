import { MenuTile } from '@interface/menu-tile.interface';

export interface MenuPageData {
  pageContent: {
    footerText: string;
    heroImageMain: string;
    heroImageMainAlt: string;
    logoText: string;
    breadcrumbText: string;
    menuTiles: MenuTile[];
  };
  layoutData: {
    footerText: string;
    heroImageMain: string;
    heroImageMainAlt: string;
    logoText: string;
    breadcrumbText: string;
  };
  seoData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    structuredData: any;
  };
}
