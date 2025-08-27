import { LicenseTile } from './license-tile.interface';
import { PageSeoData } from './seo-data.interface';

export interface LicensePageContent {
  title: string;
  licenseDate: string;
  paragraphs: string[];
  additionalInfo: {
    title: string;
    paragraphs: string[];
  };
}

export interface LicenseLayoutData {
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface LicensePageData {
  pageContent: LicensePageContent;
  layoutData: LicenseLayoutData;
  seoData: PageSeoData;
  licenseTiles: LicenseTile[];
}
