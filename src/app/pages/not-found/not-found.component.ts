import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInUpStaggerAnimation } from '@animations/fade-in-up.animation';

@Component({
  selector: 'page-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class NotFoundComponent implements OnInit {
  animationState = '';

  constructor(private router: Router) {}

  goToMainPage() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
