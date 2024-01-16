import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
  dotenv: true,
  schema: z.object({
    PORT: z.number().default(3000),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_CONNECTION: z.string(),
    GOOGLE_CLIENT_ID: z.string().default(''),
    GOOGLE_SECRET_ID: z.string().default(''),
    TOKEN_SECRET: z.string(),
  }),
});
