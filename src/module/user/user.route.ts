import { FastifyInstance } from 'fastify';
import {
  CreateUserSchema,
  RegisterUserInfoSchema,
  UpdateUserSchema,
  createUserBodySchema,
  createUserJsonSchema,
  registerUserInfoBodySchema,
  registerUserInfoJsonSchema,
  updateUserBodySchema,
  updateUserJsonSchema,
  userJsonSchema,
} from './user.schema';
import { createUserHandler, getUserHandler, registerUserInfoHandler, updateUserHandler } from './user.controller';
import { PERMISSIONS } from '../../config/permissions';
import zodToJsonSchema from 'zod-to-json-schema';

export const userRoutes = async (app: FastifyInstance) => {
  app.addSchema({ $id: 'createUserBodySchema', ...zodToJsonSchema(createUserBodySchema) });
  app.addSchema({ $id: 'updateUserBodySchema', ...zodToJsonSchema(updateUserBodySchema) });
  app.addSchema({ $id: 'registerUserInfoBodySchema', ...zodToJsonSchema(registerUserInfoBodySchema) });

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
  app.get('/me', { schema: userJsonSchema, preHandler: app.guard.scope(PERMISSIONS['user:*']) }, getUserHandler);
};
