import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { PasswordProtectionService } from '@services/password-protection.service';
import { PasswordProtectionStatusResponse } from '@interface/password-protection-status-response.interface';

@Component({
  selector: 'page-password-protection',
  templateUrl: './password-protection.component.html',
  styleUrls: ['./password-protection.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class PasswordProtectionComponent implements OnInit {
  animationState = '';
  passwordProtectionData: PasswordProtectionStatusResponse = {
    isActive: false,
    heroTitle: 'Site Protected',
    footerText: 'Please contact administrator for access',
    heroImage: ''
  };

  passwordInput = '';
  isLoading = true;
  isSubmitting = false;
  hasError = false;
  errorMessage = '';
  isAuthenticated = false;

  constructor(
    private router: Router,
    private passwordProtectionService: PasswordProtectionService
  ) {}

  ngOnInit(): void {
    this.loadPasswordProtectionData();

    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }

  private loadPasswordProtectionData() {
    this.passwordProtectionService.getPasswordProtectionStatus().subscribe({
      next: async (status) => {
        if (!status.isActive) {
          // Protection is not active, redirect to home
          await this.router.navigate(['/']);
          return;
        }

        this.passwordProtectionData = status;

        // Check if user already has a valid token
        this.passwordProtectionService.isTokenValid().subscribe({
          next: (isValidToken) => {
            if (isValidToken) {
              this.isAuthenticated = true;
              this.redirectToHome();
            }
          },
          error: (error) => {
            console.error('Error checking token validity:', error);
          }
        });

        this.isLoading = false;
      },
      error: async (error) => {
        console.error('Error loading password protection status:', error);
        await this.router.navigate(['/']);
        this.isLoading = false;
      }
    });
  }

  onPasswordInputChange(value: string) {
    this.passwordInput = value;
    this.hasError = false;
    this.errorMessage = '';
  }

  onSubmit() {
    if (!this.passwordInput || this.isSubmitting) return;

    this.isSubmitting = true;
    this.hasError = false;
    this.errorMessage = '';

    this.passwordProtectionService
      .verifyPassword(this.passwordInput)
      .subscribe({
        next: (response) => {
          // Store the access token
          this.passwordProtectionService.storeAccessToken(response.accessToken);
          this.isAuthenticated = true;
          this.redirectToHome();
          this.isSubmitting = false;
        },
        error: (error: any) => {
          this.hasError = true;
          this.isSubmitting = false;

          // TODO CHECK THIS STUPIDITY
          // TODO SEO TITLE OF THE PAGE
          if (error.status === 401 || error.status === 400) {
            this.errorMessage = 'Invalid password. Please try again.';
          } else if (error.status === 503) {
            this.errorMessage = 'Password protection is currently disabled.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }

          console.error('Password verification error:', error);
        }
      });
  }

  private redirectToHome() {
    setTimeout(async () => {
      await this.router.navigate(['/']);
    }, 2000);
  }
}
