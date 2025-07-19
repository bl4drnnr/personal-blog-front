import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ScrollAnimationService } from '@services/scroll-animation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hero-layout',
  templateUrl: './hero-layout.component.html',
  styleUrls: ['./hero-layout.component.scss']
})
export class HeroLayoutComponent implements OnInit, OnDestroy {
  @Input() footerText = '';
  @Input() heroImageMain = '';
  @Input() heroImageSecondary = '';
  @Input() heroImageMainAlt = '';
  @Input() heroImageSecondaryAlt = '';
  @Input() logoText = '';
  @Input() breadcrumbText = '';
  @Input() heroTitle = '';
  @Input() heroDesc = '';
  @Input() email = '';
  @Input() templateLink = '';
  @Input() showHomePageLink: boolean = false;
  @Input() hideScrollProgressBar: boolean = false;
  @Input() preventPicChange: boolean = false;

  scrollProgress = 0;
  isFooterReached = false;
  private subscription: Subscription = new Subscription();

  constructor(private scrollAnimationService: ScrollAnimationService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.scrollAnimationService.scrollProgress$.subscribe((progress) => {
        this.scrollProgress = progress;
        this.checkFooterScroll();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private checkFooterScroll(): void {
    const footer = document.querySelector('component-footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const footerTop = footerRect.top;
      const footerVisibleThreshold = windowHeight;

      if (footerTop <= footerVisibleThreshold && !this.isFooterReached) {
        this.isFooterReached = true;
      } else if (footerTop > footerVisibleThreshold && this.isFooterReached) {
        this.isFooterReached = false;
      }
    }
  }
}
