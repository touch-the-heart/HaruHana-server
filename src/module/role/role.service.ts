import { InferInsertModel, and, eq } from 'drizzle-orm';
import { db } from '../../provider/db';
import { roles } from '../../provider/db/schema';

export async function createRole(data: InferInsertModel<typeof roles>) {
  const result = await db.insert(roles).values(data).returning();
  return result[0];
}

export async function getRoleByName({ name }: { name: string }) {
  const result = await db
    .select()
    .from(roles)
    .where(and(eq(roles.name, name)))
    .limit(1);
  return result[0];
}
