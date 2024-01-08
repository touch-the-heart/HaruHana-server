import { InferInsertModel } from 'drizzle-orm';
import { db } from '../../provider/db';
import { roles } from '../../provider/db/schema';

export async function createRole(data: InferInsertModel<typeof roles>) {
  const result = await db.insert(roles).values(data).returning();
  return result[0];
}
