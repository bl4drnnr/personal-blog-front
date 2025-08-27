import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TocItem {
  id: string;
  text: string;
  level: number;
  number: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollUtilitiesService {
  private isFooterReachedSubject = new BehaviorSubject<boolean>(false);
  public isFooterReached$: Observable<boolean> =
    this.isFooterReachedSubject.asObservable();

  constructor() {}

  checkFooterScroll(): void {
    const footer = document.querySelector('component-footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const footerTop = footerRect.top;
      const footerVisibleThreshold = windowHeight;

      if (
        footerTop <= footerVisibleThreshold &&
        !this.isFooterReachedSubject.value
      ) {
        this.isFooterReachedSubject.next(true);
      } else if (
        footerTop > footerVisibleThreshold &&
        this.isFooterReachedSubject.value
      ) {
        this.isFooterReachedSubject.next(false);
      }
    }
  }

  buildTableOfContents(contentElement: HTMLElement): TocItem[] {
    if (!contentElement) return [];

    const headings = Array.from(
      contentElement.querySelectorAll('h1, h2, h3')
    ) as HTMLElement[];

    let h1 = 0,
      h2 = 0,
      h3 = 0;

    return headings.map((heading, idx) => {
      let id = heading.id;
      if (!id) {
        id =
          'section-' +
          idx +
          '-' +
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        heading.id = id;
      }

      let level = 1;
      if (heading.tagName === 'H2') level = 2;
      if (heading.tagName === 'H3') level = 3;

      let number = '';
      if (level === 1) {
        h1++;
        h2 = 0;
        h3 = 0;
        number = `${h1}`;
      } else if (level === 2) {
        h2++;
        h3 = 0;
        number = `${h1}.${h2}`;
      } else if (level === 3) {
        h3++;
        number = `${h1}.${h2}.${h3}`;
      }

      return {
        id,
        text: heading.textContent || '',
        level,
        number
      };
    });
  }
}
