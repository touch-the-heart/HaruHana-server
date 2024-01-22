import { FastifyInstance } from 'fastify';
import { getCoupleImageURL, getCouplePageHandler } from './couple.controller';
import { CoupleImageInputURLType, CoupleImageURLSchema, CoupleImageURLType, CouplePageSchema } from './couple.schema';
import { PERMISSIONS } from '../../config/permissions';

export const coupleRoutes = async (app: FastifyInstance) => {
  app.get(
    '/page/:date',
    { schema: CouplePageSchema, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    getCouplePageHandler,
  );
  // app.get('/calendar/:date', getCoupleCalendarHandler);
  app.post<{ Body: CoupleImageInputURLType; Reply: CoupleImageURLType }>(
    '/image/url',
    {
      schema: CoupleImageURLSchema,
      preHandler: app.guard.scope(PERMISSIONS['user:*']),
    },
    getCoupleImageURL,
  );
};
