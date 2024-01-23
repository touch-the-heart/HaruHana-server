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
    nickname: z.string(),
    color: z.string(),
  })
  .describe('updateUserBodySchema');

export const registerUserInfoBodySchema = z
  .object({
    nickname: z.string(),
    color: z.string(),
    code: z.string().optional(),
    anniversary: z.string().optional(),
  })
  .describe('registerUserInfoBodySchema');

export type CreateUserSchema = z.infer<typeof createUserBodySchema>;
export type UpdateUserSchema = z.infer<typeof updateUserBodySchema>;
export type RegisterUserInfoSchema = z.infer<typeof registerUserInfoBodySchema>;

export const createUserJsonSchema = {
  body: { $ref: 'createUserBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['user'],
  description: '유저생성(admin용)',
};
export const updateUserJsonSchema = {
  body: { $ref: 'updateUserBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['user'],
  description: '유저 업데이트',
};
export const registerUserInfoJsonSchema = {
  body: { $ref: 'registerUserInfoBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['user'],
  description: '유저 등록하기',
};
export const userJsonSchema = {
  headers: { $ref: 'auth#' },
  tags: ['user'],
  description: '유저 정보가져오기',
};
