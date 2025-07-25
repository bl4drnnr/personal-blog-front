export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteAuthor: string;
  siteUrl: string;
  defaultImage: string;
  keywords: string;
  socialMedia?: {
    linkedin?: string;
    github?: string;
  };
  organization?: {
    name: string;
    url: string;
    logo?: string;
  };
}
