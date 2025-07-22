import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services/seo.service';

@Component({
  selector: 'page-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(private seoService: SEOService) {}

  ngOnInit() {
    this.seoService.updatePageTitle('Contact');
  }
  name: string = '';
  email: string = '';
  message: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  carouselWords: string[] = [
    'Responsive Design',
    'Webflow',
    'User Experience',
    'Page Speed',
    'Prototyping',
    'Frontend',
    'Accessibility',
    'Animation',
    'User Interface'
  ];
  contactTiles = [
    {
      link: 'mailto:hello@luchcreative.com',
      image: 'assets/images/mail-send-fill.svg',
      alt: 'Mail Send',
      label: 'Email Us',
      sublabel: 'hello@luchcreative.com',
      target: '_blank'
    },
    {
      link: 'tel:+15551234567',
      image: 'assets/images/phone-fill.svg',
      alt: 'Phone',
      label: 'Call us',
      sublabel: '+1 (555) 123-4567',
      target: '_blank'
    },
    {
      link: 'https://t.me/LuchSupport',
      image: 'assets/images/message-2-fill.svg',
      alt: 'Message',
      label: 'Let’s chat',
      sublabel: '@LuchSupport',
      target: '_blank'
    },
    {
      link: 'https://goo.gl/maps/xyz',
      image: 'assets/images/map-2-fill.svg',
      alt: 'Map',
      label: 'Visit us',
      sublabel: 'Dreamcity, USA',
      target: '_blank'
    }
  ];
}
