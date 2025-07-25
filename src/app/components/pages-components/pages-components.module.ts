import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhysSectionComponent } from '@components/whys-section/whys-section.component';
import { ExperienceTimelineComponent } from '@components/experience-timeline/experience-timeline.component';
import { CertificatesComponent } from '@components/certificates/certificates.component';

@NgModule({
  declarations: [
    WhysSectionComponent,
    ExperienceTimelineComponent,
    CertificatesComponent
  ],
  imports: [CommonModule],
  exports: [
    WhysSectionComponent,
    ExperienceTimelineComponent,
    CertificatesComponent
  ]
})
export class PagesComponentsModule {}
