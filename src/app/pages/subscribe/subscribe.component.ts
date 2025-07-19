import { Component } from '@angular/core';

@Component({
  selector: 'page-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {
  name: string = '';
  email: string = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  carouselWords: string[] = [
    'Newsletter',
    'Updates',
    'Exclusive Content',
    'Community',
    'Insights',
    'Growth',
    'Learning',
    'Inspiration',
    'Trends'
  ];
}
