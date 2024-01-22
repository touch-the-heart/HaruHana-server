import { FastifyInstance } from 'fastify';
import { createRoleBodySchema, createRoleJsonSchema } from './role.schema';
import { createRoleHandler } from './role.controller';
import zodToJsonSchema from 'zod-to-json-schema';

export const roleRoutes = async (app: FastifyInstance) => {
  app.addSchema({ $id: 'createRoleBodySchema', ...zodToJsonSchema(createRoleBodySchema) });

  app.post('/', { schema: createRoleJsonSchema }, createRoleHandler);
};
