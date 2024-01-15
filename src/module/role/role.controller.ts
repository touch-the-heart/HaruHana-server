import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateRoleSchema } from './role.schema';
import { createRole } from './role.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createRoleHandler = async (req: FastifyRequest<{ Body: CreateRoleSchema }>, _res: FastifyReply) => {
  const { name, permissions } = req.body;
  const role = await createRole({ name, permissions });
  return role;
};
