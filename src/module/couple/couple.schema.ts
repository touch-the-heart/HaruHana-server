import { Static, Type } from '@sinclair/typebox';

export const CoupleImage = Type.Object({
  contentType: Type.String(),
});

export type CoupleImageType = Static<typeof CoupleImage>;
