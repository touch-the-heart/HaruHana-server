import { InferInsertModel, eq, and, InferSelectModel } from 'drizzle-orm';
import { db } from '../../provider/db';
import { userRole, users } from '../../provider/db/schema';

type CreateUserModel = InferInsertModel<typeof users>;
type ReadUserModel = InferSelectModel<typeof users>;

export const createUser = async (data: CreateUserModel) => {
  const result = await db
    .insert(users)
    .values({ ...data })
    .returning({
      id: users.id,
      email: users.email,
    });
  return result[0];
};

export const getUserByEmail = async ({
  email,
  vendor,
}: {
  email: string;
  vendor: string;
}): Promise<ReadUserModel | null> => {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.vendor, vendor)));

  if (!result.length) {
    return null;
  }
  return result[0];
};

export const assignRoleToUser = async (data: InferInsertModel<typeof userRole>) => {
  const result = await db.insert(userRole).values(data).returning();
  return result[0];
};
