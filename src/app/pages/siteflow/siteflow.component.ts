import { Component } from '@angular/core';
import { SiteflowTile } from '@shared/interfaces/siteflow-tile.interface';

@Component({
  selector: 'page-siteflow',
  templateUrl: './siteflow.component.html',
  styleUrls: ['./siteflow.component.scss']
})
export class SiteflowComponent {
  siteflowTiles: SiteflowTile[] = [
    {
      title: 'Homepage',
      link: '/',
      icon: 'home-fill.svg',
      iconAlt: 'Home'
    },
    {
      title: 'Projects',
      link: '/projects',
      icon: 'image-ai-fill.svg',
      iconAlt: 'Image AI'
    },
    {
      title: 'Blog',
      link: '/blog',
      icon: 'article-fill.svg',
      iconAlt: 'Article'
    },
    {
      title: 'Contact',
      link: '/contact',
      icon: 'contacts-fill.svg',
      iconAlt: 'Contacts'
    },
    {
      title: 'Subscribe',
      link: '/subscribe',
      icon: 'mail-add-fill.svg',
      iconAlt: 'Mail Add'
    },
    {
      title: 'Style Guide',
      link: '/legal/style-guide',
      icon: 'settings-fill.svg',
      iconAlt: 'Settings'
    },
    {
      title: 'Licenses',
      link: '/legal/licenses',
      icon: 'file-info-fill.svg',
      iconAlt: 'File Info'
    },
    {
      title: 'Instruction',
      link: '/legal/instructions',
      icon: 'questionnaire-fill.svg',
      iconAlt: 'Questionnaire'
    },
    {
      title: 'Changelog',
      link: '/legal/changelog',
      icon: 'sticky-note-fill.svg',
      iconAlt: 'Sticky Note'
    },
    {
      title: 'Siteflow',
      link: '/siteflow',
      icon: 'layout-fill.svg',
      iconAlt: 'Layout'
    }
  ];

  getFlowItemId(index: number): string | null {
    switch (index) {
      case 0:
        return 'siteflow-homepage-tile';
      case 7:
        return 'siteflow-style-guide-tile';
      case 11:
        return 'siteflow-siteflow-tile';
      default:
        return null;
    }
  }
}
