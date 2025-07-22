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
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollAnimationService } from '@services/scroll-animation.service';
import { MathService } from '@services/math.service';
import { ProjectsService } from '@services/projects.service';
import { Project } from '@interface/project.interface';
import { SEOService } from '@services/seo.service';
import { SiteConfigService } from '@services/site-config.service';
import { Subscription } from 'rxjs';
import hljs from 'highlight.js';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';
import { environment } from '@environments/environment';

@Component({
  selector: 'page-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUpStaggerAnimation]
})
export class ProjectDetailComponent
  implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked
{
  project: Project | null = null;
  isLoading = true;
  notFound = false;

  get title() {
    return this.project?.title || 'Project';
  }

  get description() {
    return this.project?.description || '';
  }

  get date() {
    return this.project?.date || '';
  }

  get tags() {
    return this.project?.tags || [];
  }

  get technologies() {
    return this.project?.technologies || [];
  }

  get blogContent() {
    return (
      this.project?.content ||
      `
    <h1>Math Rendering Test</h1>
    
    <p>In the ever-evolving landscape of web design, staying ahead of trends while maintaining timeless appeal is a delicate balance. The LUCH template draws inspiration from cutting-edge design movements that prioritize both aesthetics and functionality, creating an experience that resonates with modern users.</p>

    <a href="https://www.google.com">Google</a>
    
    <h2>The Rise of Bold Typography</h2>
    <p>Typography has become the hero of modern web design. Gone are the days when text was merely functional – today's designs leverage typography as a primary visual element. The LUCH template embraces this trend with carefully selected font pairings that create hierarchy and visual interest while maintaining readability across all devices.</p>
    
    <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Modern typography and design elements" />
    <p class="image-caption">Figure 1: Bold typography creates visual hierarchy and engagement in modern web design</p>
    
    <h2>Immersive Visual Storytelling</h2>
    <p>Modern websites are moving beyond simple layouts to create immersive experiences. The LUCH template incorporates smooth animations, parallax effects, and strategic use of whitespace to guide users through a carefully crafted narrative journey.</p>
    
    <h3>The Power of Whitespace</h3>
    <p>Minimalism continues to dominate modern design philosophy. The strategic use of whitespace in LUCH allows content to breathe, creating focus points that guide user attention naturally. This approach reduces cognitive load while enhancing the overall aesthetic appeal.</p>
    
    <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Clean minimalist design with whitespace" />
    <p class="image-caption">Figure 2: Strategic whitespace usage creates focus and enhances user experience</p>
    
    <h2>Interactive Elements and Micro-interactions</h2>
    <p>User engagement is amplified through thoughtful micro-interactions. From subtle hover effects to smooth page transitions, these small details contribute to a premium feel that keeps users engaged and creates memorable experiences.</p>
    
    <blockquote>
      "Good design is obvious. Great design is transparent. The best interactions feel inevitable – they anticipate user needs and respond intuitively."<br />
      <span class="quote-author">– Modern Design Philosophy</span>
    </blockquote>
    
    <h2>Responsive Design Evolution</h2>
    <p>The LUCH template embraces mobile-first design principles, ensuring optimal performance across all devices. Modern responsive design goes beyond simple scaling – it involves rethinking user flows and interactions for different contexts.</p>
    
    <h2>Technical Excellence Behind the Aesthetics</h2>
    <p>Beautiful design means nothing without solid technical foundation. The following code example demonstrates how we implement smooth animations while maintaining performance:</p>
    
    <pre class="language-css"><code>.smooth-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}</code></pre>
    
    <h1>Advanced Content Rendering Examples</h1>
    <p>This section demonstrates advanced content rendering capabilities including LaTeX formulas and image processing. Mathematical expressions can be written inline like $E = mc^2$ or as display equations:</p>
    
    <p>The famous quadratic formula is: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
    
    <h2>Sample Mathematical Images</h2>
    <p>Here's an example of how mathematical content images would be displayed:</p>
    <img src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Mathematical formulas on a blackboard" />
    <p class="image-caption">Figure 3: Mathematical formulas and equations demonstrate LaTeX integration</p>
    
    <h2>Mathematical Concepts</h2>
    <p>Let's explore some mathematical concepts with inline formulas. The area of a circle is $A = \\pi r^2$, where $r$ is the radius.</p>
    
    <h3>Calculus Example</h3>
    <p>Consider the derivative of $f(x) = x^2 + 3x + 2$:</p>
    $$f'(x) = \\frac{d}{dx}(x^2 + 3x + 2) = 2x + 3$$
    
    <h3>Linear Algebra</h3>
    <p>A simple matrix multiplication example:</p>
    $$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x + 2y \\\\ 3x + 4y \\end{pmatrix}$$
    
    <h2>Advanced Mathematical Visualization</h2>
    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Mathematical equations and graphs" />
    <p class="image-caption">Figure 4: Complex mathematical equations and graphs showcase advanced LaTeX capabilities</p>
    
    <h2>Complex Formulas</h2>
    <p>Here's the famous Euler's formula that connects five fundamental mathematical constants:</p>
    $$e^{i\\pi} + 1 = 0$$
    
    <p>And the beautiful integral representation of the Gamma function:</p>
    $$\\Gamma(n) = \\int_0^\\infty t^{n-1} e^{-t} dt$$
    
    <h2>Typography with Math</h2>
    <p>Modern web design leverages bold, readable fonts alongside mathematical notation. The combination of $\\LaTeX$ rendering and <strong>bold typography</strong> creates engaging technical content.</p>
    
    <blockquote>
      "Mathematics is the language with which God has written the universe."<br />
      <span class="quote-author">– Galileo Galilei</span>
    </blockquote>
    
    <h2>Code and Math Together</h2>
    <p>You can combine code snippets with mathematical formulas. For example, implementing the quadratic formula:</p>
    <pre class="language-javascript"><code>function solveQuadratic(a, b, c) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant >= 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [x1, x2];
  }
  return null; // No real solutions
}
</code></pre>
    
    <p>This implements the mathematical formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$</p>
    
    <h2>Statistics and Probability</h2>
    <p>The normal distribution probability density function is given by:</p>
    $$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$$
    
    <p>Where $\\mu$ is the mean and $\\sigma$ is the standard deviation.</p>
  `
    );
  }

