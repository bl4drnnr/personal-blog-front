import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PasswordProtectionService } from '@services/password-protection.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordProtectionGuard implements CanActivate {
  constructor(
    private passwordProtectionService: PasswordProtectionService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.passwordProtectionService.getPasswordProtectionStatus().pipe(
      switchMap((status) => {
        // If password protection is not active, allow access
        if (!status.isActive) {
          return of(true);
        }

        // If protection is active, check if user has valid token
        return this.passwordProtectionService.isTokenValid().pipe(
          map((isValid) => {
            if (isValid) {
              return true;
            }

            // If we're not already on the password protection page, redirect to it
            if (this.router.url !== '/password-protection') {
              this.router.navigate(['/password-protection']);
            }
            return false;
          })
        );
      }),
      catchError((error) => {
        console.error('Password protection guard error:', error);
        // Allow access if we can't check password protection status
        return of(true);
      })
    );
  }
}
