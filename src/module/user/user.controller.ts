import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserSchema } from './user.schema';
import { SYSTEM_ROLES } from '../../config/permissions';
import { getRoleByName } from '../role/role.service';
import { assignRoleToUser, createUser, getUserByApplication } from './user.service';

export const createUserHandler = async (req: FastifyRequest<{ Body: CreateUserSchema }>, res: FastifyReply) => {
  const data = req.body;
  const roleName = SYSTEM_ROLES.APPLICATION_USER;

  if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
    const appUsers = await getUserByApplication(data.applicationId);
    if (appUsers.length > 0) {
      return res.code(400).send({
        message: 'Application already has super admin user',
        extensions: {
          code: 'APPLICATION_ALRADY_SUPER_USER',
          applicationId: data.applicationId,
        },
      });
    }
  }

  const role = await getRoleByName({
    name: roleName,
    applicationId: data.applicationId,
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
      applicationId: data.applicationId,
    });
    return user;
  } catch (e) {}
};
