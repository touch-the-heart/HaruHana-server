import { InferInsertModel } from 'drizzle-orm';
import { db } from '../../provider/db';
import { application } from '../../provider/db/schema';

export async function createApplication(data: InferInsertModel<typeof application>) {
  const result = await db.insert(application).values(data).returning();
  return result[0];
}

export async function getApplications() {
  const result = await db.select().from(application);
  return result;
}
