import { Component, Input } from '@angular/core';
import { WhysSection } from '@interface/whys-section.interface';

@Component({
  selector: 'component-whys-section',
  templateUrl: './whys-section.component.html',
  styleUrls: ['./whys-section.component.scss']
})
export class WhysSectionComponent {
  @Input() whysSection!: WhysSection;
}
