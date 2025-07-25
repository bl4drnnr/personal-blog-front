import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOData } from '@interface/seo-data.interface';
import { Post } from '@interface/post.interface';
import { Project } from '@interface/project.interface';
import { SiteConfigService } from './site-config.service';
import { SiteConfig } from '@interface/site-config.interface';

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

  updateSEO(seoData: SEOData): void {
    const data = { ...this.defaultSEO, ...seoData };

    // Set title with format "siteName | pageName"
    if (data.title) {
      const siteName = this.siteConfig?.siteName || 'Personal Blog';
      const fullTitle = `${siteName} | ${data.title}`;
      this.title.setTitle(fullTitle);
    }

    // Set standard meta tags
    this.updateTag('description', data.description);
    this.updateTag('keywords', data.keywords);
    this.updateTag('author', data.author);

    // Set Open Graph meta tags
    this.updateTag('og:title', data.title, 'property');
    this.updateTag('og:description', data.description, 'property');
    this.updateTag('og:type', data.type, 'property');
    this.updateTag('og:image', data.image, 'property');
    this.updateTag('og:url', data.url, 'property');

    if (data.publishedTime) {
      this.updateTag('article:published_time', data.publishedTime, 'property');
    }
    if (data.modifiedTime) {
      this.updateTag('article:modified_time', data.modifiedTime, 'property');
    }
    if (data.section) {
      this.updateTag('article:section', data.section, 'property');
    }
    if (data.tags && data.tags.length > 0) {
      // Remove existing article:tag tags
      this.removeTag('article:tag');
      // Add new tags
      data.tags.forEach((tag) => {
        this.meta.addTag({ property: 'article:tag', content: tag });
      });
    }

    // Set canonical URL
    if (data.url) {
      this.updateLinkTag('canonical', data.url);
    }
  }

  updateForBlogPost(post: Post, fullUrl?: string): void {
    const seoData: SEOData = {
      title: post.title,
      description: post.description || post.excerpt,
      type: 'article',
      publishedTime: post.publishDate || post.date,
      modifiedTime: post.updatedDate || post.publishDate || post.date,
      section: 'Blog',
      tags: post.tags || [],
      url: fullUrl,
      image: post.featuredImage || post.imageUrl || this.defaultSEO.image
    };

    this.updateSEO(seoData);
  }

  updateForProject(project: Project, fullUrl?: string): void {
    const seoData: SEOData = {
      title: project.title,
      description: project.description || '',
      type: 'article',
      section: 'Projects',
      tags: project.tags || [],
      url: fullUrl,
      image: project.featuredImage || project.imageUrl || this.defaultSEO.image
    };

    this.updateSEO(seoData);
  }

  updatePageTitle(pageName: string): void {
    const siteName = this.siteConfig?.siteName || 'Personal Blog';
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
    title?: string;
    description?: string;
    image?: string;
    url?: string;
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

  private updateLinkTag(rel: string, href: string): void {
    // Remove existing canonical link
    const existing = document.querySelector(`link[rel="${rel}"]`);
    if (existing) {
      existing.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }

  private removeTag(selector: string): void {
    const tags = this.meta.getTags(`property="${selector}"`);
    tags.forEach((tag) => this.meta.removeTagElement(tag));
  }

  addStructuredData(
    type: 'Article' | 'BlogPosting' | 'Organization' | 'Person',
    data: any
  ): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    // Remove existing structured data of same type
    const existing = document.querySelector(
      `script[type="application/ld+json"][data-type="${type}"]`
    );
    if (existing) {
      existing.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-type', type);
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}
