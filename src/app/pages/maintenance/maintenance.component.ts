import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';
import { MaintenanceService } from '@services/maintenance.service';
import { MaintenanceStatus } from '@interface/maintenance-status.interface';
import dayjs from 'dayjs';

@Component({
  selector: 'page-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class MaintenanceComponent implements OnInit {
  animationState = '';
  maintenanceData: MaintenanceStatus = {
    isActive: false,
    message: '',
    fromDate: new Date(),
    toDate: new Date(),
    heroImage: '',
    heroTitle: '',
    footerText: '',
    title: ''
  };
  isLoading = true;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService
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
        this.maintenanceData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load maintenance data:', error);
        this.isLoading = false;
      }
    });
  }

  formatDate(date: string | Date): string {
    return dayjs(date).format('MMMM D, YYYY h:mm A');
  }
}
