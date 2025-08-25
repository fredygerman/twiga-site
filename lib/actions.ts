"use server";

import { db } from "@/db";
import { registrations } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { env } from "@/env.mjs";

export async function submitRegistration(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const schoolName = formData.get("schoolName") as string;
    const email = formData.get("email") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;

    // Validate required fields
    if (!fullName || !schoolName || !email || !whatsappNumber) {
      return { error: "Please fill in all required fields" };
    }

    // Check for existing email
    const existingEmail = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, email))
      .limit(1);

    if (existingEmail.length > 0) {
      return {
        error: "A registration with this email has already been submitted.",
      };
    }

    // Check for existing WhatsApp number
    const existingPhone = await db
      .select()
      .from(registrations)
      .where(eq(registrations.whatsappNumber, whatsappNumber))
      .limit(1);

    if (existingPhone.length > 0) {
      return {
        error:
          "A registration with this WhatsApp number has already been submitted.",
      };
    }

    // Insert into database
    await db.insert(registrations).values({
      fullName,
      schoolName,
      email,
      whatsappNumber,
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to submit registration. Please try again." };
  }
}

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Get admin credentials from environment variables
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = env;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Set authentication cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    redirect("/admin/dashboard");
  } else {
    return { error: "Invalid credentials" };
  }
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_authenticated");
  redirect("/admin");
}

export async function getRegistrations() {
  try {
    const allRegistrations = await db.select().from(registrations);
    return allRegistrations;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}
