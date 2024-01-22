import { InferInsertModel, eq, and, InferSelectModel } from 'drizzle-orm';
import { db } from '../../provider/db';
import { userRole, users } from '../../provider/db/schema';
import { createCouple, getCoupleByCode, updateCouple } from '../couple/couple.service';
import { generateRandomString } from '../../util/random';

type CreateUserModel = InferInsertModel<typeof users>;

type ReadUserModel = InferSelectModel<typeof users>;
type EmailInfo = {
  email: string;
  vendor: 'google' | 'kakao';
};
type UpdateUserInfo = {
  id: string;
  name: string;
  color: string;
};

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

export const getUserByEmail = async ({ email, vendor }: EmailInfo): Promise<ReadUserModel | null> => {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.vendor, vendor)));
  return result.length > 0 ? result[0] : null;
};

export const getUserById = async ({ id }: { id: string }) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result.length > 0 ? result[0] : null;
};
export const updateUserInfoById = async ({ id, name, color }: UpdateUserInfo) => {
  await db.update(users).set({ name, color }).where(eq(users.id, id)).returning({
    name: users.name,
    color: users.color,
  });
};

export const saveUser = async (body: UpdateUserInfo) => {
  const { name, color, id } = body;
  const result = await db.transaction(async (tx) => {
    await db.update(users).set({ name, color }).where(eq(users.id, id));
    const result = await tx.select().from(users).where(eq(users.id, id));
    return result;
  });
  return result[0];
};

export const assignRoleToUser = async (data: InferInsertModel<typeof userRole>) => {
  const result = await db.insert(userRole).values(data).returning();
  return result[0];
};

interface FirstRegister {
  name: string;
  color: string;
  anniversary: string;
  userId: string;
}

interface SecondRegister {
  name: string;
  color: string;
  code: string;
  userId: string;
}

export const runFirstRegister = async (data: FirstRegister) => {
  const { name, color, anniversary, userId } = data;
  if (!name || !color || !anniversary) {
    throw new Error('400');
  }
  await updateUserInfoById({ id: userId, name, color });
  await createCouple({
    userId1: userId,
    anniversary: anniversary,
    code: generateRandomString(),
  });
};

export const runSecondRegister = async (data: SecondRegister) => {
  const { name, color, code, userId } = data;
  const couple = await getCoupleByCode(code);
  if (couple) {
    return;
  }
  await updateUserInfoById({ id: userId, name, color });
  await updateCouple({
    userId2: userId,
  });
};
