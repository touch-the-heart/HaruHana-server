import { InferSelectModel, eq, or } from 'drizzle-orm';
import { db } from '../../provider/db';
import { couple } from '../../provider/db/schema';

type SelectCouple = InferSelectModel<typeof couple>;

export const getCouple = async (userId: string): Promise<SelectCouple | null> => {
  const result = await db
    .select()
    .from(couple)
    .where(or(eq(couple.userId1, userId), eq(couple.userId2, userId)))
    .limit(1);
  return result.length > 0 ? result[0] : null;
};
