import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Post } from '@interface/post.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostBySlug(slug: string): Observable<Post> {
    if (!this.apiUrl) {
      return throwError(() => new Error('API URL not configured'));
    }

    return this.http.get<Post>(`${this.apiUrl}/posts/${slug}`);
  }

  getPostsSlugs(): Observable<
    {
      slug: string;
      title: string;
      description: string;
      publishDate: string;
      tags: string[];
    }[]
  > {
    return this.getAllPosts().pipe(
      map((posts) =>
        posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          publishDate: post.publishDate || post.date || '',
          tags: post.tags || []
        }))
      )
    );
  }
}
