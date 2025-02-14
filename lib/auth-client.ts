import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const {
  $Infer,
  $ERROR_CODES,
  useSession,
  signIn,
  signUp,
  signOut,
  getSession,
} = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type Session = typeof $Infer.Session;
