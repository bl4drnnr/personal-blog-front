export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteAuthor: string;
  siteUrl: string;
  defaultImage: string;
  keywords: string;
  twitterHandle?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  organization?: {
    name: string;
    url: string;
    logo?: string;
  };
}
