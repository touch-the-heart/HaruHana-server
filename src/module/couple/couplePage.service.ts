import { InferInsertModel, eq, and, lte, gt } from 'drizzle-orm';
import { couplePage } from '../../provider/db/schema';
import { db } from '../../provider/db';

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

export const getCouplePage = async (data: FindCouplePage) => {
  const { date, coupleId } = data;
  const result = await db
    .select()
    .from(couplePage)
    .where(and(eq(couplePage.date, date), eq(couplePage.coupleId, coupleId)));
  return result.at(0);
};

export const getCouplePages = async (data: FindCouplePageRange) => {
  const { gtDate, lteDate, coupleId } = data;
  return await db
    .select()
    .from(couplePage)
    .where(and(eq(couplePage.coupleId, coupleId), lte(couplePage.date, lteDate), gt(couplePage.date, gtDate)));
};
