import fastify from 'fastify';
import { logger } from '../util/logger';
import { userRoutes } from '../module/user/user.route';
import { registerCorsProvider } from './plugins/cors';
import { registerGoogleOAuth2Provider } from './plugins/oauth2';
import { authRoute } from '../module/auth/auth.route';
import { roleRoutes } from '../module/role/role.route';
import { registerGuard } from './plugins/guard';
import { registerOnRequestHook } from './hook/onRequest';
import { registerSwagger } from './plugins/swagger';

export const App = fastify({
  logger,
});

export async function buildServer() {
  await registerCorsProvider(App);
  await registerGoogleOAuth2Provider(App);
  await registerGuard(App);
  await registerOnRequestHook(App);
  await registerSwagger(App);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  App.get('/', async (_req, _res) => {
    return { hello: 'world' };
  });
  App.register(userRoutes, { prefix: '/api/user' });
  App.register(roleRoutes, { prefix: '/api/role' });
  App.register(authRoute, { prefix: '/auth' });

  return App;
}
