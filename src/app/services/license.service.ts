import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { LicenseTile } from '@shared/interfaces/license-tile.interface';

export interface LicensePageContent {
  title: string;
  licenseDate: string;
  paragraphs: string[];
  additionalInfo: {
    title: string;
    paragraphs: string[];
  };
}

export interface LicenseLayoutData {
  footerText: string;
  heroImageMain: string;
  heroImageSecondary: string;
  heroImageMainAlt: string;
  heroImageSecondaryAlt: string;
  logoText: string;
  breadcrumbText: string;
  heroTitle: string;
}

export interface LicenseSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

export interface LicensePageData {
  pageContent: LicensePageContent;
  layoutData: LicenseLayoutData;
  seoData: LicenseSeoData;
  licenseTiles: LicenseTile[];
}

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getLicensePageData(): Observable<LicensePageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<LicensePageData>(`${this.apiUrl}/license`);
  }
}
