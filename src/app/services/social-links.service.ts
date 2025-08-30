import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialLink } from '@interface/social-link.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialLinksService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublicSocialLinks(): Observable<Array<SocialLink>> {
    return this.http.get<Array<SocialLink>>(
      `${this.apiUrl}/social-links/get-social-links`
    );
  }
}
