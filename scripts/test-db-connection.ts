#!/usr/bin/env tsx

// Load environment variables from .env file
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from the root directory
config({ path: resolve(__dirname, "../.env") });

async function testConnection() {
  try {
    console.log("🔍 Testing database connection...");

    // Check if DATABASE_URL is set
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error("❌ DATABASE_URL environment variable is not set!");
      console.log("💡 Please check your .env file contains DATABASE_URL");
      process.exit(1);
    }

    console.log("✅ DATABASE_URL found");
    console.log(
      `🔗 Connecting to: ${dbUrl.split("@")[1]?.split("?")[0] || "database"}`
    );

    // Try to import and use database
    const { db } = await import("../db");
    const { users } = await import("../db/schema");
    const { count } = await import("drizzle-orm");

    // Test basic connection
    const userCount = await db.select({ count: count() }).from(users);

    console.log("✅ Database connection successful!");
    console.log(`📊 Total users in database: ${userCount[0].count}`);

    // Test a simple query
    const recentUsers = await db
      .select({
        id: users.id,
        name: users.name,
        wa_id: users.wa_id,
        state: users.state,
        role: users.role,
        created_at: users.created_at,
      })
      .from(users)
      .limit(5);

    console.log("📋 Recent users (limited to 5):");
    if (recentUsers.length === 0) {
      console.log("  No users found in database");
    } else {
      recentUsers.forEach((user) => {
        console.log(
          `  - ${user.name || "Unnamed"} (${user.wa_id}) - ${user.state} ${
            user.role
          }`
        );
      });
    }
  } catch (error: any) {
    console.error("❌ Database connection failed:");

    if (error.message?.includes("getaddrinfo ENOTFOUND")) {
      console.error("🌐 Network error: Cannot resolve database host");
      console.log("💡 Check your DATABASE_URL host and network connection");
    } else if (error.message?.includes("connect ECONNREFUSED")) {
      console.error("🔌 Connection refused: Database server not accessible");
      console.log("💡 Check if database server is running and accessible");
    } else if (error.message?.includes("password authentication failed")) {
      console.error("🔐 Authentication failed: Invalid credentials");
      console.log("💡 Check your database username and password");
    } else if (
      error.message?.includes("database") &&
      error.message?.includes("does not exist")
    ) {
      console.error("🗄️ Database does not exist");
      console.log("💡 Check your database name in DATABASE_URL");
    } else if (
      error.message?.includes("relation") &&
      error.message?.includes("does not exist")
    ) {
      console.error("📋 Table 'users' does not exist in database");
      console.log("💡 The users table might not exist in your database yet");
      console.log("💡 This is normal if connecting to a fresh database");
    } else {
      console.error("🔍 Full error:", error.message);
    }

    process.exit(1);
  }
}

testConnection()
  .then(() => {
    console.log("✅ Database test completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Test script failed:", error.message);
    process.exit(1);
  });
