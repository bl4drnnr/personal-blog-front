import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class AboutMeComponent implements OnInit {
  animationState = '';

  ngOnInit() {
    // Trigger animation after view is initialized
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
