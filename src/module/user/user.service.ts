import { InferInsertModel, eq, and, InferSelectModel } from 'drizzle-orm';
import { db } from '../../provider/db';
import { userRole, users } from '../../provider/db/schema';
import { createCouple, getCoupleByCode, updateCouple } from '../couple/service/couple.service';
import { generateRandomString } from '../../util/random';

type CreateUserModel = InferInsertModel<typeof users>;

type ReadUserModel = InferSelectModel<typeof users>;
type EmailInfo = {
  email: string;
  vendor: 'google' | 'kakao';
};
type UpdateUserInfo = {
  id: string;
  nickname: string;
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
export const updateUserInfoById = async ({ id, nickname, color }: UpdateUserInfo) => {
  await db.update(users).set({ nickname, color }).where(eq(users.id, id)).returning({
    name: users.name,
    color: users.color,
  });
};

export const saveUser = async (body: UpdateUserInfo) => {
  const { nickname, color, id } = body;
  const result = await db.transaction(async (tx) => {
    await db.update(users).set({ nickname, color }).where(eq(users.id, id));
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
  nickname: string;
  color: string;
  anniversary: string;
  userId: string;
}

interface SecondRegister {
  nickname: string;
  color: string;
  code: string;
  userId: string;
}

export const runFirstRegister = async (input: FirstRegister) => {
  const { nickname, color, anniversary, userId } = input;

  if (!nickname || !color || !anniversary) {
    return { result: false, message: '데이터가 맞지 않습니다.', data: null };
  }
  await updateUserInfoById({ id: userId, nickname, color });
  const data = await createCouple({
    userId1: userId,
    anniversary: anniversary,
    code: generateRandomString(),
  });
  return { result: true, data };
};

export const runSecondRegister = async (data: SecondRegister) => {
  const { nickname, color, code, userId } = data;
  const couple = await getCoupleByCode(code);
  if (!couple) {
    return { result: false, message: '커플이 존재하지 않습니다.', data: null };
  }
  await updateUserInfoById({ id: userId, nickname, color });
  const result = await updateCouple({
    userId2: userId,
  });
  return { result: true, data: result };
};
