import { Component, Input } from '@angular/core';
import { HeaderLink } from '@interface/header-link.interface';

@Component({
  selector: 'component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() heroTitle = 'Welcome to LUCH';
  @Input() navigationLinks: HeaderLink[] = [
    { title: 'Home', link: '/home' },
    { title: 'Projects', link: '/projects' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' },
    { title: 'Subscribe', link: '/subscribe' }
  ];
  @Input() legalLinks: HeaderLink[] = [
    { title: 'About Me', link: '/about-me' },
    { title: 'Licenses', link: '/licenses' },
    { title: 'Instruction', link: '/instructions' },
    { title: 'Changelog', link: '/changelog' },
    { title: 'Siteflow', link: '/siteflow' }
  ];
}
