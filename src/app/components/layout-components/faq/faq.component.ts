import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FaqQuestion } from '@interface/faq-question.interface';

@Component({
  selector: 'component-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  @Input() faq!: FaqQuestion;
  @ViewChild('content', { static: false }) content!: ElementRef<HTMLDivElement>;

  isExpanded = false;
  contentHeight = '0px';

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      setTimeout(() => {
        if (this.content && this.content.nativeElement) {
          this.contentHeight = this.content.nativeElement.scrollHeight + 'px';
        }
      }, 0);
    } else {
      this.contentHeight = '0px';
    }
  }
}
