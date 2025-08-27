import { Component, Input, OnInit } from '@angular/core';
import { SocialLink } from '@interface/social-link.interface';
import { FooterLink } from '@interface/footer-link.interface';
import { SocialLinksService } from '@services/social-links.service';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() footerText = 'Default footer text';

  socialLinks: SocialLink[] = [];
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

  constructor(private socialLinksService: SocialLinksService) {}

  ngOnInit(): void {
    this.loadSocialLinks();
  }

  private loadSocialLinks(): void {
    this.socialLinksService.getPublicSocialLinks().subscribe({
      next: (response) => {
        this.socialLinks = response;
      },
      error: (error) => {
        console.error('Failed to load social links:', error);
      }
    });
  }

  copyrightLinks: FooterLink[] = [
    { title: 'By Valdis Zhvaginsh', link: 'https://webflow.com/@thevaldis' },
    {
      title: 'Powered by Webflow',
      link: 'https://try.webflow.com/9wyc5a5fesf6'
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
