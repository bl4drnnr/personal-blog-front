import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { PasswordProtectionService } from '@services/password-protection.service';
import { PasswordProtectionStatusResponse } from '@interface/password-protection-status-response.interface';
import { PasswordProtectionErrorEnum } from '@enums/password-protection-error.enum';
import { SEOService } from '@services/seo.service';

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
    heroImage: '',
    metaTitle: 'Site Protected'
  };

  passwordInput = '';
  isLoading = true;
  isSubmitting = false;
  hasError = false;
  errorMessage = '';
  isAuthenticated = false;

  constructor(
    private router: Router,
    private passwordProtectionService: PasswordProtectionService,
    private seoService: SEOService
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
        this.updateSEOData(status);

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
        // Set fallback page title even on error
        this.seoService.updatePageTitle('Site Protected');
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
          this.handlePasswordVerificationError(error.error.message);
          console.error('Password verification error:', error);
        }
      });
  }

  private handlePasswordVerificationError(
    response: PasswordProtectionErrorEnum
  ): void {
    switch (response) {
      case PasswordProtectionErrorEnum.WRONG_CREDENTIALS:
        this.errorMessage = 'Invalid password. Please try again.';
        break;
      case PasswordProtectionErrorEnum.PASSWORD_PROTECTION_DISABLED:
        this.errorMessage = 'Password protection is currently disabled.';
        break;
      default:
        this.errorMessage = 'An error occurred. Please try again later.';
    }
  }

  private updateSEOData(data: PasswordProtectionStatusResponse): void {
    if (data.metaTitle) {
      this.seoService.updatePageTitle(data.metaTitle);
    } else {
      this.seoService.updatePageTitle('Site Protected');
    }
  }

  private redirectToHome() {
    setTimeout(async () => {
      await this.router.navigate(['/']);
    }, 2000);
  }

  protected readonly fadeInUpStaggerAnimation = fadeInUpStaggerAnimation;
}
