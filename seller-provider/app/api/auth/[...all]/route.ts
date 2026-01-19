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
    const url = new URL(request.url);
    console.log("Auth GET request:", url.pathname);
    const response = await handler.GET(request);
    console.log("Auth GET response status:", response.status);
    return response;
  } catch (error: any) {
    console.error("Auth GET handler error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    console.log("Auth POST request:", url.pathname);
    const response = await handler.POST(request);
    console.log("Auth POST response status:", response.status);
    return response;
  } catch (error: any) {
    console.error("Auth POST handler error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error?.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
