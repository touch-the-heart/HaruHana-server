import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export const createUserBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  applicationId: z.string().uuid(),
});

export type CreateUserSchema = z.infer<typeof createUserBodySchema>;
export const createUserJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, 'createUserBodySchema'),
};
