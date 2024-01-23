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
export type CouplePageType = Static<typeof CouplePage>;
export const CouplePageSchema = {
  response: {
    200: CouplePage,
  },
  tags: ['couple'],
};
