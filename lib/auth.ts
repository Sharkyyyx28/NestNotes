import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from "@/components/emails/verification-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Notes-app <website@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: React.createElement(VerificationEmail, {
          userEmail: user.email,
          verificationUrl: url,
        }),
      });
    },
    sendOnSignUp: true,
  },
  plugins: [nextCookies()],
});
