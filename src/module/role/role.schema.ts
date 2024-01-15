import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const createRoleBodySchema = z.object({
  name: z.string(),
  permissions: z.string().array(),
});

export type CreateRoleSchema = z.infer<typeof createRoleBodySchema>;
export const createRoleJsonSchema = {
  body: zodToJsonSchema(createRoleBodySchema, 'createRoleBodySchema'),
};
