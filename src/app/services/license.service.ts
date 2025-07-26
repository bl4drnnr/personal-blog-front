import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { LicensePageData } from '@interface/license-page-data.interface';

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
