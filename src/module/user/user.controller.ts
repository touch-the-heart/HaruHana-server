import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserSchema, RegisterUserInfoSchema, UpdateUserSchema } from './user.schema';
import { getRoleByName } from '../role/role.service';
import {
  assignRoleToUser,
  createUser,
  getUserById,
  runFirstRegister,
  runSecondRegister,
  saveUser,
} from './user.service';
import { SYSTEM_ROLES } from '../../config/permissions';
import { getCouple } from '../couple/couple.service';

export const createUserHandler = async (req: FastifyRequest<{ Body: CreateUserSchema }>, res: FastifyReply) => {
  const data = req.body;
  const roleName = SYSTEM_ROLES.APPLICATION_USER;

  const role = await getRoleByName({
    name: roleName,
  });
  if (!role) {
    return res.code(404).send({ message: 'Role not found' });
  }

  try {
    const user = await createUser(data);
    await assignRoleToUser({ userId: user.id, roleId: role.id });
    return user;
  } catch (e) {
    res.send(500).send({ message: 'server error' });
  }
};
export const updateUserHandler = async (req: FastifyRequest<{ Body: UpdateUserSchema }>) => {
  const { nickname, color } = req.body;
  const { id } = req.user;
  return saveUser({ id, nickname, color });
};

export const getUserHandler = async (req: FastifyRequest) => {
  const { id } = req.user;
  const user = await getUserById({ id });
  const couple = await getCouple(id);
  return { user, couple };
};

export const registerUserWithCoupleHandler = async (
  req: FastifyRequest<{ Body: RegisterUserInfoSchema }>,
  res: FastifyReply,
) => {
  const { id } = req.user;
  const { code, nickname, color, anniversary } = req.body;
  const couple = await getCouple(id);

  if (couple) {
    return res.code(400).send({ result: 'false', message: '개인정보를 이미 등록하셨습니다.' });
  }

  if (!code) {
    await runFirstRegister({ userId: id, nickname, color, anniversary: anniversary ?? '' });
    return { result: 'true' };
  }
  await runSecondRegister({ userId: id, nickname, color, code });
  return { result: 'true' };
};
