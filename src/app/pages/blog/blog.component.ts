import { Component, OnInit } from '@angular/core';
import { Post } from '@interface/post.interface';
import { SEOService } from '@services/seo.service';
import { BlogService, BlogPageData } from '@services/blog.service';
import { blogPostAnimation } from '@shared/animations/fade-in-up.animation';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'page-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [blogPostAnimation]
})
export class BlogComponent implements OnInit {
  animationState = '';

  // Page data from API
  blogPageData: BlogPageData = {
    pageContent: {
      title: '',
      subtitle: '',
      description: ''
    },
    layoutData: {
      footerText: '',
      heroImageMain: '',
      heroImageSecondary: '',
      heroImageMainAlt: '',
      heroImageSecondaryAlt: '',
      logoText: '',
      breadcrumbText: '',
      heroTitle: ''
    },
    seoData: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      structuredData: undefined
    },
    articles: [],
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 0,
      hasNextPage: false,
      hasPrevPage: false
    }
  };
  posts: Post[] = [];

  // Search and pagination
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 6;
  totalPages = 0;

  // Search debouncing
  private searchSubject = new Subject<string>();

  constructor(
    private seoService: SEOService,
    private blogService: BlogService
  ) {
    // Setup search debouncing
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  get paginatedPosts(): Post[] {
    return this.posts;
  }

  loadBlogData(page: number = 1, search?: string): void {
    const query = {
      page,
      limit: this.pageSize,
      search: search || undefined
    };

    this.blogService.getBlogPage(query).subscribe({
      next: (data) => {
        this.blogPageData = data;
        this.posts = data.articles;
        this.currentPage = data.pagination.currentPage;
        this.totalPages = data.pagination.totalPages;
        this.pageSize = data.pagination.itemsPerPage;

        // Update SEO data
        this.updateSEO(data);

        this.triggerAnimation();
      },
      error: (error) => {
        console.error('Error loading blog data:', error);
      }
    });
  }

  private updateSEO(data: BlogPageData): void {
    if (data.seoData) {
      this.seoService.updatePageTitle(data.seoData.metaTitle || 'Blog');
      this.seoService.updateMetaDescription(data.seoData.metaDescription || '');
      this.seoService.updateMetaKeywords(data.seoData.metaKeywords || '');
      this.seoService.updateOpenGraphTags({
        title: data.seoData.ogTitle || data.seoData.metaTitle || 'Blog',
        description:
          data.seoData.ogDescription || data.seoData.metaDescription || '',
        image: data.seoData.ogImage || '',
        url: window.location.href,
        type: 'website'
      });

      if (data.seoData.structuredData) {
        this.seoService.updateStructuredData(data.seoData.structuredData);
      }
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  private performSearch(term: string): void {
    this.currentPage = 1;
    this.loadBlogData(1, term);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBlogData(page, this.searchTerm || undefined);
  }

  private triggerAnimation(): void {
    this.animationState = '';
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 50);
  }

  ngOnInit() {
    // Load initial blog data
    this.loadBlogData(1);
  }
}
