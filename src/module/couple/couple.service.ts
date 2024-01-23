import { InferInsertModel, InferSelectModel, eq, or } from 'drizzle-orm';
import { db } from '../../provider/db';
import { couple } from '../../provider/db/schema';

type SelectCouple = InferSelectModel<typeof couple>;
type CreateCouple = InferInsertModel<typeof couple>;
type updateCouple = Partial<CreateCouple>;

export const getCouple = async (userId: string): Promise<SelectCouple | null> => {
  const result = await db
    .select()
    .from(couple)
    .where(or(eq(couple.userId1, userId), eq(couple.userId2, userId)))
    .limit(1);
  return result.length > 0 ? result[0] : null;
};
export const getCoupleByCode = async (code: string) => {
  const result = await db.select().from(couple).where(eq(couple.code, code)).limit(1);
  return result.length > 0 ? result[0] : null;
};

export const createCouple = async (data: CreateCouple) => {
  const result = await db
    .insert(couple)
    .values({
      ...data,
    })
    .returning();
  return result[0];
};

export const updateCouple = async (data: updateCouple) => {
  const result = await db
    .update(couple)
    .set({
      ...data,
    })
    .returning();
  return result[0];
};
