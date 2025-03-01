import { sendEmail } from "@/actions/email";
import { prisma } from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  user: {
    additionalFields: {
      isOnboarded: { type: "boolean" },
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "รีเซ็ตรหัสผ่านของคุณ",
        html: `คลิกที่ลิงก์เพื่อตั้งรหัสผ่านใหม่: ${url}`,
      });
    },
  },
});
