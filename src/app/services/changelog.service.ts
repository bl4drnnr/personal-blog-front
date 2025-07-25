import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { ChangelogEntry } from '@shared/interfaces/changelog-entry.interface';

export interface ChangelogPageContent {
  title?: string;
  content?: string;
}

export interface ChangelogLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface ChangelogSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface ChangelogPageData {
  pageContent: ChangelogPageContent;
  layoutData: ChangelogLayoutData;
  seoData: ChangelogSeoData;
  entries: ChangelogEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getChangelogPageData(): Observable<ChangelogPageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<ChangelogPageData>(`${this.apiUrl}/changelog`);
  }
}
