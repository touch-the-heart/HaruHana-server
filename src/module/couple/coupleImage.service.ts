import { db } from '../../provider/db';
import { coupleImage } from '../../provider/db/schema';

interface CoupleImageInput {
  src: string;
  userId: string;
  couplePageId: string;
}
export const createCoupleImage = async (input: CoupleImageInput) => {
  const result = await db
    .insert(coupleImage)
    .values({ ...input })
    .returning();
  return result.at(0);
};
