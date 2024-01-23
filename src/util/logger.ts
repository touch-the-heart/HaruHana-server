import pino from 'pino';

export const logger = pino({
  redact: [
    'DATABASE_CONNECTION',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_SECRET_ID',
    'TOKEN_SECRET',
    'AWS_ACCESS_KEY',
    'AWS_SECRET_KEY',
    'KAKAO_CLIENT_KEY',
    'KAKAO_SECRET_KEY',
  ],
  level: 'debug',
  transport: {
    target: 'pino-pretty',
  },
  name: 'haruhana',
});
