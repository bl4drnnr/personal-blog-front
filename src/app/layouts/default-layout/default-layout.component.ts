import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ScrollAnimationService } from '@services/scroll-animation.service';
import { ScrollUtilitiesService } from '@services/scroll-utilities.service';
import { SocialLinksService } from '@services/social-links.service';
import { SocialLink } from '@interface/social-link.interface';
import { CopyrightService } from '@services/copyright.service';
import { Copyright } from '@interface/copyright.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  @Input() footerText = '';
  @Input() heroImageMain = '';
  @Input() heroImageSecondary = '';
  @Input() heroImageMainAlt = '';
  @Input() heroImageSecondaryAlt = '';
  @Input() logoText = '';
  @Input() breadcrumbText = '';
  @Input() heroTitle = '';
  @Input() hideScrollProgressBar: boolean = false;
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() preventPicChange: boolean = false;
  @Input() showNavigation: boolean = true;

  scrollProgress = 0;
  isFooterReached = false;
  socialLinks: SocialLink[] = [];
  copyrightData: Copyright = {
    copyrightLinks: [],
    copyrightEmail: '',
    copyrightText: ''
  };

  private subscription: Subscription = new Subscription();

  constructor(
    private scrollAnimationService: ScrollAnimationService,
    private scrollUtilitiesService: ScrollUtilitiesService,
    private socialLinksService: SocialLinksService,
    private copyrightService: CopyrightService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.scrollAnimationService.scrollProgress$.subscribe((progress) => {
        this.scrollProgress = progress;
        this.scrollUtilitiesService.checkFooterScroll();
      })
    );

    this.subscription.add(
      this.scrollUtilitiesService.isFooterReached$.subscribe((isReached) => {
        this.isFooterReached = isReached;
      })
    );

    this.loadSocialLinks();
    this.loadCopyrightData();
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

  private loadCopyrightData(): void {
    this.copyrightService.getCopyrightData().subscribe({
      next: (response) => {
        this.copyrightData = response;
      },
      error: (error) => {
        console.error('Failed to load copyright data:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
