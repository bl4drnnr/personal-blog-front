import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@interface/post.interface';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
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

  // Page data from API - null until loaded
  blogPageData: BlogPageData | null = null;
  posts: Post[] = [];

  // Search, tag filtering and pagination
  searchTerm: string = '';
  currentTag: string = '';
  currentPage = 1;
  pageSize = 6;
  totalPages = 0;

  // Search debouncing
  private searchSubject = new Subject<string>();

  constructor(
    private seoService: SEOService,
    private blogService: BlogService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
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

  loadBlogData(page: number = 1, search?: string, tag?: string): void {
    this.loadingService.show();

    const query = {
      page,
      limit: this.pageSize,
      search: search || undefined,
      tag: tag || this.currentTag || undefined
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

        this.loadingService.hide();
        this.triggerAnimation();
      },
      error: (error) => {
        console.error('Error loading blog data:', error);
        this.loadingService.hide();
      }
    });
  }

  private updateSEO(data: BlogPageData): void {
    this.seoService.updatePageTitle(data.seoData.metaTitle);
    this.seoService.updateMetaDescription(data.seoData.metaDescription);
    this.seoService.updateMetaKeywords(data.seoData.metaKeywords);
    this.seoService.updateOpenGraphTags({
      title: data.seoData.ogTitle,
      description: data.seoData.ogDescription,
      image: data.seoData.ogImage,
      url: window.location.href,
      type: 'website'
    });

    this.seoService.updateStructuredData(data.seoData.structuredData);
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
    this.loadBlogData(
      page,
      this.searchTerm || undefined,
      this.currentTag || undefined
    );
  }

  private triggerAnimation(): void {
    this.animationState = '';
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 50);
  }

  ngOnInit() {
    // Check for tag query parameter
    this.route.queryParams.subscribe((params) => {
      const tag = params['tag'];
      if (tag) {
        this.currentTag = tag;
      }

      // Load initial blog data with tag filter if present
      this.loadBlogData(1, undefined, this.currentTag || undefined);
    });
  }
}
