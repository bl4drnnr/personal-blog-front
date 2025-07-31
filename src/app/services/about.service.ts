import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { AboutPageData } from '@interface/about-page-data.interface';

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

    return this.http.get<AboutPageData>(`${this.apiUrl}/about/about`);
  }
}
