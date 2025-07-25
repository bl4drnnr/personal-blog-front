import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '@components/post-card/post-card.component';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { LinkBlockComponent } from '@app/components/basic-components/link-block/link-block.component';
import { ButtonLinkComponent } from '@components/button-link/button-link.component';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { TextareaComponent } from '@components/textarea/textarea.component';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';

const components: any = [
  PostCardComponent,
  ProjectCardComponent,
  LinkBlockComponent,
  ButtonLinkComponent,
  PaginationComponent,
  InputComponent,
  ButtonComponent,
  TextareaComponent,
  LoadingSpinnerComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components]
})
export class BasicComponentsModule {}
