export interface SubscribePageContentDto {
  title: string;
  subtitle: string;
  description: string;
  carouselWords: string[];
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
  emailPlaceholder: string;
  privacyText: string;
}

export interface SubscribePageLayoutDto {
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

export interface SubscribePageSeoDto {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: object;
}

export interface SubscribePageDataDto {
  pageContent: SubscribePageContentDto;
  layoutData: SubscribePageLayoutDto;
  seoData: SubscribePageSeoDto;
}
