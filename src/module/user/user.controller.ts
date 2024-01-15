import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserSchema } from './user.schema';
import { getRoleByName } from '../role/role.service';
import { assignRoleToUser, createUser } from './user.service';
import { SYSTEM_ROLES } from '../../config/permissions';

export const createUserHandler = async (req: FastifyRequest<{ Body: CreateUserSchema }>, res: FastifyReply) => {
  const data = req.body;
  const roleName = SYSTEM_ROLES.APPLICATION_USER;

  const role = await getRoleByName({
    name: roleName,
  });

  if (!role) {
    return res.code(404).send({
      message: 'Role not found',
    });
  }

  try {
    const user = await createUser(data);
    await assignRoleToUser({
      userId: user.id,
      roleId: role.id,
    });
    return user;
  } catch (e) {}
};
