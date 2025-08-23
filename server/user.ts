"use server";

import { auth } from "@/lib/auth";
import { success } from "better-auth";

export const signInUser = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "signed in successfully!", data: result };
  } catch (error) {
    const e= error as Error;
    return{success: false , message:e.message||"Failed to sign in !"}
  }
};

export const signUpUser = async (email: string, password: string, name : string) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      asResponse: true,
    });
    return { success: true, message: "signed up sucessfully!" };
  } catch (error) {
    const e= error as Error;
    return{success: false , message:e.message||"Failed to sign up !"}
  }
};
