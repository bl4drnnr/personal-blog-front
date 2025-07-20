import { Component, OnInit } from '@angular/core';
import { MenuTile } from '@shared/interfaces/menu-tile.interface';
import { menuTileAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.scss'],
  animations: [menuTileAnimation]
})
export class PageMenuComponent implements OnInit {
  animationState = '';
  menuTiles: MenuTile[] = [
    {
      title: 'Homepage',
      link: '/',
      icon: 'home-fill.svg',
      iconAlt: 'Home',
      image: 'Contemplative-Astronaut-Woman.webp',
      imageAlt: 'Contemplative Astronaut Woman'
    },
    {
      title: 'Projects',
      link: '/projects',
      icon: 'image-ai-fill.svg',
      iconAlt: 'Image AI',
      image: 'Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      imageAlt: 'Abstract Gradient Art'
    },
    {
      title: 'Blog',
      link: '/blog',
      icon: 'article-fill.svg',
      iconAlt: 'Article',
      image:
        'Futuristic-Attire-with-Neon-Green-Highlights_1Futuristic Attire with Neon Green Highlights.avif',
      imageAlt: 'Futuristic Attire with Neon Green Highlights'
    },
    {
      title: 'Contact',
      link: '/contact',
      icon: 'contacts-fill.svg',
      iconAlt: 'Contacts',
      image: 'Astronaut-in-Space-Suit_1Astronaut in Space Suit.webp',
      imageAlt: 'Astronaut in Space Suit'
    },
    {
      title: 'Subscribe',
      link: '/subscribe',
      icon: 'mail-add-fill.svg',
      iconAlt: 'Mail Add',
      image: 'Satellite-Orbiting-Earth.avif',
      imageAlt: 'Satellite Orbiting Earth'
    },
    {
      title: 'About Me',
      link: '/about-me',
      icon: 'settings-fill.svg',
      iconAlt: 'Settings',
      image:
        'Confident-Female-Astronaut-Inside-Spacecraft_1Confident Female Astronaut Inside Spacecraft.avif',
      imageAlt: 'Confident Female Astronaut Inside Spacecraft'
    },
    {
      title: 'Licenses',
      link: '/licenses',
      icon: 'file-info-fill.svg',
      iconAlt: 'File Info',
      image: 'Vibrant-Abstract-Artwork_1Vibrant Abstract Artwork.avif',
      imageAlt: 'Vibrant Abstract Artwork'
    },
    {
      title: 'Privacy',
      link: '/privacy',
      icon: 'lock-unlock-fill.svg',
      iconAlt: 'Privacy',
      image: 'Astronaut-on-Barren-Landscape.jpeg',
      imageAlt: 'Astronaut on Barren Landscape'
    },
    {
      title: 'Changelog',
      link: '/changelog',
      icon: 'sticky-note-fill.svg',
      iconAlt: 'Sticky Note',
      image: 'Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      imageAlt: 'Abstract Wave Artwork'
    },
    {
      title: 'Menu',
      link: '/menu',
      icon: 'layout-fill.svg',
      iconAlt: 'Layout',
      image: 'Futuristic-Cabin-Landscape_1Futuristic Cabin Landscape.avif',
      imageAlt: 'Futuristic Cabin Landscape'
    }
  ];

  ngOnInit() {
    // Trigger tile animations after view initialization
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }

  getFlowItemId(index: number): string | null {
    switch (index) {
      case 0:
        return 'menu-homepage-tile';
      case 7:
        return 'menu-style-guide-tile';
      case 11:
        return 'menu-menu-tile';
      default:
        return null;
    }
  }
}
