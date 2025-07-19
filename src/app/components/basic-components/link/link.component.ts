import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'component-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() link: string = '';
  @Input() title: string = '';
  @Input() textPosition: 'left' | 'right' = 'left';
  @Input() iconType: 'button' | 'link' | 'none' = 'button';
  @Input() type: 'link' | 'button' = 'link';
  @Input() buttonBg: string = '';
  @Output() buttonClick = new EventEmitter<Event>();

  onClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
