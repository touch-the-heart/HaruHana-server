import { FastifyInstance } from 'fastify';
import { googleHandler, kakaoHandler } from './auth.controller';
import { AuthSchema } from './auth.schema';

export async function authRoute(app: FastifyInstance) {
  app.get('/google/callback', { schema: AuthSchema }, googleHandler);
  app.get('/kakao/callback', { schema: AuthSchema }, kakaoHandler);
}
