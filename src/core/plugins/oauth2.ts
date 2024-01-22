import OAuth2, { OAuth2Namespace } from '@fastify/oauth2';
import { env } from '../../config/env';
import { App } from '../server';

declare module 'fastify' {
  interface FastifyInstance {
    GoogleOAuth2: OAuth2Namespace;
    KakaoOAuth2: OAuth2Namespace;
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
  callbackUri:
    env.NODE_ENV === 'production'
      ? 'https://api.haruhanas.com/auth/google/callback'
      : `http://localhost:${env.PORT}/auth/google/callback`,
};

const kakaoAuth2Options = {
  name: 'KakaoOAuth2',
  scope: ['profile_nickname', 'account_email'],
  credentials: {
    client: { id: env.KAKAO_CLIENT_KEY, secret: env.KAKAO_SECRET_KEY },
    auth: {
      authorizeHost: 'https://kauth.kakao.com',
      authorizePath: '/oauth/authorize',
      tokenHost: 'https://kauth.kakao.com',
      tokenPath: '/oauth/token',
    },
  },
  startRedirectPath: '/auth/kakao',
  callbackUri:
    env.NODE_ENV === 'production'
      ? 'https://api.haruhanas.com/auth/kakao/callback'
      : `http://localhost:${env.PORT}/auth/kakao/callback`,
  callbackUriParams: {
    response_type: 'code',
  },
};

export function registerGoogleOAuth2Provider(app: typeof App) {
  app.register(OAuth2, googleOAuth2Options);
  app.register(OAuth2, kakaoAuth2Options);
}
