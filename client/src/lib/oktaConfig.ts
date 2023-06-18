export const oktaConfig = {
  clientId: '0oaa0hja7fZhlv2Hg5d7',
  issuer: 'https://dev-75822099.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
};
