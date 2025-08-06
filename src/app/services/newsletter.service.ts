import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SubscribePageDataDto } from '@shared/interfaces/subscribe-page-data.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSubscribePageData(): Observable<SubscribePageDataDto> {
    return this.http
      .get<SubscribePageDataDto>(`${this.API_URL}/newsletters/subscribe`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching subscribe page data:', error);
          throw error;
        })
      );
  }

  subscribe(subscriptionData: { email: string }): Observable<any> {
    return this.http
      .post(`${this.API_URL}/newsletters/subscribe`, subscriptionData)
      .pipe(
        catchError((error) => {
          console.error('Error subscribing to newsletter:', error);
          throw error;
        })
      );
  }
}
