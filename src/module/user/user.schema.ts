import { z } from 'zod';

export const createUserBodySchema = z
  .object({
    email: z.string().email(),
    vendor: z.string(),
    name: z.string(),
  })
  .describe('createUserBodySchema');

export const updateUserBodySchema = z
  .object({
    name: z.string(),
    color: z.string(),
  })
  .describe('updateUserBodySchema');

export const registerUserInfoBodySchema = z
  .object({
    name: z.string(),
    color: z.string(),
    code: z.string().nullable(),
    anniversary: z.string().nullable(),
  })
  .describe('registerUserInfoBodySchema');

export type CreateUserSchema = z.infer<typeof createUserBodySchema>;
export type UpdateUserSchema = z.infer<typeof updateUserBodySchema>;
export type RegisterUserInfoSchema = z.infer<typeof registerUserInfoBodySchema>;

export const createUserJsonSchema = {
  body: { $ref: 'createUserBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['user'],
};
export const updateUserJsonSchema = {
  body: { $ref: 'updateUserBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['user'],
};
export const registerUserInfoJsonSchema = {
  body: { $ref: 'registerUserInfoBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['user'],
};
export const userJsonSchema = {
  headers: { $ref: 'auth#' },
  tags: ['user'],
};
