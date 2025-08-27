import { Component, Input, OnInit } from '@angular/core';

export type CarouselDirection = 'left' | 'right';

@Component({
  selector: 'component-marquee-carousel',
  templateUrl: './marquee-carousel.component.html',
  styleUrls: ['./marquee-carousel.component.scss']
})
export class MarqueeCarouselComponent implements OnInit {
  @Input() text = '';
  @Input() direction: CarouselDirection = 'left';
  @Input() speed = 60;
  @Input() repeatCount = 8;

  textItems: string[] = [];
  marqueeWrapClass = 'marquee-wrap';
  animationStyle = '';

  ngOnInit(): void {
    this.textItems = Array(this.repeatCount).fill(this.text);
    this.marqueeWrapClass =
      this.direction === 'right'
        ? 'marquee-wrap marquee-wrap-reverse'
        : 'marquee-wrap';
    this.animationStyle = `${this.speed}s`;
  }
}
