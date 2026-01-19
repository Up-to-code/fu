import { describe, it, expect } from "vitest";

// Simple param validation checks (no Convex runtime)
function buildGetServicesArgs(providerId?: string) {
  return providerId ? { providerId } : "skip";
}

describe("service wrappers param builder", () => {
  it("returns skip when providerId is missing", () => {
    expect(buildGetServicesArgs(undefined)).toBe("skip");
  });
  it("returns args when providerId is present", () => {
    expect(buildGetServicesArgs("u_123")).toEqual({ providerId: "u_123" });
  });
});
