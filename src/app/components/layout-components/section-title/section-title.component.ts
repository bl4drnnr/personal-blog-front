import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() title = '';
  @Input() link = '';
  @Input() linkText = '';
  @Input() linkClass = '';
  @Input() isExternal = false;
}
