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

  // Page content structure - will be populated from backend API
  pageContent = {
    title: 'MIT License',
    licenseDate: 'Copyright (c) 2025 LUCH Framework',
    paragraphs: [
      'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
      'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
      'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
    ],
    additionalInfo: {
      title: 'Additional Information',
      paragraphs: [
        'This template is built using Angular and follows modern web development practices. The design and components are created with accessibility and performance in mind.'
      ]
    }
  };

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
