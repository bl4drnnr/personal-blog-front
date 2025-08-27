import { Component, Input } from '@angular/core';
import { ContactTile } from '@interface/contact-tile.interface';

@Component({
  selector: 'component-contact-tiles',
  templateUrl: './contact-tiles.component.html',
  styleUrls: ['./contact-tiles.component.scss']
})
export class ContactTilesComponent {
  @Input() tiles: ContactTile[] = [];
}
