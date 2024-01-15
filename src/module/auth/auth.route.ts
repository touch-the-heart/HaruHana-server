import { FastifyInstance } from 'fastify';
import { googleHandler } from './auth.controller';

export async function authRoute(app: FastifyInstance) {
  app.get('/google/callback', googleHandler);
}
