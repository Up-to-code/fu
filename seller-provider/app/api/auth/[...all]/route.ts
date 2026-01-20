/**
 * Better Auth API Route Handler
 * Uses official handler from auth-server utilities
 * Following official Convex + Better Auth guide
 * This catch-all route handles all Better Auth endpoints including:
 * - /api/auth/social/sign-in
 * - /api/auth/callback/google
 * - /api/auth/get-session
 * - etc.
 */

import { handler } from "@/lib/auth-server";
import { NextRequest } from "next/server";

// The handler from convexBetterAuthNextJs is an object with GET, POST methods
// These are async functions that take a Request and return a Response
export async function GET(request: NextRequest) {
  try {
    const response = await handler.GET(request);
    return response;
  } catch (error: unknown) {
    console.error("Auth GET handler error:", error);
    const isProd = process.env.NODE_ENV === "production";
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(
      JSON.stringify(isProd ? { error: "Internal server error" } : { error: "Internal server error", message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await handler.POST(request);
    return response;
  } catch (error: unknown) {
    console.error("Auth POST handler error:", error);
    const isProd = process.env.NODE_ENV === "production";
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(
      JSON.stringify(isProd ? { error: "Internal server error" } : { error: "Internal server error", message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
