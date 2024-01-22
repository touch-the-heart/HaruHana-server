import { FastifyInstance } from 'fastify';
import { googleHandler, kakaoHandler } from './auth.controller';

export async function authRoute(app: FastifyInstance) {
  app.get('/google/callback', googleHandler);
  app.get('/kakao/callback', kakaoHandler);
}
