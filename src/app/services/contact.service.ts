import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
          return of(this.getFallbackContactData());
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

  private getFallbackContactData(): ContactPageData {
    return {
      pageContent: {
        title: 'Contact',
        subtitle: 'Get in Touch',
        description:
          'Feel free to reach out for collaborations, inquiries or just to chat about design.',
        carouselWords: [
          'Design',
          'Development',
          'Innovation',
          'Creative',
          'Modern',
          'Fresh',
          'Professional'
        ],
        submitButtonText: 'Submit Now',
        successMessage:
          "Thank you! Your submission has been received successfully. We'll get back to you shortly—stay tuned!",
        errorMessage:
          'Oops! Something went wrong while submitting the form. Please fill in all fields.'
      },
      layoutData: {
        footerText:
          'LUCH is a fresh and innovative CMS template ideal for creating a portfolio or personal blog.',
        heroImageMain: null,
        heroImageSecondary: null,
        heroImageMainAlt: 'Abstract Gradient Art',
        heroImageSecondaryAlt: 'Astronaut Woman in Spacecraft',
        logoText: 'LUCH',
        breadcrumbText: 'Contact',
        heroTitle: "Let's connect!",
        heroDesc:
          'Feel free to reach out for collaborations, inquiries or just to chat about design.'
      },
      seoData: {
        metaTitle: 'Contact Us | Personal Blog',
        metaDescription:
          'Get in touch with us for collaborations, inquiries, or just to chat about design and development.',
        metaKeywords: 'contact, collaboration, inquiry, design, development',
        ogTitle: 'Contact Us | Personal Blog',
        ogDescription:
          'Get in touch with us for collaborations, inquiries, or just to chat about design and development.',
        ogImage: null,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Us',
          description:
            'Get in touch for collaborations, inquiries, or to chat about design and development'
        }
      },
      contactTiles: [
        {
          title: 'Email Us',
          content: 'hello@luchcreative.com',
          link: 'mailto:hello@luchcreative.com',
          iconUrl: 'assets/images/mail-send-fill.svg',
          sortOrder: 0
        },
        {
          title: 'Call us',
          content: '+1 (555) 123-4567',
          link: 'tel:+15551234567',
          iconUrl: 'assets/images/phone-fill.svg',
          sortOrder: 1
        },
        {
          title: "Let's chat",
          content: '@LuchSupport',
          link: 'https://t.me/LuchSupport',
          iconUrl: 'assets/images/message-2-fill.svg',
          sortOrder: 2
        },
        {
          title: 'Visit us',
          content: 'Dreamcity, USA',
          link: 'https://goo.gl/maps/xyz',
          iconUrl: 'assets/images/map-2-fill.svg',
          sortOrder: 3
        }
      ]
    };
  }
}
