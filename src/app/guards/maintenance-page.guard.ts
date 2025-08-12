import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MaintenanceService } from '@services/maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenancePageGuard implements CanActivate {
  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.maintenanceService.getMaintenanceStatus().pipe(
      map((status) => {
        if (!status.isActive) {
          // If maintenance mode is off, redirect to home page
          this.router.navigate(['/']);
          return false;
        }
        // Allow access to maintenance page when maintenance is active
        return true;
      }),
      catchError((error) => {
        console.error('Maintenance page guard error:', error);
        // If we can't check maintenance status, redirect to home for safety
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
