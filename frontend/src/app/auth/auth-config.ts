import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://127.0.0.1:8000',
  clientId: 'HealthTracker Personal Access Client',
  responseType: 'code',
  redirectUri: typeof window !== 'undefined' ? window.location.origin + '/callback' : 'http://localhost:4200/callback',
  scope: 'openid profile email',
  requireHttps: false, // Note: Only for development; production should use HTTPS
  showDebugInformation: true,
  oidc: false
};
