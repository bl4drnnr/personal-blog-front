import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Copyright } from '@interface/copyright.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CopyrightService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCopyrightData(): Observable<Copyright> {
    return this.http.get<Copyright>(
      `${this.apiUrl}/copyright/get-copyright-data`
    );
  }
}
