import { ContactTile } from './contact-tile.interface';

export interface ContactPageContent {
  title: string;
  subtitle: string;
  description: string;
  carouselWords: string[];
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactPageLayout {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
  heroDesc: string;
}

export interface ContactPageSeo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: any;
}

export interface ContactPageData {
  pageContent: ContactPageContent;
  layoutData: ContactPageLayout;
  seoData: ContactPageSeo;
  contactTiles: ContactTile[];
}
