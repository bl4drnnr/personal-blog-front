import { Component, OnInit } from '@angular/core';
import { Post } from '@interface/post.interface';
import { blogPostAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [blogPostAnimation]
})
export class BlogComponent implements OnInit {
  animationState = '';
  posts: Post[] = [
    {
      title: 'The Future of AI in Design',
      category: 'AI & Design',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      description:
        'Exploring how AI is revolutionizing the design industry and what the future holds for creative professionals.',
      date: '2024-06-01',
      slug: 'the-future-of-ai-in-design'
    },
    {
      title: 'Building with GPT-4 Vision',
      category: 'AI Tools',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      description:
        'A hands-on guide to leveraging GPT-4 Vision for next-gen applications.',
      date: '2024-05-20',
      slug: 'building-with-gpt-4-vision'
    },
    {
      title: 'Webflow vs. Custom Code',
      category: 'Web Development',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      description:
        'Comparing the pros and cons of using Webflow versus traditional custom coding for modern websites.',
      date: '2024-05-10',
      slug: 'webflow-vs-custom-code'
    },
    {
      title: 'Designing for Accessibility',
      category: 'UX/UI',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      description:
        'Best practices and tools for making your digital products accessible to everyone.',
      date: '2024-04-28',
      slug: 'designing-for-accessibility'
    },
    {
      title: 'AI-Powered Content Creation',
      category: 'Content',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      description:
        'How AI is transforming the way we create and manage content online.',
      date: '2024-04-15',
      slug: 'ai-powered-content-creation'
    },
    {
      title: 'The Rise of No-Code Platforms',
      category: 'No-Code',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      description:
        'An overview of the no-code movement and its impact on startups and entrepreneurs.',
      date: '2024-04-01',
      slug: 'the-rise-of-no-code-platforms'
    },
    {
      title: 'Personal Branding in the Digital Age',
      category: 'Branding',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      description:
        'Tips and strategies for building a strong personal brand online.',
      date: '2024-03-20',
      slug: 'personal-branding-in-the-digital-age'
    },
    {
      title: 'From Idea to Launch: My Workflow',
      category: 'Productivity',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      description:
        'A behind-the-scenes look at my process for taking ideas from concept to launch.',
      date: '2024-03-10',
      slug: 'from-idea-to-launch-my-workflow'
    },
    {
      title: 'The Power of Community',
      category: 'Community',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      description:
        'Why building and engaging with a community is essential for creators.',
      date: '2024-02-28',
      slug: 'the-power-of-community'
    },
    {
      title: 'Learning in Public',
      category: 'Growth',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      description:
        'How sharing your learning journey can accelerate your growth and help others.',
      date: '2024-02-15',
      slug: 'learning-in-public'
    }
  ];

  searchTerm: string = '';

  currentPage = 1;
  pageSize = 6;

  get totalPages(): number {
    const filtered = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        post.date.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return Math.ceil(filtered.length / this.pageSize);
  }

  get paginatedPosts(): Post[] {
    const filtered = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        post.date.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.triggerAnimation();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.triggerAnimation();
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.triggerAnimation();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.triggerAnimation();
  }

  private triggerAnimation(): void {
    this.animationState = '';
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 50);
  }

  ngOnInit() {
    // Trigger post animations after view initialization
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
