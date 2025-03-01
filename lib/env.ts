import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    NODE_ENV: z.literal("development").or(z.literal("production")),
  },
  experimental__runtimeEnv: process.env,
});
