import { Component, Input } from '@angular/core';
import { SocialLink } from '@interface/social-link.interface';
import { FooterLink } from '@interface/footer-link.interface';
import { CopyrightLink } from '@interface/copyright.interface';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() footerText = '';
  @Input() socialLinks: SocialLink[] = [];
  @Input() copyrightLinks: Array<CopyrightLink> = [];
  @Input() copyrightText = '';

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
