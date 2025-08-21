import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { NotFoundService } from '@services/not-found.service';
import { SEOService } from '@services/seo.service';
import { LoadingService } from '@services/loading.service';
import { NotFoundPageData } from '@interface/not-found-page-data.interface';

@Component({
  selector: 'page-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class NotFoundComponent implements OnInit {
  animationState = '';

  // Data from API - null until loaded
  notFoundPageData: NotFoundPageData | null = null;

  constructor(
    private router: Router,
    private notFoundService: NotFoundService,
    private seoService: SEOService,
    private loadingService: LoadingService
  ) {}

  async goToMainPage() {
    await this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.loadNotFoundPageData();
  }

  loadNotFoundPageData(): void {
    this.loadingService.show();

    this.notFoundService.getNotFoundPageData().subscribe({
      next: (data: NotFoundPageData) => {
        this.notFoundPageData = data;
        // Set page title
        this.seoService.updatePageTitle(data.pageContent.title);
        this.loadingService.hide();
        // Trigger animation after data is loaded
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      },
      error: (error) => {
        console.error('Failed to load not found page content:', error);
        this.loadingService.hide();

        // Still trigger animation even on error with fallback data
        setTimeout(() => {
          this.animationState = 'loaded';
        }, 100);
      }
    });
  }
}
