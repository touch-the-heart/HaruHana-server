import { InferInsertModel, eq, and, lte, gt } from 'drizzle-orm';
import { coupleImage, couplePage } from '../../../provider/db/schema';
import { db } from '../../../provider/db';

type CreateCouplePage = InferInsertModel<typeof couplePage>;
type FindCouplePage = {
  date: string;
  coupleId: string;
};
type FindCouplePageRange = {
  lteDate: string;
  gtDate: string;
  coupleId: string;
};

export const createCouplePage = async (data: CreateCouplePage) => {
  const result = await db
    .insert(couplePage)
    .values({ ...data })
    .returning();
  return result.at(0);
};

export const getCouplePageById = async (id: string) => {
  const result = await db.select().from(couplePage).where(eq(couplePage.id, id));
  return result.at(0);
};

export const getCouplePage = async (data: FindCouplePage) => {
  const { date, coupleId } = data;
  const rows = await db
    .select()
    .from(couplePage)
    .where(and(eq(couplePage.date, date), eq(couplePage.coupleId, coupleId)))
    .leftJoin(coupleImage, eq(couplePage.id, coupleImage.couplePageId));

  const result = rows.reduce<Record<string, { couplePage: CouplePage; coupleImages: CoupleImage[] }>>((acc, row) => {
    const { couplePage, coupleImage } = row;
    if (!acc[couplePage.coupleId]) {
      acc[couplePage.id] = { couplePage, coupleImages: [] };
    }
    if (coupleImage) {
      acc[couplePage.id].coupleImages.push(coupleImage);
    }
    return acc;
  }, {});
  return Object.values(result);
};

type CouplePage = typeof couplePage.$inferSelect;
type CoupleImage = typeof coupleImage.$inferSelect;

export const getCouplePages = async (data: FindCouplePageRange) => {
  const { gtDate, lteDate, coupleId } = data;
  const rows = await db
    .select()
    .from(couplePage)
    .where(and(eq(couplePage.coupleId, coupleId), lte(couplePage.date, lteDate), gt(couplePage.date, gtDate)))
    .leftJoin(coupleImage, eq(couplePage.id, coupleImage.couplePageId))
    .orderBy(couplePage.date);

  const result = rows.reduce<Record<string, { couplePage: CouplePage; coupleImages: CoupleImage[] }>>((acc, row) => {
    const couplePage = row.couplePage;
    const coupleImage = row.coupleImage;

    if (!acc[couplePage.date]) {
      acc[couplePage.date] = { couplePage, coupleImages: [] };
    }
    if (coupleImage) {
      acc[couplePage.date].coupleImages.push(coupleImage);
    }
    return acc;
  }, {});
  return result;
};
