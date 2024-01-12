/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify';
import { logger } from './util/logger';
import { applicationRoutes } from './module/application/application.route';
import { userRoutes } from './module/user/user.route';
import guard from 'fastify-guard';
import jwt from 'jsonwebtoken';

type User = {
  id: string;
  scopes: string[];
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

export async function buildServer() {
  const app = fastify({
    logger,
  });

  //register hook
  app.decorateRequest('user', null);
  app.addHook('onRequest', async (req, _) => {
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
  app.register(guard, {
    requestProperty: 'user',
    scopeProperty: 'scopes',
    errorHandler: (result, req, res) => {
      return res.send('you can not do that');
    },
  });
  // register routes
  app.register(applicationRoutes, { prefix: '/api/application' });
  app.register(userRoutes, { prefix: '/api/user' });

  return app;
}
