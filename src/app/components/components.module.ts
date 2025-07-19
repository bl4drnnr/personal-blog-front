import { NgModule } from '@angular/core';
import { BasicComponentsModule } from '@components/basic-components/basic-components.module';
import { LayoutComponentsModule } from '@components/layout-components/layout-components.module';
import { PagesComponentsModule } from '@components/pages-components/pages-components.module';

@NgModule({
  imports: [
    BasicComponentsModule,
    LayoutComponentsModule,
    PagesComponentsModule
  ],
  exports: [
    BasicComponentsModule,
    LayoutComponentsModule,
    PagesComponentsModule
  ]
})
export class ComponentsModule {}
