import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services/seo.service';
import { ContactService } from '@services/contact.service';
import { ContactPageData } from '@interface/contact-page-data.interface';
import { ContactTile } from '@interface/contact-tile.interface';

@Component({
  selector: 'page-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactPageData: ContactPageData | null = null;
  loading = true;

  // Form fields
  name: string = '';
  email: string = '';
  message: string = '';
  isSubmitting: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;

  // Data properties (will be populated from backend)
  carouselWords: string[] = [];
  contactTiles: ContactTile[] = [];

  constructor(
    private seoService: SEOService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.loadContactPageData();
  }

  private loadContactPageData(): void {
    this.contactService.getContactPageData().subscribe({
      next: (data: ContactPageData) => {
        this.contactPageData = data;
        this.carouselWords = data.pageContent.carouselWords;
        // this.contactTiles = data.contactTiles;
        this.updateSEO(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading contact page data:', error);
        this.loading = false;
        // Fallback data will be used from the service
      }
    });
  }

  private updateSEO(data: ContactPageData): void {
    this.seoService.updatePageTitle(data.seoData.metaTitle);
    this.seoService.updateMetaDescription(data.seoData.metaDescription);
    this.seoService.updateMetaKeywords(data.seoData.metaKeywords);
    // this.seoService.updateOpenGraphTags(
    //   data.seoData.ogTitle,
    //   data.seoData.ogDescription,
    //   data.seoData.ogImage
    // );
    this.seoService.updateStructuredData(data.seoData.structuredData);
  }

  onSubmit(): void {
    if (!this.isFormValid() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.isSuccess = false;
    this.isError = false;

    const formData = {
      name: this.name.trim(),
      email: this.email.trim(),
      message: this.message.trim()
    };

    this.contactService.submitContactForm(formData).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isError = false;
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Contact form submission error:', error);
        this.isError = true;
        this.isSuccess = false;
        this.isSubmitting = false;
      }
    });
  }

  private isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.message.trim().length > 0 &&
      this.isValidEmail(this.email.trim())
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.message = '';
  }

  getSuccessMessage(): string {
    return (
      this.contactPageData?.pageContent.successMessage ||
      "Thank you! Your submission has been received successfully. We'll get back to you shortly—stay tuned!"
    );
  }

  getErrorMessage(): string {
    return (
      this.contactPageData?.pageContent.errorMessage ||
      'Oops! Something went wrong while submitting the form. Please fill in all fields.'
    );
  }

  getSubmitButtonText(): string {
    return this.contactPageData?.pageContent.submitButtonText || 'Submit Now';
  }
}
