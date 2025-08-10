import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SubscribePageDataDto } from '@shared/interfaces/subscribe-page-data.interface';
import { SubscribeInterface } from '@interface/subscribe.interface';
import { ConfirmSubscriptionEnum } from '@enums/confirm-subscription.enum';
import { UnsubscribeNewsletterEnum } from '@enums/unsubscribe-newsletter.enum';

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

  subscribe(subscriptionData: SubscribeInterface): Observable<any> {
    return this.http
      .post(`${this.API_URL}/newsletters/subscribe`, subscriptionData)
      .pipe(
        catchError((error) => {
          console.error('Error subscribing to newsletter:', error);
          throw error;
        })
      );
  }

  confirmSubscription(
    newslettersId: string
  ): Observable<ConfirmSubscriptionEnum> {
    return this.http
      .post<ConfirmSubscriptionEnum>(
        `${this.API_URL}/newsletters/confirm-newsletters-subscription/${newslettersId}`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.error('Error confirming newsletter subscription:', error);
          throw error;
        })
      );
  }

  unsubscribeFromNewsletter(
    newslettersId: string
  ): Observable<UnsubscribeNewsletterEnum> {
    return this.http
      .post<UnsubscribeNewsletterEnum>(
        `${this.API_URL}/newsletters/unsubscribe-from-newsletters/${newslettersId}`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.error('Error unsubscribing from newsletter:', error);
          throw error;
        })
      );
  }
}
