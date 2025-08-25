import { pgTable, text, timestamp, serial, varchar } from "drizzle-orm/pg-core";

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
