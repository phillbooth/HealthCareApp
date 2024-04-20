import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://127.0.0.1:8000',

  // URL of the SPA to redirect the user to after login
  redirectUri: typeof window !== 'undefined' ? window.location.origin + '/callback' : 'http://localhost:4200/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'HealthTracker Personal Access Client', // Replace with the client ID provided by your OAuth provider

  // Just needed if your auth server demands a secret. In general, this
  // is a bad idea. Only use it if there is no other choice.
  dummyClientSecret: 'YOUR_CLIENT_SECRET_IF_REQUIRED',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email',

  responseType: 'code',

  // Disable OIDC Discovery by providing manually the information
  // which is normally provided by the Discovery document
  // This might be necessary when the auth server does not provide a discovery document
  // or when using dynamic urls which are not compatible with the standard
  showDebugInformation: true, // Also enable console debug logs for development

  oidc: false // Set to false to use OAuth 2.0 without OpenID Connect
};
