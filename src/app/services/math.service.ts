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

    // First, handle display math ($$...$$) - more restrictive pattern
    content = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      try {
        const cleanFormula = formula.trim();
        if (!cleanFormula) return match; // Return original if empty

        return katex.renderToString(cleanFormula, {
          displayMode: true,
          throwOnError: false,
          errorColor: '#cc0000',
          strict: 'warn',
          trust: false
        });
      } catch (error) {
        console.warn('KaTeX display math error:', error, 'Formula:', formula);
        return `<div class="math-error" style="color: #cc0000; border: 1px solid #cc0000; padding: 4px; margin: 4px 0;">Math Error: ${formula.trim()}</div>`;
      }
    });

    // Then, handle inline math ($...$) - avoid matching display math remnants
    content = content.replace(/\$([^$\n]+?)\$/g, (match, formula) => {
      try {
        const cleanFormula = formula.trim();
        if (!cleanFormula) return match; // Return original if empty

        return katex.renderToString(cleanFormula, {
          displayMode: false,
          throwOnError: false,
          errorColor: '#cc0000',
          strict: 'warn',
          trust: false
        });
      } catch (error) {
        console.warn('KaTeX inline math error:', error, 'Formula:', formula);
        return `<span class="math-error" style="color: #cc0000; border: 1px solid #cc0000; padding: 2px;">Math Error: ${formula.trim()}</span>`;
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

    // Skip if already processed (check for katex classes)
    if (element.querySelector('.katex')) {
      return;
    }

    // Find all text nodes that might contain LaTeX
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      (node) => {
        // Skip nodes that are already inside katex elements
        let parent = node.parentNode;
        while (parent && parent !== element) {
          if (
            (parent as Element).classList &&
            (parent as Element).classList.contains('katex')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          parent = parent.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
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

    // Add proper attributes to img tags and extract titles for captions
    content = content.replace(/<img([^>]*?)>/g, (match, attributes) => {
      // Extract title attribute for caption
      const titleMatch = attributes.match(/title="([^"]*)"/);
      const captionText = titleMatch ? titleMatch[1] : '';

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

      // Create image with caption wrapper if title exists
      if (captionText) {
        return `<div class="image-wrapper">
          <img${attributes}>
          <p class="image-caption">${captionText}</p>
        </div>`;
      }

      return `<img${attributes}>`;
    });

    // Process existing image captions (keep for backward compatibility)
    content = content.replace(
      /<p class="image-caption">([^<]+)<\/p>/g,
      '<p class="image-caption">$1</p>'
    );

    return content;
  }
}
