import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "drizzle-kit";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:5432/twiga_db";

console.log("Using database URL:", databaseUrl);

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
