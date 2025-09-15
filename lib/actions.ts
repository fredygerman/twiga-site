"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq, and, or, ilike, gte, lte, desc } from "drizzle-orm";
import { env } from "@/env.mjs";
import type { AdminDashboardSearchParams } from "./search-params";
import { revalidatePath } from "next/cache";

// Create user in review status
export async function submitRegistration(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const schoolName = formData.get("schoolName") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;

    // Validate required fields
    if (!fullName || !schoolName || !whatsappNumber) {
      return { error: "Please fill in all required fields" };
    }

    // Check for existing WhatsApp number (primary identifier)
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.wa_id, whatsappNumber))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        error: "A user with this WhatsApp number has already been registered.",
      };
    }

    // Insert into users table with in_review status
    await db.insert(users).values({
      name: fullName,
      wa_id: whatsappNumber,
      school_name: schoolName,
      state: "in_review",
      onboarding_state: "new",
      role: "teacher",
      created_at: new Date(),
      updated_at: new Date(),
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

export async function getUsers(filters?: Partial<AdminDashboardSearchParams>) {
  try {
    const query = db.select().from(users);

    // Build where conditions
    const conditions = [];

    // Search filter (searches in name, wa_id, school_name, and region)
    if (filters?.search && filters.search.trim()) {
      const searchTerm = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(users.name, searchTerm),
          ilike(users.wa_id, searchTerm),
          ilike(users.school_name, searchTerm),
          ilike(users.region, searchTerm)
        )
      );
    }

    // Status filter (using user state)
    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(users.state, filters.status));
    }

    // Date range filters
    if (filters?.startDate) {
      conditions.push(gte(users.created_at, new Date(filters.startDate)));
    }

    if (filters?.endDate) {
      // Add 1 day to endDate to include the entire day
      const endDate = new Date(filters.endDate);
      endDate.setDate(endDate.getDate() + 1);
      conditions.push(lte(users.created_at, endDate));
    }

    // Apply conditions if any exist
    const finalQuery =
      conditions.length > 0 ? query.where(and(...conditions)) : query;

    const allUsers = await finalQuery.orderBy(desc(users.created_at));
    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUserState(
  userId: number,
  newState:
    | "blocked"
    | "rate_limited"
    | "new"
    | "onboarding"
    | "active"
    | "inactive"
    | "in_review"
) {
  try {
    await db
      .update(users)
      .set({
        state: newState,
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating user state:", error);
    return { error: "Failed to update user state" };
  }
}

// Approving users in review
export async function approveUser(userId: number) {
  try {
    await db
      .update(users)
      .set({
        state: "active", // When approved, user state becomes "active"
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error approving user:", error);
    return { error: "Failed to approve user" };
  }
}

// Rejecting users in review
export async function rejectUser(userId: number) {
  try {
    await db
      .update(users)
      .set({
        state: "blocked", // When rejected, user state becomes "blocked"
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting user:", error);
    return { error: "Failed to reject user" };
  }
}
