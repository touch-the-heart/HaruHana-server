import fastify from 'fastify';
import { logger } from './util/logger';
import { applicationRoutes } from './module/application/application.route';

export async function buildServer() {
  const app = fastify({
    logger,
  });

  // register plugins

  // register routes
  app.register(applicationRoutes, { prefix: '/api/applications' });

  return app;
}
