export interface ContactTile {
  id?: string;
  title: string;
  content: string;
  link: string;
  iconUrl?: string | null;
  sortOrder: number;
}

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
  heroImageMain: string | null;
  heroImageSecondary: string | null;
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
  ogImage: string | null;
  structuredData: any;
}

export interface ContactPageData {
  pageContent: ContactPageContent;
  layoutData: ContactPageLayout;
  seoData: ContactPageSeo;
  contactTiles: ContactTile[];
}
