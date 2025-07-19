import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '@layouts/default-layout/default-layout.component';
import { ComponentsModule } from '@components/components.module';
import { HeroLayoutComponent } from '@layouts/hero-layout/hero-layout.component';

const components: any = [DefaultLayoutComponent, HeroLayoutComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ComponentsModule],
  exports: [...components]
})
export class LayoutsModule {}
