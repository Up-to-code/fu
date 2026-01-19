import { ConvexError } from "convex/values";

export type AppErrorCode =
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_FAILED"
  | "CONFLICT"
  | "INTEGRITY_BLOCKED";

export function throwAppError(code: AppErrorCode, message: string): never {
  throw new ConvexError({ code, message });
}

