import { z } from 'zod';

export const createRoleBodySchema = z.object({
  name: z.string(),
  permissions: z.string().array(),
});

export type CreateRoleSchema = z.infer<typeof createRoleBodySchema>;
export const createRoleJsonSchema = {
  body: { $ref: 'createRoleBodySchema#' },
  headers: { $ref: 'auth#' },
  tags: ['role'],
};
