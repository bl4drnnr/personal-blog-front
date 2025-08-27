import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnInit
} from '@angular/core';
import { NavigationLink } from '@interface/navigation-link.interface';
import {
  navMenuSlideAnimation,
  burgerMenuAnimation
} from '@shared/animations/fade-in-up.animation';
import { SocialLink } from '@interface/social-link.interface';
import { SocialLinksService } from '@services/social-links.service';

@Component({
  selector: 'component-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [navMenuSlideAnimation, burgerMenuAnimation]
})
export class NavigationComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private socialLinksService: SocialLinksService
  ) {}
  @Input() footerText = 'Default footer text';
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
  @Input() preventPicChange: boolean = false;
  @Input() showNavigation: boolean = true;

  // TODO: GET RID OF LUCH MENTIONS AND CHECK FOR THE USAGE OF HARDCODED TEXT
  // TODO: PROJECTS AND BLOGS TAGS AND TILES
  // TODO: DEPLOYMENT
  socialLinks: SocialLink[] = [];
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

  hoveredNavFooterIndex: number | null = null;
  navFooterLinks: any[] = [{ title: this.email, link: 'mailto:' + this.email }];

  isMenuOpen = false;

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
