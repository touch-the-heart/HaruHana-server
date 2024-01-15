import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const createUserBodySchema = z.object({
  email: z.string().email(),
  vendor: z.string(),
  name: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserBodySchema>;
export const createUserJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, 'createUserBodySchema'),
};
