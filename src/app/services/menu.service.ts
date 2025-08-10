import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { MenuPageData } from '@interface/menu-page-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getMenuPageData(): Observable<MenuPageData> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<MenuPageData>(`${this.apiUrl}/menu`);
  }
}
