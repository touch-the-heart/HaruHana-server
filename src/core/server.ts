/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify';
import { logger } from '../util/logger';
import { userRoutes } from '../module/user/user.route';
import guard from 'fastify-guard';
import jwt from 'jsonwebtoken';
import { registerCorsProvider } from './plugins/cors';
import { registerGoogleOAuth2Provider } from './plugins/oauth2';
import { authRoute } from '../module/auth/auth.route';

type User = {
  id: string;
  scopes: string[];
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
export const App = fastify({
  logger,
});

export async function buildServer() {
  registerCorsProvider(App);
  registerGoogleOAuth2Provider(App);

  //register hook
  App.decorateRequest('user', null);
  App.addHook('onRequest', async (req, _) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return;
    }
    try {
      const token = authHeader.replace('Bearer', '');
      const decode = jwt.decode(token) as User;
      req.user = decode;
    } catch (e) {}
  });
  // register plugins
  App.register(guard, {
    requestProperty: 'user',
    scopeProperty: 'scopes',
    errorHandler: (result, req, res) => {
      return res.send('you can not do that');
    },
  });
  // register routes
  App.get('/', async (_req, _res) => {
    return { hello: 'world' };
  });
  App.register(userRoutes, { prefix: '/api/user' });
  App.register(authRoute, { prefix: '/auth' });

  return App;
}
