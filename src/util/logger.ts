import pino from 'pino';

export const logger = pino({
  redact: ['DATABASE_CONNECTION', 'GOOGLE_CLIENT_ID', 'GOOGLE_SECRET_ID', 'TOKEN_SECRET'],
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
});
