import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'component-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent {
  @Input() title: string = '';
  @Input() textPosition: 'left' | 'right' = 'left';
  @Input() iconType: 'button' | 'link' | 'none' = 'button';
  @Input() buttonBg: string = '';
  @Output() buttonClick = new EventEmitter<Event>();

  onClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
