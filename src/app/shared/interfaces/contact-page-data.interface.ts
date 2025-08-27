import { ContactTile } from './contact-tile.interface';
import { PageSeoData } from './seo-data.interface';

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
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
  heroDesc: string;
}

export interface ContactPageData {
  pageContent: ContactPageContent;
  layoutData: ContactPageLayout;
  seoData: PageSeoData;
  contactTiles: ContactTile[];
}
