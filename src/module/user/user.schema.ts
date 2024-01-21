import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const createUserBodySchema = z.object({
  email: z.string().email(),
  vendor: z.string(),
  name: z.string(),
}).describe("createUserBodySchema");

export const updateUserBodySchema = z.object({
  name: z.string(),
  color: z.string(),
});
export const registerUserInfoBodySchema = z.object({
  name: z.string(),
  color: z.string(),
  code: z.string().nullable(),
  anniversary: z.string().nullable(),
});

export type CreateUserSchema = z.infer<typeof createUserBodySchema>;
export type UpdateUserSchema = z.infer<typeof updateUserBodySchema>;
export type RegisterUserInfoSchema = z.infer<typeof registerUserInfoBodySchema>;

export const createUserJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, 'createUserBodySchema'),
};
export const updateUserJsonSchema = {
  body: zodToJsonSchema(updateUserBodySchema, 'updateUserBodySchema'),
};
export const registerUserInfoJsonSchema = {
  body: zodToJsonSchema(registerUserInfoBodySchema, 'registerUserInfoBodySchema'),
};
