import { FastifyInstance } from 'fastify';
import { getCoupleImageURL, getCouplePageHandler } from './couple.controller';
import { CoupleImage, CoupleImageType } from './couple.schema';
import { PERMISSIONS } from '../../config/permissions';

export const coupleRoutes = async (app: FastifyInstance) => {
  const tags = ['couple'];
  app.get(
    '/page/:date',
    { schema: { tags }, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    getCouplePageHandler,
  );
  // app.get('/calendar/:date', getCoupleCalendarHandler);
  app.post<{ Body: CoupleImageType }>(
    '/image/url',
    { schema: { body: CoupleImage, tags }, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    getCoupleImageURL,
  );
};
