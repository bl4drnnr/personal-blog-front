import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactPageData } from '@interface/contact-page-data.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContactPageData(): Observable<ContactPageData> {
    return this.http
      .get<ContactPageData>(`${this.API_URL}/contact/contact`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching contact page data:', error);
          // Return fallback data if API fails
          throw error;
        })
      );
  }

  submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/contact/contact`, formData).pipe(
      catchError((error) => {
        console.error('Error submitting contact form:', error);
        throw error;
      })
    );
  }
}
