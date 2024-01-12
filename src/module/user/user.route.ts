import { FastifyInstance } from 'fastify';
import { createUserJsonSchema } from './user.schema';
import { createUserHandler } from './user.controller';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/', { schema: createUserJsonSchema }, createUserHandler);
};
