import { Component, Input } from '@angular/core';
import { HeaderLink } from '@interface/header-link.interface';

@Component({
  selector: 'component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() heroTitle = 'Welcome to LUCH';
  @Input() ctaText = 'Get Started';
  @Input() ctaLink = 'https://webflow.com/templates/designers/valdis-zhvaginsh';
  @Input() ctaTarget = '_blank';
  @Input() navigationLinks: HeaderLink[] = [
    { title: 'Home', link: '/home' },
    { title: 'Projects', link: '/projects' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' },
    { title: 'Subscribe', link: '/subscribe' }
  ];
  @Input() legalLinks: HeaderLink[] = [
    { title: 'Style Guide', link: '/legal/style-guide' },
    { title: 'Licenses', link: '/legal/licenses' },
    { title: 'Instruction', link: '/legal/instructions' },
    { title: 'Changelog', link: '/legal/changelog' },
    { title: 'Siteflow', link: '/siteflow' }
  ];
}
