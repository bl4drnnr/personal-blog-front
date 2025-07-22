import { Component, OnInit } from '@angular/core';
import { Project } from '@interface/project.interface';
import { SEOService } from '@services/seo.service';
import { projectAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [projectAnimation]
})
export class ProjectsComponent implements OnInit {
  animationState = '';

  constructor(private seoService: SEOService) {}

  projects: Project[] = [
    {
      title: 'Futuristic UI/UX Design',
      type: 'AI-Powered Design System',
      aiModel: 'GPT-4 Vision',
      client: 'Tech Startup',
      date: '2024',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'futuristic-ui-ux-design'
    },
    {
      title: 'Space Exploration App',
      type: 'Mobile App Development',
      aiModel: 'Claude Sonnet',
      client: 'Space Agency',
      date: '2024',
      imageUrl: 'assets/images/Astronaut-in-Space_1Astronaut in Space.webp',
      altText: 'Astronaut in Space',
      slug: 'space-exploration-app'
    },
    {
      title: 'Creative Portfolio Platform',
      type: 'Web Platform',
      aiModel: 'DALL-E 3',
      client: 'Creative Agency',
      date: '2024',
      imageUrl: 'assets/images/Astronaut-in-Space_1Astronaut in Space.webp',
      altText: 'Futuristic Cabin Landscape',
      slug: 'creative-portfolio-platform'
    },
    {
      title: 'Futuristic UI/UX Design 2',
      type: 'AI-Powered Design System',
      aiModel: 'GPT-4 Vision',
      client: 'Tech Startup',
      date: '2024',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'futuristic-ui-ux-design-2'
    },
    {
      title: 'Space Exploration App 2',
      type: 'Mobile App Development',
      aiModel: 'Claude Sonnet',
      client: 'Space Agency',
      date: '2024',
      imageUrl: 'assets/images/Astronaut-in-Space_1Astronaut in Space.webp',
      altText: 'Astronaut in Space',
      slug: 'space-exploration-app-2'
    },
    {
      title: 'Creative Portfolio Platform 2',
      type: 'Web Platform',
      aiModel: 'DALL-E 3',
      client: 'Creative Agency',
      date: '2024',
      imageUrl: 'assets/images/Astronaut-in-Space_1Astronaut in Space.webp',
      altText: 'Futuristic Cabin Landscape',
      slug: 'creative-portfolio-platform-2'
    },
    {
      title: 'AI Art Generator',
      type: 'Web App',
      aiModel: 'Stable Diffusion',
      client: 'Art Studio',
      date: '2023',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      slug: 'ai-art-generator'
    },
    {
      title: 'Smart Home Dashboard',
      type: 'IoT Platform',
      aiModel: 'GPT-3',
      client: 'HomeTech',
      date: '2023',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      slug: 'smart-home-dashboard'
    },
    {
      title: 'Virtual Fitness Coach',
      type: 'Mobile App',
      aiModel: 'Gemini',
      client: 'FitnessPro',
      date: '2023',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'virtual-fitness-coach'
    },
    {
      title: 'E-commerce AI Assistant',
      type: 'E-commerce',
      aiModel: 'Claude 2',
      client: 'ShopEase',
      date: '2023',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      slug: 'e-commerce-ai-assistant'
    },
    {
      title: 'Language Learning Bot',
      type: 'Chatbot',
      aiModel: 'GPT-4',
      client: 'EduTech',
      date: '2023',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      slug: 'language-learning-bot'
    },
    {
      title: 'AI Music Composer',
      type: 'Music App',
      aiModel: 'MuseNet',
      client: 'MusicLab',
      date: '2023',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'ai-music-composer'
    },
    {
      title: 'Personal Finance Tracker',
      type: 'Finance App',
      aiModel: 'GPT-3',
      client: 'FinTrack',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      slug: 'personal-finance-tracker'
    },
    {
      title: 'Travel Recommendation Engine',
      type: 'Recommendation System',
      aiModel: 'BERT',
      client: 'TravelNow',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      slug: 'travel-recommendation-engine'
    },
    {
      title: 'Recipe Suggestion App',
      type: 'Food App',
      aiModel: 'GPT-2',
      client: 'CookBook',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'recipe-suggestion-app'
    },
    {
      title: 'AI Resume Builder',
      type: 'Web App',
      aiModel: 'Claude',
      client: 'CareerBoost',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      slug: 'ai-resume-builder'
    },
    {
      title: 'Mental Health Chatbot',
      type: 'Chatbot',
      aiModel: 'GPT-3',
      client: 'MindCare',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      slug: 'mental-health-chatbot'
    },
    {
      title: 'AI Writing Assistant',
      type: 'Writing Tool',
      aiModel: 'GPT-4',
      client: 'WriteNow',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Gradient-Art_1Abstract Gradient Art.avif',
      altText: 'Abstract Gradient Art',
      slug: 'ai-writing-assistant'
    },
    {
      title: 'Smart Calendar',
      type: 'Productivity App',
      aiModel: 'Gemini',
      client: 'TimeSaver',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Wave-Artwork_1Abstract Wave Artwork.avif',
      altText: 'Abstract Wave Artwork',
      slug: 'smart-calendar'
    },
    {
      title: 'AI-powered CRM',
      type: 'CRM System',
      aiModel: 'Claude',
      client: 'SalesForceX',
      date: '2022',
      imageUrl:
        'assets/images/Abstract-Wave-Texture_1Abstract Wave Texture.avif',
      altText: 'Abstract Wave Texture',
      slug: 'ai-powered-crm'
    }
  ];

  searchTerm: string = '';

  currentPage = 1;
  pageSize = 6;

  get totalPages(): number {
    const filtered = this.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (project.type &&
          project.type.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (project.aiModel &&
          project.aiModel
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())) ||
        (project.client &&
          project.client
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())) ||
        project.date.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return Math.ceil(filtered.length / this.pageSize);
  }

  get paginatedProjects(): Project[] {
    const filtered = this.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (project.type &&
          project.type.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (project.aiModel &&
          project.aiModel
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())) ||
        (project.client &&
          project.client
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())) ||
        project.date.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    // Set page title
    this.seoService.updatePageTitle('Projects');

    // Trigger project animations after view initialization
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
