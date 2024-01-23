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
