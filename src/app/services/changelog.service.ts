import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { ChangelogPageData } from '@interface/changelog-page-data.interface';

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

    return this.http.get<ChangelogPageData>(
      `${this.apiUrl}/changelog/changelog`
    );
  }
}
