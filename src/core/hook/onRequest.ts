import { User } from '../fastify';
import { App } from '../server';
import jwt from 'jsonwebtoken';

export const registerOnRequestHook = (app: typeof App) => {
  app.decorateRequest('user', null);
  app.addHook('onRequest', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return;
    }
    try {
      const token = authHeader.replace('Bearer ', '');
      const decode = jwt.decode(token) as User;
      req.user = decode;
    } catch (e) {
      return res.status(403).send();
    }
  });
};
