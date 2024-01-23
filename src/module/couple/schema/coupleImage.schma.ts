import { Static, Type } from '@sinclair/typebox';

const CoupleImageInput = Type.Object({
  couplePageId: Type.String(),
  src: Type.String(),
});
const CoupleImage = Type.Object({
  id: Type.String(),
  userId: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
  couplePageId: Type.String(),
  src: Type.String(),
});
export type CoupleImageInputType = Static<typeof CoupleImageInput>;
export const CoupleImageSchema = {
  body: CoupleImageInput,
  response: {
    200: CoupleImage,
  },
  tags: ['couple'],
};
