import { InferInsertModel, eq, and } from 'drizzle-orm';
import { db } from '../../provider/db';
import { application, userRole, users } from '../../provider/db/schema';

export const createUser = async (data: InferInsertModel<typeof users>) => {
  const result = await db
    .insert(users)
    .values({ ...data })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      applicationId: application.id,
    });

  return result[0];
};

export const getUserByApplication = async (applicationId: string) => {
  const result = await db.select().from(users).where(eq(users.applicationId, applicationId));
  return result;
};

export const getUserByEmail = async ({ email, applicationId }: { email: string; applicationId: string }) => {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.applicationId, applicationId)));

  if (!result.length) {
    return null;
  }
  return result[0];
};

export const assignRoleToUser = async (data: InferInsertModel<typeof userRole>) => {
  const result = await db.insert(userRole).values(data).returning();
  return result[0];
};
