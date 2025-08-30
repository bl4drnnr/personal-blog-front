import { Experience } from './experience.interface';
import { Certificate } from './certificate.interface';
import { PageSeoData } from './seo-data.interface';

export interface AboutPageContent {
  title: string;
  content: string;
}

export interface AboutLayoutData {
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface AboutPageData {
  pageContent: AboutPageContent;
  layoutData: AboutLayoutData;
  seoData: PageSeoData;
  experiences: Experience[];
  certificates: Certificate[];
}
