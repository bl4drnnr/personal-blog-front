import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Project } from '@interface/project.interface';

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
  seoData: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    structuredData: any;
  };
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

    return this.http.get<ProjectsPageData>(`${this.apiUrl}/projects`, {
      params
    });
  }

  getAllProjects(): Observable<Project[]> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Project[]>(`${this.apiUrl}/projects/slugs`);
  }

  getProjectBySlug(slug: string): Observable<Project> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Project>(`${this.apiUrl}/projects/${slug}`);
  }

  getProjectsSlugs(): Observable<
    {
      slug: string;
      title: string;
      description: string;
      date: string;
      tags: string[];
    }[]
  > {
    return this.getAllProjects().pipe(
      map((projects) =>
        projects.map((project) => ({
          slug: project.slug,
          title: project.title,
          description: project.description,
          date: project.date,
          tags: project.tags
        }))
      )
    );
  }
}
