import { Component, Input } from '@angular/core';
import { Post } from '@interface/post.interface';

@Component({
  selector: 'component-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
}
