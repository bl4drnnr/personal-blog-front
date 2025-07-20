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
    { title: 'Instruction', link: '/instructions' },
    { title: 'Changelog', link: '/changelog' },
    { title: 'Siteflow', link: '/siteflow' }
  ];
}
