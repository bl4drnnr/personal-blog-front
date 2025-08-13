import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Project } from '@interface/project.interface';
import { PageSeoData } from '@shared/interfaces/seo-data.interface';

export interface ProjectsPageData {
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
  projects: Project[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ProjectsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getProjectsPage(query: ProjectsQuery = {}): Observable<ProjectsPageData> {
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

    return this.http.get<ProjectsPageData>(`${this.apiUrl}/projects/projects`, {
      params
    });
  }

  getProjectBySlug(slug: string): Observable<Project> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Project>(`${this.apiUrl}/projects/projects/${slug}`);
  }
}
