import { Project } from './project.interface';
import { Post } from './post.interface';
import { PageSeoData } from './seo-data.interface';

export interface HomePageContent {
  title: string;
  subtitle: string;
  description: string;
  marqueeLeftText: string;
  marqueeRightText: string;
  latestProjectsTitle: string;
  latestPostsTitle: string;
  whySectionTitle: string;
  faqSectionTitle: string;
}

export interface HomeLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface HomeFaq {
  question: string;
  answer: string;
}

export interface HomeWhyBlock {
  text: string;
}

export interface HomeFeature {
  title: string;
}

export interface HomeWhysSection {
  title: string;
  whyBlocks: HomeWhyBlock[];
  features: HomeFeature[];
}

export interface HomePageData {
  title: string;
  pageContent: HomePageContent;
  layoutData: HomeLayoutData;
  seoData: PageSeoData;
  projects: Project[];
  posts: Post[];
  faqQuestions: HomeFaq[];
  whysSection: HomeWhysSection;
}
