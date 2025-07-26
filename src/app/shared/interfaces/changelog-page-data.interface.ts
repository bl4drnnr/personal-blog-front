import { ChangelogEntry } from './changelog-entry.interface';

export interface ChangelogPageContent {
  title?: string;
  content?: string;
}

export interface ChangelogLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface ChangelogSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface ChangelogPageData {
  pageContent: ChangelogPageContent;
  layoutData: ChangelogLayoutData;
  seoData: ChangelogSeoData;
  entries: ChangelogEntry[];
}
