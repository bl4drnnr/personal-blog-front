import { Component, Input } from '@angular/core';

export interface ContactTile {
  link: string;
  image: string;
  alt: string;
  label: string;
  sublabel?: string;
  target?: string;
}

@Component({
  selector: 'component-contact-tiles',
  templateUrl: './contact-tiles.component.html',
  styleUrls: ['./contact-tiles.component.scss']
})
export class ContactTilesComponent {
  @Input() tiles: ContactTile[] = [];
}
