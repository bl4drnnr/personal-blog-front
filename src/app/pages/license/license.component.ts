import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { LicenseTile } from '@shared/interfaces/license-tile.interface';

@Component({
  selector: 'page-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class LicenseComponent implements OnInit {
  animationState = '';
  licenseTiles: LicenseTile[] = [
    {
      title: 'Webflow: Template Licenses',
      description:
        'Not sure where and how often you can use your Webflow template? This licensing guide breaks down all the rules for you.',
      links: [
        {
          label: 'Template Licenses',
          url: 'https://webflow.com/templates/template-licenses'
        }
      ]
    },
    {
      title: 'Fonts: Roboto Font Family',
      description:
        'These are free fonts from Google Fonts, ready to enhance your website. Discover more typography options on the Google Fonts website.',
      links: [
        {
          label: 'Google Fonts Licensing',
          url: 'https://fonts.google.com/knowledge/glossary/licensing'
        }
      ]
    },
    {
      title: 'Images: Lummi Images',
      description:
        "Everything you need to know about using Lummi's images freely.",
      links: [{ label: 'Lummi License', url: 'https://www.lummi.ai/license' }]
    },
    {
      title: 'Icons: Remix Icon',
      description:
        'RemixIcon is licensed based on the Apache License and all rights of products are reserved for RemixIcon.',
      links: [
        {
          label: 'Apache License',
          url: 'https://github.com/Remix-Design/remixicon/blob/master/License'
        }
      ]
    },
    {
      title: 'Open Logo - Free Logo Library',
      description: 'Open Logo is an open-source library of logos.',
      links: [
        {
          label: 'Licensed under CC BY 4.0',
          url: 'https://www.figma.com/community/file/978681400875967088/open-logo-free-logo-library'
        }
      ]
    },
    {
      title: 'Country Flags Icons Set',
      description: 'Free, Circular Country Flags Icons Set.',
      links: [
        {
          label: 'Licensed under CC BY 4.0',
          url: 'https://www.figma.com/community/file/1373119187969493166/country-flags-icons-set-component'
        }
      ]
    },
    {
      title: 'Pexels Video & Images',
      description:
        'All photos and videos on Pexels can be downloaded and used for free.',
      links: [
        {
          label: 'Video by Google DeepMind',
          url: 'https://www.pexels.com/video/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-explores-how-ai-can-be-used-to-progress-the-field-of-quantum-computing-it-was-created-by-bakken-and-baeck-as-part-of-t-25744127/'
        },
        {
          label: 'Photo by Google DeepMind',
          url: 'https://www.pexels.com/photo/diagram-on-white-background-25626435/'
        }
      ]
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
