import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Project } from '@interface/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProjectBySlug(slug: string): Observable<Project> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Project>(`${this.apiUrl}/projects/${slug}`);
  }

  getProjectsSlugs(): Observable<
    {
      slug: string;
      title: string;
      description: string;
      date: string;
      tags: string[];
    }[]
  > {
    return this.getAllProjects().pipe(
      map((projects) =>
        projects.map((project) => ({
          slug: project.slug,
          title: project.title,
          description: project.description || '',
          date: project.date,
          tags: project.tags || []
        }))
      )
    );
  }
}
