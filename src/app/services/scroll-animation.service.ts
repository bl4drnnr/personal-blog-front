import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private scrollProgress = new BehaviorSubject<number>(0);
  public scrollProgress$ = this.scrollProgress.asObservable();

  constructor() {
    this.initScrollListener();
  }

  private initScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.updateScrollProgress();
    });
  }

  private updateScrollProgress(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const progress = Math.min(
      (scrollTop / (documentHeight - windowHeight)) * 100,
      100
    );

    this.scrollProgress.next(progress);
  }
}
