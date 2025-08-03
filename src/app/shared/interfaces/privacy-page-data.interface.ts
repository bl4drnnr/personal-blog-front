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
