import { FastifyInstance } from 'fastify';
import {
  getCoupleCalendarHandler,
  getCoupleImageURL,
  getCouplePageHandler,
  uploadCoupleImage,
} from './couple.controller';
import { CoupleImageInputURLType, CoupleImageURLSchema, CoupleImageURLType } from './schema/couple.schema';
import { PERMISSIONS } from '../../config/permissions';
import { CouplePageSchema } from './schema/couplePage.schema';
import { CoupleImageInputType, CoupleImageSchema } from './schema/coupleImage.schma';

export const coupleRoutes = async (app: FastifyInstance) => {
  app.get(
    '/page/:date',
    { schema: CouplePageSchema, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    getCouplePageHandler,
  );
  app.get(
    '/calendar/:date',
    {
      preHandler: app.guard.scope(PERMISSIONS['user:*']),
    },
    getCoupleCalendarHandler,
  );

  app.post<{ Body: CoupleImageInputType }>(
    '/image',
    { schema: CoupleImageSchema, preHandler: app.guard.scope(PERMISSIONS['user:*']) },
    uploadCoupleImage,
  );

  app.post<{ Body: CoupleImageInputURLType; Reply: CoupleImageURLType }>(
    '/image/url',
    {
      schema: CoupleImageURLSchema,
      preHandler: app.guard.scope(PERMISSIONS['user:*']),
    },
    getCoupleImageURL,
  );
};
