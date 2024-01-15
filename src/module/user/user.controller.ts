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
  const { name, color } = req.body;
  const { id } = req.user;
  return saveUser({ id, name, color });
};

export const getUserHandler = async (req: FastifyRequest) => {
  const { user } = req;
  const userInfo = await getUserById({ id: user.id });
  return userInfo;
};

export const registerUserInfoHandler = async (req: FastifyRequest<{ Body: RegisterUserInfoSchema }>) => {
  const { id } = req.user;
  const { code, name, color, anniversary } = req.body;
  if (!code) {
    await runFirstRegister({ userId: id, name, color, anniversary: anniversary ?? '' });
    return;
  }
  await runSecondRegister({ userId: id, name, color, code });
};
