/**
 * CouplePage
 */

import { Static, Type } from '@sinclair/typebox';

const CouplePage = Type.Object({
  id: Type.String(),
  title: Type.String(),
  date: Type.String(),
  layout: Type.Number(),
  coupleId: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

const CoupleImage = Type.Object({
  id: Type.String(),
  couplePageId: Type.String(),
  src: Type.String(),
  userId: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

const CouplePageResponse = Type.Array(
  Type.Object({
    couplePage: CouplePage,
    coupleImages: Type.Array(CoupleImage),
  }),
);

export type CouplePageType = Static<typeof CouplePage>;
export const CouplePageSchema = {
  response: {
    200: CouplePageResponse,
  },
  tags: ['couple'],
};
