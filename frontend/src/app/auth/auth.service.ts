import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Ensure the path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean; // Flag to check if running in the browser

  constructor(
    private oauthService: OAuthService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initializeOAuth(); // Initialize OAuth only if in browser environment
    }
  }

  private initializeOAuth(): void {
    this.oauthService.configure(authConfig);
  this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        
        console.log('Successfully logged in with OAuth!');
        // Redirect or load user data as necessary
      }
   });
  }

  login(email: string, password: string) {
    // Make HTTP POST for custom login
    return this.http.post(`${environment.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    // Make HTTP POST for custom registration
    return this.http.post(`${environment.apiUrl}/register`, { name, email, password, password_confirmation });
  }

  initiateLogin(): void {
    if (this.isBrowser) { // Ensure running in the browser
      this.oauthService.initLoginFlow();
    }
  }

  logOut(): void {
    if (this.isBrowser) { // Ensure running in the browser
      this.oauthService.logOut();
    }
  }

  handleAuthentication(): void {
    if (this.isBrowser && !this.oauthService.hasValidAccessToken()) {
      this.oauthService.initLoginFlow();
    }
  }

  get token() {
    return this.oauthService.getAccessToken();
  }

  get isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token; // Converts the presence of the token into a boolean
  }


  get claims() {
    return this.oauthService.getIdentityClaims();
  }
}
