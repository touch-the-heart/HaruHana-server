import { pgTable, uuid, varchar, timestamp, text, primaryKey, date, smallint, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  vendor: varchar('vendor', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull().default(''),
  nickname: varchar('nickname', { length: 256 }).notNull().default(''),
  color: varchar('color', { length: 256 }).notNull().default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  permissions: text('permissions').array().$type<Array<string>>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRole = pgTable(
  'userRole',
  {
    roleId: uuid('roleId')
      .references(() => roles.id)
      .notNull(),
    userId: uuid('userId')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (userRole) => {
    return {
      cpk: primaryKey({ columns: [userRole.roleId, userRole.userId] }),
    };
  },
);

export const couple = pgTable(
  'couple',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    code: varchar('code', { length: 8 }).unique().notNull(),
    anniversary: date('anniversary').notNull(),
    userId1: uuid('userId1')
      .references(() => users.id)
      .notNull(),
    userId2: uuid('userId2').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      userId1Idx: index('user1_idx').on(table.userId1),
      userId2Idx: index('user2_idx').on(table.userId2),
    };
  },
);

export const couplePage = pgTable('couplePage', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  date: date('date').notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  layout: smallint('layout').notNull().default(1),
  coupleId: uuid('coupleId')
    .references(() => couple.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const coupleImage = pgTable('coupleImage', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  couplePageId: uuid('couplePageId')
    .references(() => couplePage.id)
    .notNull(),
  src: varchar('src').notNull().default(''),
  userId: uuid('userId')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const coupleReview = pgTable('coupleReview', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  review: varchar('review').notNull(),
  userId: uuid('userId')
    .references(() => users.id)
    .notNull(),
  couplePageId: uuid('couplePageId')
    .references(() => couplePage.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
