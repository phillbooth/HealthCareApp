import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config'; // Ensure this path is correct
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Single constructor with both dependencies
  constructor(
    private oauthService: OAuthService,
    private http: HttpClient
  ) {
    // Configure OAuthService
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (this.oauthService.hasValidAccessToken()) {
        // Handle successful login here
      }
    });
  }

  // Custom login method to handle form-based login
  login(email: string, password: string) {
    console.log('Login attempt with:', email, password);
    // Implement login logic here, e.g., HTTP request to your Laravel API
    return this.http.post('your-api-url/login', { email, password });
  }

  // Custom registration method to handle form-based registration
  register(name: string, email: string, password: string) {
    console.log('Registration attempt with:', name, email, password);
    // Implement registration logic here
    return this.http.post('your-api-url/register', { name, email, password });
  }

  // Start the OAuth login flow
  public initiateLogin(): void {
    this.oauthService.initLoginFlow();
  }

  // Log out from both custom session and OAuth
  public logOut(): void {
    this.oauthService.logOut();
    // Handle other cleanup tasks if needed
  }

  // Handle the authentication process after redirection
  public handleAuthentication(): void {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (this.oauthService.hasValidAccessToken()) {
        // You can now handle the user's session or redirect as necessary
      }
    });
  }

  // Accessor to retrieve the current access token
  public get token() {
    return this.oauthService.getAccessToken();
  }

  // Check if the user is authenticated
  public get isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  // Get the identity claims from the token
  public get claims() {
    return this.oauthService.getIdentityClaims();
  }
}
