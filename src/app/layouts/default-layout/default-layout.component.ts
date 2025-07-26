import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ScrollAnimationService } from '@services/scroll-animation.service';
import { ScrollUtilitiesService } from '@services/scroll-utilities.service';
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

  scrollProgress = 0;
  isFooterReached = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private scrollAnimationService: ScrollAnimationService,
    private scrollUtilitiesService: ScrollUtilitiesService
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
