import { Injectable } from '@angular/core';
import * as katex from 'katex';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  constructor() {}

  /**
   * Renders LaTeX formulas in the given HTML content
   * Supports both inline formulas ($...$) and display formulas ($$...$$)
   * @param content HTML content string
   * @returns HTML content with LaTeX formulas rendered
   */
  renderMath(content: string): string {
    if (!content) return content;

    // First, handle display math ($$...$$)
    content = content.replace(/\$\$([^$]+)\$\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula.trim(), {
          displayMode: true,
          throwOnError: false,
          errorColor: '#cc0000',
          strict: 'warn'
        });
      } catch (error) {
        console.warn('KaTeX display math error:', error);
        return `<span style="color: #cc0000;">Math Error: ${formula}</span>`;
      }
    });

    // Then, handle inline math ($...$)
    content = content.replace(/\$([^$]+)\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula.trim(), {
          displayMode: false,
          throwOnError: false,
          errorColor: '#cc0000',
          strict: 'warn'
        });
      } catch (error) {
        console.warn('KaTeX inline math error:', error);
        return `<span style="color: #cc0000;">Math Error: ${formula}</span>`;
      }
    });

    return content;
  }

  /**
   * Renders LaTeX formulas in DOM elements after content is inserted
   * This is useful for dynamic content updates
   * @param element DOM element containing LaTeX formulas
   */
  renderMathInElement(element: HTMLElement): void {
    if (!element) return;

    // Find all text nodes that might contain LaTeX
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Text;

    while ((node = walker.nextNode() as Text)) {
      if (node.textContent && node.textContent.includes('$')) {
        textNodes.push(node);
      }
    }

    // Process each text node
    textNodes.forEach((textNode) => {
      const content = textNode.textContent || '';
      const processedContent = this.renderMath(content);

      if (processedContent !== content) {
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = processedContent;

        // Replace the text node with the processed content
        const parent = textNode.parentNode;
        if (parent) {
          while (temp.firstChild) {
            parent.insertBefore(temp.firstChild, textNode);
          }
          parent.removeChild(textNode);
        }
      }
    });
  }

  /**
   * Processes images in content to ensure S3 URLs are properly handled
   * @param content HTML content string
   * @returns HTML content with processed image tags
   */
  processImages(content: string): string {
    if (!content) return content;

    // Add proper attributes to img tags for better loading and accessibility
    content = content.replace(/<img([^>]*?)>/g, (match, attributes) => {
      // Add loading="lazy" if not present
      if (!attributes.includes('loading=')) {
        attributes += ' loading="lazy"';
      }

      // Add proper CSS classes for styling
      if (!attributes.includes('class=')) {
        attributes += ' class="blog-image"';
      } else {
        // Add blog-image class if not already present
        if (!attributes.includes('blog-image')) {
          attributes = attributes.replace(
            /class="([^"]*)"/,
            'class="$1 blog-image"'
          );
        }
      }

      // Ensure images are responsive
      if (!attributes.includes('style=')) {
        attributes += ' style="max-width: 100%; height: auto;"';
      }

      return `<img${attributes}>`;
    });

    // Process image captions
    content = content.replace(
      /<p class="image-caption">([^<]+)<\/p>/g,
      '<p class="image-caption">$1</p>'
    );

    return content;
  }

  /**
   * Main method to process blog content with both LaTeX and images
   * @param content Raw HTML content from backend
   * @returns Processed HTML content
   */
  processBlogContent(content: string): string {
    if (!content) return content;

    // First process images
    let processedContent = this.processImages(content);

    // Then process LaTeX formulas
    processedContent = this.renderMath(processedContent);

    return processedContent;
  }
}
