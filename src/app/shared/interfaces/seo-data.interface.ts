export interface StructuredData {
  '@context': string;
  '@type': string;
  headline?: string;
  name?: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished?: string;
  dateModified?: string;
  dateCreated?: string;
  image: string;
  url: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  organization: {
    url: string;
    name: string;
    logo: string;
  };
  // Allow additional properties for dynamic structured data
  [key: string]: any;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  image: string;
  url: string;
  type: 'website' | 'article';
  publishedTime: string;
  modifiedTime: string;
  section: string;
  tags: string[];
}

export interface PageSeoData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: StructuredData;
}
