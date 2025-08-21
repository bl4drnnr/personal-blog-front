import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { NotFoundPageData } from '@interface/not-found-page-data.interface';

@Injectable({
  providedIn: 'root'
})
export class NotFoundService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getNotFoundPageData(): Observable<NotFoundPageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<NotFoundPageData>(
      `${this.apiUrl}/not-found/get-not-found`
    );
  }
}
