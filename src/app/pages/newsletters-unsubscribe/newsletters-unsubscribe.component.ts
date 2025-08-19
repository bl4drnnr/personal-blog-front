import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsletterService } from '@services/newsletter.service';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { UnsubscribeNewsletterEnum } from '@enums/unsubscribe-newsletter.enum';

@Component({
  selector: 'page-newsletters-unsubscribe',
  templateUrl: './newsletters-unsubscribe.component.html',
  styleUrls: ['./newsletters-unsubscribe.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class NewslettersUnsubscribeComponent implements OnInit {
  animationState = '';
  isLoading: boolean = true;
  isSuccess: boolean = false;
  isError: boolean = false;
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
    await this.handleUnsubscribe();
  }

  private async handleUnsubscribe(): Promise<void> {
    const newslettersId = this.route.snapshot.queryParamMap.get('id');

    if (!newslettersId) {
      // No ID provided, redirect to main page
      await this.router.navigate(['/']);
      return;
    }

    this.unsubscribeFromNewsletter(newslettersId);
  }

  private unsubscribeFromNewsletter(newslettersId: string): void {
    this.newsletterService.unsubscribeFromNewsletter(newslettersId).subscribe({
      next: () => {
        this.isSuccess = true;
        this.message =
          'You have been successfully unsubscribed from our newsletter!';
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.handleUnsubscribeResponse(error.error.message);
      }
    });
  }

  private handleUnsubscribeResponse(response: UnsubscribeNewsletterEnum): void {
    switch (response) {
      case UnsubscribeNewsletterEnum.NEWSLETTER_NOT_FOUND:
        this.isError = true;
        this.message =
          'Invalid unsubscribe link. The subscription ID was not found.';
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
    if (this.isSuccess) return 'Unsubscribed';
    if (this.isError) return 'Error';
    return 'Newsletter';
  }

  getFooterText(): string {
    if (this.isLoading) return 'Processing unsubscribe request...';
    if (this.isSuccess) return 'Unsubscription confirmed';
    if (this.isError) return 'Unsubscribe failed';
    return 'Newsletter unsubscribe';
  }
}
