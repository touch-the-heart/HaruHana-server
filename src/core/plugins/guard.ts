import { App } from '../server';
import guard from 'fastify-guard';

export const registerGuard = (app: typeof App) => {
  app.register(guard, {
    requestProperty: 'user',
    scopeProperty: 'scopes',
    errorHandler: (result, req, res) => {
      return res.send('you can not do that');
    },
  });
};
