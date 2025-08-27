import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-link-block',
  templateUrl: './link-block.component.html',
  styleUrls: ['./link-block.component.scss']
})
export class LinkBlockComponent {
  @Input() link: string = '';
  @Input() title: string = '';
  @Input() textPosition: 'left' | 'right' = 'left';
  @Input() iconType: 'button' | 'link' | 'none' = 'button';
}
