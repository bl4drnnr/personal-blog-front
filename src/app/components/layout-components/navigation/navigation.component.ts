import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { NavigationLink } from '@interface/navigation-link.interface';
import {
  navMenuSlideAnimation,
  burgerMenuAnimation
} from '@shared/animations/fade-in-up.animation';
import { SocialLink } from '@interface/social-link.interface';

@Component({
  selector: 'component-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [navMenuSlideAnimation, burgerMenuAnimation]
})
export class NavigationComponent {
  constructor(private elementRef: ElementRef) {}
  @Input() footerText = '';
  @Input() logoText = '';
  @Input() breadcrumbText = '';
  @Input() heroImageMain = '';
  @Input() heroImageSecondary = '';
  @Input() heroImageMainAlt = '';
  @Input() heroImageSecondaryAlt = '';
  @Input() heroTitle = '';
  @Input() isFooterReached = false;
  @Input() scrollProgress: number = 0;
  @Input() hideScrollProgressBar: boolean = false;
  @Input() heroDesc?: string;
  @Input() preventPicChange: boolean = false;
  @Input() showNavigation: boolean = true;
  @Input() socialLinks: SocialLink[] = [];
  @Input() copyrightEmail: string = '';
  @Input() copyrightText: string = '';

  // TODO: PROJECTS AND BLOGS TAGS AND TILES
  // TODO: REFACTOR BLOG/PROJECTS FIELDS FOR THE CARDS
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

  hoveredNavFooterIndex: number | null = null;

  get navFooterLinks(): any[] {
    return this.copyrightEmail
      ? [{ title: this.copyrightEmail, link: 'mailto:' + this.copyrightEmail }]
      : [];
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onNavFooterLinkHover(index: number | null) {
    this.hoveredNavFooterIndex = index;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click was outside the navigation component
    if (
      this.isMenuOpen &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isMenuOpen = false;
    }
  }

  getScrollLineStyle() {
    return { width: `${this.scrollProgress}%` };
  }

  get isFooterBackgroundActive(): boolean {
    return (
      this.isFooterReached &&
      !this.hideScrollProgressBar &&
      !this.preventPicChange
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
