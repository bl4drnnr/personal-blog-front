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
    { title: 'Style Guide', link: '/legal/style-guide' },
    { title: 'Licenses', link: '/legal/licenses' },
    { title: 'Instruction', link: '/legal/instructions' },
    { title: 'Changelog', link: '/legal/changelog' },
    { title: 'Siteflow', link: '/siteflow' }
  ];
}
