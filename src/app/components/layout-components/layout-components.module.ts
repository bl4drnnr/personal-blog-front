import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { FaqComponent } from '@components/layout-components/faq/faq.component';
import { MarqueeCarouselComponent } from '@components/layout-components/marquee-carousel/marquee-carousel.component';
import { SectionTitleComponent } from '@components/layout-components/section-title/section-title.component';
import { CarouselWordsComponent } from '@components/layout-components/carousel-words/carousel-words.component';
import { BasicComponentsModule } from '@components/basic-components/basic-components.module';
import { ContactTilesComponent } from '@components/contact-tiles/contact-tiles.component';

const components: any = [
  HeaderComponent,
  FooterComponent,
  NavigationComponent,
  FaqComponent,
  MarqueeCarouselComponent,
  SectionTitleComponent,
  CarouselWordsComponent,
  ContactTilesComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, BasicComponentsModule],
  exports: [...components]
})
export class LayoutComponentsModule {}
