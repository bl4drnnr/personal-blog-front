import { Component, Input } from '@angular/core';
import { Certificate } from '@interface/certificate.interface';

@Component({
  selector: 'certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  @Input() certificates: Certificate[] = [];

  formatDate(date: string | null): string {
    if (!date) return 'No expiration';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }

  isExpiringSoon(expirationDate: string | null): boolean {
    if (!expirationDate) return false;

    const expDate = new Date(expirationDate);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    return expDate <= threeMonthsFromNow && expDate >= today;
  }

  isExpired(expirationDate: string | null): boolean {
    if (!expirationDate) return false;

    const expDate = new Date(expirationDate);
    const today = new Date();

    return expDate < today;
  }
}
