import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { EmailTemplate } from "../components/EmailTemplate";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { verification } from "@/auth-schema";
import VerificationEmail from "@/components/emails/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const { data, error } = await resend.emails.send({
        from: "Notes-app <website@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: VerificationEmail({
          userEmail: user.email,
          verificationUrl: url,
        }),
      });
    },
    sendOnSignUp: true,
  },

  plugins: [nextCookies()],
});
