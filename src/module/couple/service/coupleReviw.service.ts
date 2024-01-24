import { coupleReview } from '../../../provider/db/schema';
import { db } from '../../../provider/db';
import { eq } from 'drizzle-orm';

type CreateCoupleReview = typeof coupleReview.$inferInsert;
type UpdateCoupleReview = {
  id: string;
  review: string;
};

export const createCoupleReview = async (data: CreateCoupleReview) => {
  const result = await db
    .insert(coupleReview)
    .values({
      ...data,
    })
    .returning();
  return result[0];
};

export const updateCoupleReview = async (data: UpdateCoupleReview) => {
  const result = await db
    .update(coupleReview)
    .set({
      review: data.review,
    })
    .where(eq(coupleReview.id, data.id))
    .returning();
  return result.at(0);
};

export const getCoupleReviewByCouplePage = async (couplePageId: string) => {
  return await db
    .select()
    .from(coupleReview)
    .where(eq(coupleReview.couplePageId, couplePageId))
    .orderBy(coupleReview.createdAt);
};
