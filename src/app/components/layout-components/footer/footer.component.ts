import { Component, Input } from '@angular/core';
import { SocialLink } from '@interface/social-link.interface';
import { FooterLink } from '@interface/footer-link.interface';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() footerText = 'Default footer text';

  copyrightText = '© LUCH — 2025';
  socialLinks: SocialLink[] = [
    {
      url: 'https://twitter.com/',
      alt: 'Twitter X',
      icon: 'assets/images/twitter-x-line.svg'
    },
    {
      url: 'https://instagram.com/',
      alt: 'Instagram',
      icon: 'assets/images/instagram-line.svg'
    },
    {
      url: 'https://dribbble.com/',
      alt: 'Dribbble',
      icon: 'assets/images/dribbble-line.svg'
    }
  ];
  footerNavigationLinks: FooterLink[] = [
    { title: 'Homepage', link: '/' },
    { title: 'Projects', link: '/projects' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' },
    { title: 'Subscribe', link: '/subscribe' }
  ];
  footerLegalLinks: FooterLink[] = [
    { title: 'About Me', link: '/about-me' },
    { title: 'Licenses', link: '/licenses' },
    { title: 'Privacy', link: '/privacy' },
    { title: 'Changelog', link: '/changelog' },
    { title: 'Menu', link: '/menu' }
  ];

  hoveredNavigationIndex: number | null = null;
  hoveredLegalIndex: number | null = null;
  hoveredCopyrightIndex: number | null = null;

  copyrightLinks: FooterLink[] = [
    { title: 'By Valdis Zhvaginsh', link: 'https://webflow.com/@thevaldis' },
    {
      title: 'Powered by Webflow',
      link: 'https://try.webflow.com/9wyc5a5fesf6'
    },
    {
      title: 'Buy this template',
      link: 'https://webflow.com/templates/designers/valdis-zhvaginsh'
    }
  ];

  onNavigationLinkHover(index: number | null) {
    this.hoveredNavigationIndex = index;
  }

  onLegalLinkHover(index: number | null) {
    this.hoveredLegalIndex = index;
  }

  onCopyrightLinkHover(index: number | null) {
    this.hoveredCopyrightIndex = index;
  }
}
