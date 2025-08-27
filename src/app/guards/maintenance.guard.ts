import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MaintenanceService } from '@services/maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.maintenanceService.getMaintenanceStatus().pipe(
      map((status) => {
        if (status.isActive) {
          // If we're not already on the maintenance page, redirect to it
          if (this.router.url !== '/maintenance') {
            this.router.navigate(['/maintenance']);
          }
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.error('Maintenance guard error:', error);
        // Allow access if we can't check maintenance status
        return of(true);
      })
    );
  }
}
