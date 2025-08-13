import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceStatus } from '@interface/maintenance-status.interface';
import { SEOService } from '@services/seo.service';
import dayjs from 'dayjs';

@Component({
  selector: 'page-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class MaintenanceComponent implements OnInit {
  animationState = '';
  // Data from API - null until loaded
  maintenanceData: MaintenanceStatus | null = null;
  isLoading = true;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    private seoService: SEOService
  ) {}

  async goToMainPage() {
    await this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loadMaintenanceData();

    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }

  private loadMaintenanceData() {
    this.maintenanceService.getMaintenanceStatus().subscribe({
      next: (data) => {
        console.log('data', data);
        this.maintenanceData = data;
        this.updateSEOData(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load maintenance data:', error);
        // Set fallback page title even on error
        this.seoService.updatePageTitle('Site Under Maintenance');
        this.isLoading = false;
      }
    });
  }

  private updateSEOData(data: MaintenanceStatus): void {
    if (data.metaTitle) {
      this.seoService.updatePageTitle(data.metaTitle);
    } else {
      this.seoService.updatePageTitle('Site Under Maintenance');
    }
  }

  formatDate(date: string | Date): string {
    return dayjs(date).format('MMMM D, YYYY h:mm A');
  }
}
