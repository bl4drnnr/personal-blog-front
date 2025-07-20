import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class PrivacyComponent implements OnInit {
  animationState = '';

  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
