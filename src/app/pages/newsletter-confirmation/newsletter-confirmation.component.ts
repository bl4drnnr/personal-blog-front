import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsletterService } from '@services/newsletter.service';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { ConfirmSubscriptionEnum } from '@enums/confirm-subscription.enum';

@Component({
  selector: 'page-newsletter-confirmation',
  templateUrl: './newsletter-confirmation.component.html',
  styleUrls: ['./newsletter-confirmation.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class NewsletterConfirmationComponent implements OnInit {
  animationState = '';
  isLoading: boolean = true;
  isSuccess: boolean = false;
  isError: boolean = false;
  isAlreadyConfirmed: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsletterService: NewsletterService
  ) {}

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
    await this.handleConfirmation();
  }

  private async handleConfirmation(): Promise<void> {
    const newslettersId = this.route.snapshot.queryParamMap.get('id');

    if (!newslettersId) {
      // No ID provided, redirect to main page
      await this.router.navigate(['/']);
      return;
    }

    this.confirmSubscription(newslettersId);
  }

  private confirmSubscription(newslettersId: string): void {
    this.newsletterService.confirmSubscription(newslettersId).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
        this.message =
          'Your newsletter subscription has been confirmed successfully!';
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.handleConfirmationResponse(error.error.message);
      }
    });
  }

  private handleConfirmationResponse(response: string): void {
    switch (response) {
      case ConfirmSubscriptionEnum.SUBSCRIPTION_ALREADY_CONFIRMED:
        this.isAlreadyConfirmed = true;
        this.message = 'This subscription has already been confirmed.';
        break;
      case ConfirmSubscriptionEnum.NEWSLETTER_NOT_FOUND:
        this.isError = true;
        this.message =
          'Invalid confirmation link. The subscription ID was not found.';
        break;
      default:
        this.isError = true;
        this.message = 'An unexpected response was received. Please try again.';
    }
  }

  async goHome(): Promise<void> {
    await this.router.navigate(['/']);
  }

  async goToSubscribe(): Promise<void> {
    await this.router.navigate(['/subscribe']);
  }

  getHeroTitle(): string {
    if (this.isLoading) return 'Newsletter';
    if (this.isSuccess) return 'Confirmed';
    if (this.isAlreadyConfirmed) return 'Already Confirmed';
    if (this.isError) return 'Error';
    return 'Newsletter';
  }

  getFooterText(): string {
    if (this.isLoading) return 'Confirming subscription...';
    if (this.isSuccess) return 'Subscription confirmed';
    if (this.isAlreadyConfirmed) return 'Already confirmed';
    if (this.isError) return 'Confirmation failed';
    return 'Newsletter confirmation';
  }
}
