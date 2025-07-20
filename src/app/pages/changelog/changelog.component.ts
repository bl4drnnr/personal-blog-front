import { Component, OnInit } from '@angular/core';
import { ChangelogEntry } from '@shared/interfaces/changelog-entry.interface';

@Component({
  selector: 'page-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {
  changelogEntries: ChangelogEntry[] = [];

  ngOnInit(): void {
    this.loadChangelogEntries();
  }

  private loadChangelogEntries(): void {
    this.changelogEntries = [
      {
        id: '1',
        version: '1.1.0',
        date: 'February 2025',
        title: 'Enhanced User Experience',
        description:
          'Minor improvements to the overall appearance and performance of the template.',
        changes: [
          'Added lightbox gallery and description block to blog and project collection pages',
          'Improved responsive design for mobile devices',
          'Enhanced navigation accessibility',
          'Optimized loading performance'
        ]
      },
      {
        id: '2',
        version: '1.0.0',
        date: 'January 2025',
        title: 'Initial Release',
        description: 'The template has been released!',
        changes: [
          'Complete website launch',
          'Blog functionality with dynamic content',
          'Projects showcase with detailed pages',
          'Contact form implementation',
          'Responsive design for all devices',
          'Modern UI with smooth animations',
          'SEO optimization',
          'Analytics integration'
        ]
      }
    ];

    // Sort by date (newest first)
    this.changelogEntries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
