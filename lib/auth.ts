import { sendEmail } from "@/actions/email";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { env } from "./env";

const client = new MongoClient(env.MONGO_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
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
