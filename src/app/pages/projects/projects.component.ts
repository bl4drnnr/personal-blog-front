import { Component, OnInit } from '@angular/core';
import { Project } from '@interface/project.interface';
import { SEOService } from '@services/seo.service';
import { ProjectsService, ProjectsPageData } from '@services/projects.service';
import { projectAnimation } from '@shared/animations/fade-in-up.animation';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'page-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [projectAnimation]
})
export class ProjectsComponent implements OnInit {
  animationState = '';

  // Page data from API
  projectsPageData: ProjectsPageData = {
    pageContent: {
      title: '',
      subtitle: '',
      description: ''
    },
    layoutData: {
      footerText: '',
      heroImageMain: '',
      heroImageSecondary: '',
      heroImageMainAlt: '',
      heroImageSecondaryAlt: '',
      logoText: '',
      breadcrumbText: '',
      heroTitle: ''
    },
    seoData: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      structuredData: undefined
    },
    projects: [],
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 0,
      hasNextPage: false,
      hasPrevPage: false
    }
  };
  projects: Project[] = [];

  // Search and pagination
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 12;
  totalPages = 0;

  // Search debouncing
  private searchSubject = new Subject<string>();

  constructor(
    private seoService: SEOService,
    private projectsService: ProjectsService
  ) {
    // Setup search debouncing
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  get paginatedProjects(): Project[] {
    return this.projects;
  }

  loadProjectsData(page: number = 1, search?: string): void {
    const query = {
      page,
      limit: this.pageSize,
      search: search || undefined
    };

    this.projectsService.getProjectsPage(query).subscribe({
      next: (data) => {
        this.projectsPageData = data;
        this.projects = data.projects;
        this.currentPage = data.pagination.currentPage;
        this.totalPages = data.pagination.totalPages;
        this.pageSize = data.pagination.itemsPerPage;

        // Update SEO data
        this.updateSEO(data);

        this.triggerAnimation();
      },
      error: (error) => {
        console.error('Error loading projects data:', error);
      }
    });
  }

  private updateSEO(data: ProjectsPageData): void {
    if (data.seoData) {
      this.seoService.updatePageTitle(data.seoData.metaTitle);
      this.seoService.updateMetaDescription(data.seoData.metaDescription);
      this.seoService.updateMetaKeywords(data.seoData.metaKeywords);
      this.seoService.updateOpenGraphTags({
        title: data.seoData.ogTitle || data.seoData.metaTitle,
        description: data.seoData.ogDescription || data.seoData.metaDescription,
        image: data.seoData.ogImage,
        url: window.location.href,
        type: 'article'
      });

      if (data.seoData.structuredData) {
        this.seoService.updateStructuredData(data.seoData.structuredData);
      }
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  private performSearch(term: string): void {
    this.currentPage = 1;
    this.loadProjectsData(1, term);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProjectsData(page, this.searchTerm || undefined);
  }

  private triggerAnimation(): void {
    this.animationState = '';
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 50);
  }

  ngOnInit() {
    // Load initial projects data
    this.loadProjectsData(1);
  }
}
