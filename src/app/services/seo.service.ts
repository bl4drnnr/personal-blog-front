import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SiteConfigService } from './site-config.service';
import { SiteConfig } from '@interface/site-config.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private siteConfig: SiteConfig | null = null;

  constructor(
    private meta: Meta,
    private title: Title,
    private siteConfigService: SiteConfigService
  ) {
    // Subscribe to site config changes
    this.siteConfigService.config$.subscribe((config) => {
      this.siteConfig = config;
    });
  }

  private get defaultSEO() {
    if (!this.siteConfig) {
      const error =
        'Site configuration not available. SEO service requires site configuration to be loaded first.';
      console.error(error);
      throw new Error(error);
    }

    return {
      title: this.siteConfig.siteName,
      description: this.siteConfig.siteDescription,
      author: this.siteConfig.siteAuthor,
      image: this.siteConfig.defaultImage,
      type: 'website' as const,
      keywords: this.siteConfig.keywords
    };
  }

  updatePageTitle(pageName: string): void {
    const siteName = this.siteConfig?.siteName;
    const fullTitle = `${siteName} | ${pageName}`;
    this.title.setTitle(fullTitle);
  }

  updateMetaDescription(description: string): void {
    this.updateTag('description', description);
  }

  updateMetaKeywords(keywords: string): void {
    this.updateTag('keywords', keywords);
  }

  updateOpenGraphTags(ogData: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  }): void {
    if (ogData.title) {
      this.updateTag('og:title', ogData.title, 'property');
    }
    if (ogData.description) {
      this.updateTag('og:description', ogData.description, 'property');
    }
    if (ogData.image) {
      this.updateTag('og:image', ogData.image, 'property');
    }
    if (ogData.url) {
      this.updateTag('og:url', ogData.url, 'property');
    }
    if (ogData.type) {
      this.updateTag('og:type', ogData.type, 'property');
    }
  }

  updateStructuredData(structuredData: any): void {
    // Remove existing structured data
    const existing = document.querySelector(
      'script[type="application/ld+json"][data-about="true"]'
    );
    if (existing) {
      existing.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-about', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  updateDetailPageSEO(params: {
    title: string;
    description: string;
    featuredImage?: string;
    date: string;
    slug: string;
    type: 'blog' | 'project';
    updatedDate?: string;
  }): void {
    if (!this.siteConfig) return;

    const { title, description, featuredImage, date, slug, type, updatedDate } =
      params;
    const urlPath = type === 'blog' ? 'blog' : 'projects';
    const fullUrl = `${environment.siteUrl}/${urlPath}/${slug}`;
    const suffix = type === 'blog' ? 'Blog' : 'Project';

    // Update basic SEO
    this.updatePageTitle(`${title} - ${suffix}`);
    this.updateMetaDescription(description);

    // Update Open Graph tags
    this.updateOpenGraphTags({
      title,
      description,
      image: featuredImage || this.siteConfig.defaultImage,
      url: fullUrl,
      type: 'article'
    });

    // Add structured data for better SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'blog' ? 'BlogPosting' : 'CreativeWork',
      ...(type === 'blog' ? { headline: title } : { name: title }),
      description,
      author: {
        '@type': 'Person',
        name: this.siteConfig.siteAuthor
      },
      ...(type === 'blog'
        ? {
            datePublished: date,
            dateModified: updatedDate || date
          }
        : {
            dateCreated: date,
            datePublished: date
          }),
      image: featuredImage || this.siteConfig.defaultImage,
      url: fullUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      },
      publisher: this.siteConfig?.organization || {
        '@type': 'Organization',
        name: this.siteConfig?.siteName,
        url: this.siteConfig?.siteUrl || environment.siteUrl
      }
    };

    this.updateStructuredData(structuredData);
  }

  private updateTag(
    name: string,
    content: string | undefined,
    attribute: 'name' | 'property' = 'name'
  ): void {
    if (content) {
      const selector = `${attribute}="${name}"`;
      if (this.meta.getTag(selector)) {
        this.meta.updateTag({ [attribute]: name, content });
      } else {
        this.meta.addTag({ [attribute]: name, content });
      }
    }
  }
}
