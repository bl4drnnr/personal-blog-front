import { ChangelogEntry } from './changelog-entry.interface';
import { PageSeoData } from './seo-data.interface';

export interface ChangelogLayoutData {
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface ChangelogPageData {
  layoutData: ChangelogLayoutData;
  seoData: PageSeoData;
  entries: ChangelogEntry[];
}
