import { ContentItem } from './privacy-content-item.interface';

export interface PrivacyPageContent {
  title: string;
  lastUpdated: string;
  sections: Array<{
    title: string;
    content: ContentItem[];
  }>;
  cookiePolicy: {
    title: string;
    content: ContentItem[];
  };
}

export interface PrivacyLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface PrivacySeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface PrivacyPageData {
  pageContent: PrivacyPageContent;
  layoutData: PrivacyLayoutData;
  seoData: PrivacySeoData;
}
