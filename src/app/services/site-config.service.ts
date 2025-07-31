import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SiteConfig } from '@interface/site-config.interface';

@Injectable({
  providedIn: 'root'
})
export class SiteConfigService {
  private readonly apiUrl = environment.apiUrl || '';
  private configSubject = new BehaviorSubject<SiteConfig | null>(null);
  public config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  private loadConfig(): void {
    if (!this.apiUrl) {
      const error =
        'API URL not configured. Please set environment.apiUrl to load site configuration.';
      console.error(error);
      throw new Error(error);
    }

    this.http
      .get<SiteConfig>(`${this.apiUrl}/site-config/site/config`)
      .pipe(
        catchError((error) => {
          const errorMsg = `Failed to load site config from API: ${error.message || error}`;
          console.error(errorMsg);
          return throwError(() => new Error(errorMsg));
        }),
        tap((config) =>
          console.log('Site config loaded successfully:', config.siteName)
        )
      )
      .subscribe({
        next: (config) => {
          this.configSubject.next(config);
        },
        error: (error) => {
          console.error('Site configuration loading failed:', error);
          throw error;
        }
      });
  }
}
