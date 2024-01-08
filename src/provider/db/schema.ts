import { pgTable, uuid, varchar, timestamp, text, primaryKey } from 'drizzle-orm/pg-core';

export const application = pgTable('application', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  name: varchar('email', { length: 256 }).notNull(),
  applicationId: uuid('applicationId')
    .references(() => application.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  permissions: text('permissions').array().$type<Array<string>>(),
  applicationId: uuid('applicationId')
    .references(() => application.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRole = pgTable(
  'userRole',
  {
    applicationId: uuid('applicationId')
      .references(() => application.id)
      .notNull(),
    roleId: uuid('roleId')
      .references(() => roles.id)
      .notNull(),
    userId: uuid('userId')
      .references(() => users.id)
      .notNull(),
  },
  (userRole) => {
    return {
      cpk: primaryKey({ columns: [userRole.applicationId, userRole.roleId, userRole.userId] }),
    };
  },
);
