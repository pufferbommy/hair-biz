import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://pufferbommy:iv8yiTPyvo8U7XeH@cluster0.2uxuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
);
export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      isOnBoarded: {
        type: "boolean",
      },
    },
  },
});
