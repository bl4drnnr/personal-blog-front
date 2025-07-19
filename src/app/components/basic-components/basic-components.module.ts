import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '@components/post-card/post-card.component';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { LinkComponent } from '@components/link/link.component';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { TextareaComponent } from '@components/textarea/textarea.component';

const components: any = [
  PostCardComponent,
  ProjectCardComponent,
  LinkComponent,
  PaginationComponent,
  InputComponent,
  ButtonComponent,
  TextareaComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components]
})
export class BasicComponentsModule {}
