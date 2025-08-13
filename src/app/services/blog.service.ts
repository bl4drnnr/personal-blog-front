import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Post } from '@interface/post.interface';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

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
  seoData: PageSeoData;
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

    return this.http.get<BlogPageData>(`${this.apiUrl}/articles/blog`, {
      params
    });
  }

  getPostBySlug(slug: string): Observable<Post> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Post>(`${this.apiUrl}/articles/posts/${slug}`);
  }
}
