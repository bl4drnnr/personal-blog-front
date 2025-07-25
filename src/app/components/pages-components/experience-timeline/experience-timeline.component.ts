import { Component, Input } from '@angular/core';
import { Experience } from '@interface/experience.interface';

@Component({
  selector: 'experience-timeline',
  templateUrl: './experience-timeline.component.html',
  styleUrls: ['./experience-timeline.component.scss']
})
export class ExperienceTimelineComponent {
  @Input() experiences: Experience[] = [];

  formatDate(date: string | null): string {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }

  getDateRange(startDate: string, endDate: string | null): string {
    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
  }

  getDomainFromUrl(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.startsWith('www.') ? domain.substring(4) : domain;
    } catch {
      return url;
    }
  }
}
