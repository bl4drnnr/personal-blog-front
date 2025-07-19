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
      iconAlt: 'Home',
      description: 'LUCH Framework'
    },
    {
      title: 'Projects',
      link: '/projects',
      icon: 'image-ai-fill.svg',
      iconAlt: 'Image AI',
      isPrimary: true,
      tag: 'New!',
      description: 'A collection of AI-driven designs'
    },
    {
      title: 'Blog',
      link: '/blog',
      icon: 'article-fill.svg',
      iconAlt: 'Article',
      isSecondary: true,
      description: 'Thoughts, insights and ideas on AI, design and creativity'
    },
    {
      title: 'Contact',
      link: '/contact',
      icon: 'contacts-fill.svg',
      iconAlt: 'Contacts',
      description: "Let's connect!"
    },
    {
      title: 'Subscribe',
      link: '/subscribe',
      icon: 'mail-add-fill.svg',
      iconAlt: 'Mail Add',
      description: 'Stay Updated'
    },
    {
      title: '404 Page',
      link: '/404',
      icon: 'error-warning-fill.svg',
      iconAlt: 'Error Warning',
      isPrimaryShadow: true
    },
    {
      title: 'Password',
      link: '/401',
      icon: 'lock-unlock-fill.svg',
      iconAlt: 'Lock Unlock',
      isPrimaryShadow: true
    },
    {
      title: 'Style Guide',
      link: '/legal/style-guide',
      icon: 'settings-fill.svg',
      iconAlt: 'Settings',
      isPrimaryShadow: true
    },
    {
      title: 'Licenses',
      link: '/legal/licenses',
      icon: 'file-info-fill.svg',
      iconAlt: 'File Info',
      isPrimaryShadow: true
    },
    {
      title: 'Instruction',
      link: '/legal/instructions',
      icon: 'questionnaire-fill.svg',
      iconAlt: 'Questionnaire',
      isPrimaryShadow: true
    },
    {
      title: 'Changelog',
      link: '/legal/changelog',
      icon: 'sticky-note-fill.svg',
      iconAlt: 'Sticky Note',
      isPrimaryShadow: true
    },
    {
      title: 'Siteflow',
      link: '/siteflow',
      icon: 'layout-fill.svg',
      iconAlt: 'Layout',
      isPrimaryShadow: true
    }
  ];
}
