import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ADMIN_USERNAME: z.string().default("admin"),
    ADMIN_PASSWORD: z.string().default("twiga2024!"),
  },
  client: {
    // Add any client-side env vars here
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
});