  animationState = '';
  scrollProgress = 0;
  isFooterReached = false;
  toc: { id: string; text: string; level: number; number: string }[] = [];
  isFullscreen = false;
  @ViewChild('contentRef', { static: false }) contentRef!: ElementRef;
  private lastContent: string = '';
  private subscription: Subscription = new Subscription();

  get processedContent(): string {
    return this.mathService.processImages(this.blogContent);
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private scrollAnimationService: ScrollAnimationService,
    private mathService: MathService,
    private projectsService: ProjectsService,
    private seoService: SEOService,
    private siteConfigService: SiteConfigService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.scrollAnimationService.scrollProgress$.subscribe((progress) => {
        this.scrollProgress = progress;
        this.checkFooterScroll();
      })
    );

    // Load project data based on route parameter
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadProject(slug);
      } else {
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  private loadProject(slug: string): void {
    this.isLoading = true;
    this.notFound = false;

    this.projectsService.getProjectBySlug(slug).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
        this.updateSEO();
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.notFound = true;
        this.isLoading = false;

        // Navigate to 404 if project not found
        this.router.navigate(['/404']);
      }
    });
  }

  private updateSEO(): void {
    if (this.project) {
      const siteConfig = this.siteConfigService.getCurrentConfig();
      const fullUrl = `${environment.siteUrl}/projects/${this.project.slug}`;
      this.seoService.updateForProject(this.project, fullUrl);

      // Add structured data for better SEO
      this.seoService.addStructuredData('Article', {
        headline: this.project.title,
        description: this.project.description,
        author: {
          '@type': 'Person',
          name: siteConfig?.siteAuthor || 'Blog Author'
        },
        datePublished: this.project.date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl
        },
        publisher: siteConfig?.organization || {
          '@type': 'Organization',
          name: siteConfig?.siteName || 'Personal Blog',
          url: siteConfig?.siteUrl || environment.siteUrl
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.highlightAllCode();
    this.buildTableOfContents();

    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }

  ngAfterViewChecked() {
    if (this.contentRef && this.blogContent !== this.lastContent) {
      this.highlightAllCode();
      setTimeout(() => {
        this.processMathInContent();
      }, 50);
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

  private processMathInContent() {
    if (this.contentRef) {
      this.mathService.renderMathInElement(this.contentRef.nativeElement);
    }
  }
}
