import { FastifyInstance } from 'fastify';
import {
  CreateUserSchema,
  RegisterUserInfoSchema,
  UpdateUserSchema,
  createUserJsonSchema,
  registerUserInfoJsonSchema,
  updateUserJsonSchema,
} from './user.schema';
import { createUserHandler, getUserHandler, registerUserInfoHandler, updateUserHandler } from './user.controller';
import { PERMISSIONS } from '../../config/permissions';

export const userRoutes = async (app: FastifyInstance) => {
  app.post<{ Body: CreateUserSchema }>(
    '/',
    { schema: createUserJsonSchema, preHandler: app.guard.scope(PERMISSIONS['admin:*']) },
    createUserHandler,
  );

  app.patch<{ Body: UpdateUserSchema }>(
    '/',
    { schema: updateUserJsonSchema, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    updateUserHandler,
  );
  app.post<{ Body: RegisterUserInfoSchema }>(
    '/info',
    { schema: registerUserInfoJsonSchema, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    registerUserInfoHandler,
  );
  app.get('/me', { preHandler: app.guard.scope(PERMISSIONS['user:*']) }, getUserHandler);
};
