import { Experience } from './experience.interface';
import { Certificate } from './certificate.interface';

export interface AboutPageContent {
  title: string;
  content: string;
}

export interface AboutLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
  contactTiles: any[];
}

export interface AboutSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface AboutPageData {
  pageContent: AboutPageContent;
  layoutData: AboutLayoutData;
  seoData: AboutSeoData;
  experiences: Experience[];
  certificates: Certificate[];
}
