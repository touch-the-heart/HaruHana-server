export const ALL_PERMISSIONS = ['user:*', 'admin:*'] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, permission) => {
    acc[permission] = permission;
    return acc;
  },
  {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>,
);

export const USER_ROLE_PERMISSIONS = [PERMISSIONS['user:*']];
export const ADMIN_ROLE_PERMISSIONS = [PERMISSIONS['admin:*']];
export const SYSTEM_ROLES = {
  APPLICATION_USER: 'APPLICATION_USER',
  ADMIN_USER: 'ADMIN_USER',
};
