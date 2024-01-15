import { FastifyInstance } from 'fastify';
import { createRoleJsonSchema } from './role.schema';
import { createRoleHandler } from './role.controller';

export const roleRoutes = async (app: FastifyInstance) => {
  app.post('/', { schema: createRoleJsonSchema }, createRoleHandler);
};
