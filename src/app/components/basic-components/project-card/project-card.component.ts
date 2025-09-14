import dayjs from 'dayjs';
import { Component, Input } from '@angular/core';
import { Project } from '@interface/project.interface';

@Component({
  selector: 'component-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  get formattedDate() {
    return dayjs(this.project.createdAt).format('MMMM D, YYYY');
  }
}
