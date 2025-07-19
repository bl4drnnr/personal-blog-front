import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  AfterViewChecked
} from '@angular/core';
import { Location } from '@angular/common';
import { ScrollAnimationService } from '@services/scroll-animation.service';
import { Subscription } from 'rxjs';
import hljs from 'highlight.js';

@Component({
  selector: 'page-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent
  implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked
{
  title = 'Modern Web Design Trends That Inspired the LUCH Template';
  description =
    'Explore the latest trends in web design that shaped the look and feel of the LUCH template. From bold typography to immersive visuals, discover what makes modern web experiences stand out.';
  date = 'July 11, 2025';
  tags = ['Web Design', 'Trends', 'Inspiration'];
  blogContent = `
    <h1>Introduction</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
    <h2>Typography Trends</h2>
    <p>Modern web design leverages bold, readable fonts. <strong>Bold typography</strong> and <em>minimalist layouts</em> are at the heart of today’s web design.</p>
    <h3>Font Pairings</h3>
    <p>Choosing the right font pairings is essential for a cohesive look.</p>
    <h2>Color and Visuals</h2>
    <p>Vibrant gradients and modern color schemes are popular in 2025.</p>
    <h3>Gradients</h3>
    <p>Gradients add depth and interest to backgrounds and UI elements.</p>
    <blockquote>
      "Design is not just what it looks like and feels like. Design is how it works."<br />
      <span class="quote-author">– Steve Jobs</span>
    </blockquote>
    <h2>Accessibility</h2>
    <p>Accessible and <u>easy-to-read</u> content is a must for modern web experiences.</p>
    <ul>
      <li>Responsive layouts for all devices</li>
      <li>Accessible color contrast</li>
      <li>Keyboard navigation</li>
    </ul>
    <h2>Code Example</h2>
    <p>You can even include code snippets:</p>
    <pre class="language-javascript"><code>const inspiration = [
  'Bold Typography',
  'Minimalist Layouts',
  'Immersive Visuals',
  'Accessibility',
];
console.log('LUCH Template Inspiration:', inspiration);
</code></pre>
    <h2>Lorem Ipsum Section</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
    <h3>Subsection Example</h3>
    <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.</p>
    <ol>
      <li>Class aptent taciti sociosqu ad litora torquent</li>
      <li>Per conubia nostra, per inceptos himenaeos</li>
      <li>Maecenas sed diam eget risus varius blandit</li>
    </ol>
    <p>Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
  `;

  scrollProgress = 0;
  isFooterReached = false;
  toc: { id: string; text: string; level: number; number: string }[] = [];
  isFullscreen = false;
  @ViewChild('contentRef', { static: false }) contentRef!: ElementRef;
  private lastContent: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private location: Location,
    private scrollAnimationService: ScrollAnimationService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.scrollAnimationService.scrollProgress$.subscribe((progress) => {
        this.scrollProgress = progress;
        this.checkFooterScroll();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.highlightAllCode();
    this.buildTableOfContents();
  }

  ngAfterViewChecked() {
    if (this.contentRef && this.blogContent !== this.lastContent) {
      this.highlightAllCode();
      this.lastContent = this.blogContent;
    }
  }

  buildTableOfContents() {
    const contentEl: HTMLElement = this.contentRef.nativeElement;
    const headings = Array.from(
      contentEl.querySelectorAll('h1, h2, h3')
    ) as HTMLElement[];
    let h1 = 0,
      h2 = 0,
      h3 = 0;
    this.toc = headings.map((heading, idx) => {
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

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.location.replaceState(
        this.location.path(false).split('#')[0],
        '',
        '#' + id
      );
    }
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    // Optionally, scroll to top or focus content
    setTimeout(() => {
      if (this.isFullscreen) {
        document.body.classList.add('blog-fullscreen-active');
      } else {
        document.body.classList.remove('blog-fullscreen-active');
      }
    }, 10);
  }

  private checkFooterScroll(): void {
    const footer = document.querySelector('component-footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const footerTop = footerRect.top;
      const footerVisibleThreshold = windowHeight;
      if (footerTop <= footerVisibleThreshold && !this.isFooterReached) {
        this.isFooterReached = true;
      } else if (footerTop > footerVisibleThreshold && this.isFooterReached) {
        this.isFooterReached = false;
      }
    }
  }

  private highlightAllCode() {
    if (this.contentRef) {
      const blocks = this.contentRef.nativeElement.querySelectorAll('pre code');
      blocks.forEach((block: HTMLElement) => {
        hljs.highlightElement(block);
      });
    }
  }
}
