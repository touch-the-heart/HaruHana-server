import { InferInsertModel, eq, and } from 'drizzle-orm';
import { couplePage } from '../../provider/db/schema';
import { db } from '../../provider/db';

type CreateCouplePage = InferInsertModel<typeof couplePage>;
type FindCouplePage = {
  date: string;
  coupleId: string;
};

export const createCouplePage = async (data: CreateCouplePage) => {
  return await db
    .insert(couplePage)
    .values({ ...data })
    .returning();
};

export const getCouplePage = async (data: FindCouplePage) => {
  const { date, coupleId } = data;
  const result = await db
    .select()
    .from(couplePage)
    .where(and(eq(couplePage.date, date), eq(couplePage.coupleId, coupleId)));
  return result.at(0);
};
