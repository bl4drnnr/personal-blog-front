import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Post } from '@interface/post.interface';

export interface BlogPageData {
  pageContent: {
    title: string;
    subtitle: string;
    description: string;
  };
  layoutData: {
    footerText: string;
    heroImageMain: string;
    heroImageSecondary: string;
    heroImageMainAlt: string;
    heroImageSecondaryAlt: string;
    logoText: string;
    breadcrumbText: string;
    heroTitle: string;
  };
  seoData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    structuredData: any;
  };
  articles: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface BlogQuery {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getBlogPage(query: BlogQuery = {}): Observable<BlogPageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    let params = new HttpParams();

    if (query.page) {
      params = params.set('page', query.page.toString());
    }
    if (query.limit) {
      params = params.set('limit', query.limit.toString());
    }
    if (query.search) {
      params = params.set('search', query.search);
    }
    if (query.tag) {
      params = params.set('tag', query.tag);
    }

    return this.http.get<BlogPageData>(`${this.apiUrl}/blog`, { params });
  }

  getAllTags(): Observable<string[]> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<string[]>(`${this.apiUrl}/blog/tags`);
  }

  getAllPosts(): Observable<Post[]> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostBySlug(slug: string): Observable<Post> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Post>(`${this.apiUrl}/posts/${slug}`);
  }

  getPostsSlugs(): Observable<
    {
      slug: string;
      title: string;
      description: string;
      publishDate: string;
      tags: string[];
    }[]
  > {
    return this.getAllPosts().pipe(
      map((posts) =>
        posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          publishDate: post.publishDate || '',
          tags: post.tags || []
        }))
      )
    );
  }
}
