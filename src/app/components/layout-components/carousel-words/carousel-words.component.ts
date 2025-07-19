import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'component-carousel-words',
  templateUrl: './carousel-words.component.html',
  styleUrls: ['./carousel-words.component.scss']
})
export class CarouselWordsComponent implements OnInit {
  @Input() words: string[] = [];
  @Input() speed = 18;

  animationStyle = '';

  ngOnInit(): void {
    this.animationStyle = `${this.speed}s`;
  }
}
