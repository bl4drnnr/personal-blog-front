import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { PrivacyPageData } from '@interface/privacy-page-data.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getPrivacyPageData(): Observable<PrivacyPageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<PrivacyPageData>(`${this.apiUrl}/privacy`);
  }
}
