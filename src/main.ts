import { env } from './config/env';
import { db } from './provider/db';
import { buildServer } from './server';
import { logger } from './util/logger';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function setGracefulShutdown(app: Awaited<ReturnType<typeof buildServer>>) {
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      console.log('GOT signal', signal);
      app.close();
    });
  });
}

async function main() {
  const app = await buildServer();
  app.listen({ port: env.PORT, host: env.HOST });

  await migrate(db, {
    migrationsFolder: './migration',
  });

  logger.info('server is running');
  logger.debug(env);
  setGracefulShutdown(app);
}

main();
