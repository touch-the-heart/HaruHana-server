import { FastifyInstance } from 'fastify';
import { getCouplePageHandler } from './couple.schema';

export const coupleRoutes = async (app: FastifyInstance) => {
  app.get('/page/:date', getCouplePageHandler);
  // app.get('/calendar/:date', getCoupleCalendarHandler);
};
