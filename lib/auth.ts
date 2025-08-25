import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_authenticated");

  if (!isAuthenticated || isAuthenticated.value !== "true") {
    redirect("/admin");
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_authenticated");
  return isAuthenticated?.value === "true";
}
