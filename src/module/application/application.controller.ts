/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateApplicationBody } from './application.schema';
import { createApplication, getApplications } from './application.service';
import { createRole } from '../role/role.service';
import { ALL_PERMISSIONS, SYSTEM_ROLES, USER_ROLE_PERMISSIONS } from '../../config/permissions';

export async function createApplicationHandler(
  this: FastifyInstance,
  req: FastifyRequest<{ Body: CreateApplicationBody }>,
  _: FastifyReply,
) {
  const { name } = req.body;
  const application = await createApplication({ name });

  const superAdminRolePromise = createRole({
    applicationId: application.id,
    name: SYSTEM_ROLES.SUPER_ADMIN,
    permissions: ALL_PERMISSIONS as unknown as string[],
  });

  const applicationUserRolePromise = await createRole({
    applicationId: application.id,
    name: SYSTEM_ROLES.APPLICATION_USER,
    permissions: USER_ROLE_PERMISSIONS,
  });

  const [applicationUserRole, superAdminRole] = await Promise.allSettled([
    superAdminRolePromise,
    applicationUserRolePromise,
  ]);

  if (superAdminRole.status === 'rejected') {
    throw new Error('error creating super admin role');
  }

  if (applicationUserRole.status === 'rejected') {
    throw new Error('error creating super admin role');
  }

  return { application, superAdminRole: superAdminRole.value, applicationUserRole: applicationUserRole.value };
}

export async function getApplicationsHandler(
  this: FastifyInstance,
  req: FastifyRequest<{ Body: CreateApplicationBody }>,
  _: FastifyReply,
) {
  return getApplications();
}
