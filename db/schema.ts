import {
  pgTable,
  text,
  timestamp,
  serial,
  varchar,
  json,
  date,
  integer,
} from "drizzle-orm/pg-core";

// User states enum values
export const userStates = [
  "blocked",
  "rate_limited",
  "new",
  "onboarding",
  "active",
  "inactive",
  "in_review",
] as const;
export const onboardingStates = [
  "new",
  "personal_info_submitted",
  "completed",
] as const;
export const roles = ["admin", "teacher"] as const;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  wa_id: varchar("wa_id", { length: 20 }).notNull().unique(),
  state: varchar("state", { length: 50 }).default("new").notNull(),
  onboarding_state: varchar("onboarding_state", { length: 50 }).default("new"),
  role: varchar("role", { length: 20 }).default("teacher").notNull(),
  class_info: json("class_info").$type<Record<string, string[]>>(),
  school_name: varchar("school_name", { length: 100 }),
  birthday: date("birthday"),
  region: varchar("region", { length: 50 }),
  last_message_at: timestamp("last_message_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Keep registrations table for backward compatibility if needed
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  schoolName: varchar("school_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
