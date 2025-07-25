import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Experience } from '@interface/experience.interface';
import { Certificate } from '@interface/certificate.interface';

export interface AboutPageContent {
  title: string;
  content: string;
}

export interface AboutLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
  contactTiles: any[];
}

export interface AboutSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface AboutPageData {
  pageContent: AboutPageContent;
  layoutData: AboutLayoutData;
  seoData: AboutSeoData;
  experiences: Experience[];
  certificates: Certificate[];
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getAboutPageData(): Observable<AboutPageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<AboutPageData>(`${this.apiUrl}/about`);
  }
}
