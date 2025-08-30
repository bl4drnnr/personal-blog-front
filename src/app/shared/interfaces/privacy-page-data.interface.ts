import { PageSeoData } from './seo-data.interface';

export interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

export interface PrivacyPageContent {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
}

export interface PrivacyLayoutData {
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface PrivacyPageData {
  pageContent: PrivacyPageContent;
  layoutData: PrivacyLayoutData;
  seoData: PageSeoData;
}
