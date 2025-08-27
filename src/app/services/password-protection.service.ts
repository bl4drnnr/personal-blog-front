import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { PasswordProtectionStatusResponse } from '@interface/password-protection-status-response.interface';
import { VerifyPasswordRequest } from '@interface/verify-password-request.interface';
import { VerifyPasswordResponse } from '@interface/verify-password-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordProtectionService {
  private readonly API_BASE_URL = `${environment.apiUrl}/password-protection`;
  private readonly TOKEN_KEY = 'password_protection_token';
  private readonly TOKEN_EXPIRY_KEY = 'password_protection_token_expiry';

  constructor(private http: HttpClient) {}

  getPasswordProtectionStatus(): Observable<PasswordProtectionStatusResponse> {
    return this.http.get<PasswordProtectionStatusResponse>(
      `${this.API_BASE_URL}/password-protection-status`
    );
  }

  verifyPassword(password: string): Observable<VerifyPasswordResponse> {
    const payload: VerifyPasswordRequest = { password };
    const headers = this.getAdminAuthHeaders();
    return this.http.post<VerifyPasswordResponse>(
      `${this.API_BASE_URL}/password-protection-verify`,
      payload,
      { headers }
    );
  }

  storeAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);

    // Decode JWT to get expiration time
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.error('Error parsing token expiry:', error);
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearAccessToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  isTokenValid(): Observable<boolean> {
    const token = this.getStoredToken();

    if (!token) {
      return of(false);
    }

    // Check if token is expired locally first
    const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (expiryTime && Date.now() > parseInt(expiryTime, 10)) {
      this.clearAccessToken();
      return of(false);
    }

    // For now, return true if token exists and hasn't expired locally
    // In a more robust implementation, you could validate with the backend
    return of(true);
  }

  // Helper method to get admin auth headers (from admin auth system)
  private getAdminAuthHeaders(): HttpHeaders {
    // Get admin access token from localStorage (assuming admin is logged in)
    const adminToken = localStorage.getItem('access_token');

    let headers = new HttpHeaders();

    if (adminToken) {
      headers = headers.set('Authorization', `Bearer ${adminToken}`);
    }

    return headers;
  }
}
