import {
  timestamp,
  pgTable as table,
  text,
  // primaryKey,
  // integer,
  uuid,
  // boolean,
  // pgEnum,
  varchar,
  index,
  // uniqueIndex
} from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// Users table
export const users = table(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(), 
    name: varchar('name', { length: 255 }).notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => {
    return{
    emailIndex: index('users_email_idx').on(table.email), // indexing email for faster lookups
  }}
);
