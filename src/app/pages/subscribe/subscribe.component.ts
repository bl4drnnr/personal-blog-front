import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '@services/newsletter.service';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { environment } from '@environments/environment';
import { SubscribePageDataDto } from '@shared/interfaces/subscribe-page-data.interface';
import { SubscribeInterface } from '@interface/subscribe.interface';

@Component({
  selector: 'page-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  email: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  // Data from API - null until loaded
  pageData: SubscribePageDataDto | null = null;

  constructor(
    private newsletterService: NewsletterService,
    private seoService: SEOService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadPageData();
  }

  private loadPageData(): void {
    this.loadingService.show();

    this.newsletterService.getSubscribePageData().subscribe({
      next: (data) => {
        this.pageData = data;
        this.updateSEO();
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error loading subscribe page data:', error);
        this.loadingService.hide();
      }
    });
  }

  private updateSEO(): void {
    if (!this.pageData) return;

    const { seoData } = this.pageData;

    this.seoService.updatePageTitle(seoData.metaTitle);
    this.seoService.updateMetaDescription(seoData.metaDescription);
    this.seoService.updateMetaKeywords(seoData.metaKeywords);

    const currentUrl = `${environment.siteUrl}/subscribe`;

    this.seoService.updateOpenGraphTags({
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      image: seoData.ogImage || '',
      url: currentUrl,
      type: 'website'
    });

    if (seoData.structuredData) {
      this.seoService.updateStructuredData(seoData.structuredData);
    }
  }

  onSubmit() {
    if (!this.email.trim()) {
      this.isError = true;
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.isError = true;
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isError = false;
    this.isSuccess = false;
    this.errorMessage = '';

    const subscribePayload: SubscribeInterface = {
      email: this.email
    };

    this.newsletterService.subscribe(subscribePayload).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isError = false;
        this.email = '';
      },
      error: (error) => {
        this.isSuccess = false;
        this.isError = true;
        this.errorMessage =
          error.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
