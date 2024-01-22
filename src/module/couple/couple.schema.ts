import { Static, Type } from '@sinclair/typebox';

/**
 * CoupleImageURL
 */
export const CoupleImageURLInput = Type.Object({
  contentType: Type.String(),
});
export const CoupleImageURL = Type.Object({
  imageKey: Type.String(),
  url: Type.String(),
  fields: Type.Record(Type.String(), Type.String()),
});

export type CoupleImageInputURLType = Static<typeof CoupleImageURLInput>;
export type CoupleImageURLType = Static<typeof CoupleImageURL>;
export const CoupleImageURLSchema = {
  body: CoupleImageURLInput,
  response: {
    200: CoupleImageURL,
  },
  tags: ['couple'],
};

/**
 * CouplePage
 */

const CouplePage = Type.Object({
  id: Type.String(),
  title: Type.String(),
  date: Type.String(),
  layout: Type.Number(),
  coupleId: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});
export type CouplePageType = Static<typeof CouplePage>;
export const CouplePageSchema = {
  response: {
    200: CouplePage,
  },
  tags: ['couple'],
};
