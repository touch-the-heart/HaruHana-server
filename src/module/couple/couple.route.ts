import { FastifyInstance } from 'fastify';
import { getCoupleImageURL, getCouplePageHandler } from './couple.controller';
import { CoupleImage, CoupleImageType } from './couple.schema';

export const coupleRoutes = async (app: FastifyInstance) => {
  const tags = ['couple'];
  app.get('/page/:date', { schema: { tags } }, getCouplePageHandler);
  // app.get('/calendar/:date', getCoupleCalendarHandler);
  app.post<{ Body: CoupleImageType }>('/image/url', { schema: { body: CoupleImage, tags } }, getCoupleImageURL);
};
