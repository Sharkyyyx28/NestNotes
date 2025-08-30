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

export const signUpUser = async (email: string, password: string, name: string) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      asResponse: true,
    });

    // if API gives status code, handle it
    if (response.status === 409) {
      return { success: false, message: "User already exists. Please log in." };
    }

    if (!response.ok) {
      return { success: false, message: "Sign up failed. Please try again." };
    }

    return { success: true, message: "Signed up successfully!" };
  } catch (error: any) {
    // handle auth library errors
    const message = error?.message || "Failed to sign up!";
    if (message.toLowerCase().includes("exists")) {
      return { success: false, message: "User already exists. Please log in." };
    }
    return { success: false, message };
  }
};

