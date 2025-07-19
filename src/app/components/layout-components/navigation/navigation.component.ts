import { Component, Input } from '@angular/core';
import { NavigationLink } from '@interface/navigation-link.interface';

@Component({
  selector: 'component-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() footerText = 'Default footer text';
  @Input() templateLink =
    'https://webflow.com/templates/designers/valdis-zhvaginsh';
  @Input() logoText = 'LUCH';
  @Input() breadcrumbText = 'Home';
  @Input() heroImageMain = '';
  @Input() heroImageSecondary = '';
  @Input() heroImageMainAlt = '';
  @Input() heroImageSecondaryAlt = '';
  @Input() heroTitle = 'Welcome to LUCH';
  @Input() isFooterReached = false;
  @Input() scrollProgress: number = 0;
  @Input() hideScrollProgressBar: boolean = false;
  @Input() heroDesc?: string;
  @Input() showHomePageLink: boolean = false;
  @Input() preventPicChange: boolean = false;

  socialLinks: any[] = [
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
  links: NavigationLink[] = [
    {
      title: 'Home',
      description: 'LUCH Framework',
      link: '/home'
    },
    {
      title: 'Projects',
      description: 'A collection of AI-driven designs',
      link: '/projects'
    },
    {
      title: 'Blog',
      description: 'Thoughts, insights and ideas on AI, design and creativity',
      link: '/blog'
    },
    {
      title: 'Contact',
      description: "Let's connect!",
      link: '/contact'
    },
    {
      title: 'Subscribe',
      description: 'Stay Updated',
      link: '/subscribe'
    },
    {
      title: 'About Me',
      description: 'Learn more about the creator of this site.',
      link: '/about-me'
    }
  ];
  email = 'info@example.com';
  copyrightText = '© LUCH — 2025';

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getScrollLineStyle() {
    return { width: `${this.scrollProgress}%` };
  }

  get isFooterBackgroundActive(): boolean {
    return this.isFooterReached && !this.hideScrollProgressBar && !this.preventPicChange;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
