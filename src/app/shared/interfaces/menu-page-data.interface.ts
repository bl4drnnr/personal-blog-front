import { MenuTile } from '@interface/menu-tile.interface';
import { PageSeoData } from './seo-data.interface';

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
  seoData: PageSeoData;
}
