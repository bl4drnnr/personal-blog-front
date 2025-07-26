import { LicenseTile } from './license-tile.interface';

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
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface LicenseSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface LicensePageData {
  pageContent: LicensePageContent;
  layoutData: LicenseLayoutData;
  seoData: LicenseSeoData;
  licenseTiles: LicenseTile[];
}
