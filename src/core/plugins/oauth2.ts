import OAuth2, { OAuth2Namespace } from '@fastify/oauth2';
import { env } from '../../config/env';
import { App } from '../server';

declare module 'fastify' {
  interface FastifyInstance {
    GoogleOAuth2: OAuth2Namespace;
  }
}

const googleOAuth2Options = {
  name: 'GoogleOAuth2',
  scope: ['profile', 'email'],
  credentials: {
    client: {
      id: env.GOOGLE_CLIENT_ID,
      secret: env.GOOGLE_SECRET_ID,
    },
    auth: OAuth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: '/auth/google',
  callbackUri: `http://localhost:8000/auth/google/callback`,
};

export function registerGoogleOAuth2Provider(app: typeof App) {
  app.register(OAuth2, googleOAuth2Options);
}
