import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { MaintenanceStatus } from '@interface/maintenance-status.interface';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getMaintenanceStatus(): Observable<MaintenanceStatus> {
    return this.http
      .get<MaintenanceStatus>(`${this.apiUrl}/maintenance/maintenance-status`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch maintenance status:', error);
          // Return default inactive status on error
          return of({
            isActive: false,
            message: 'Service temporarily unavailable',
            fromDate: new Date(),
            toDate: new Date(),
            heroImage: '',
            heroTitle: '',
            footerText: '',
            title: '',
            metaTitle: ''
          });
        })
      );
  }
}
