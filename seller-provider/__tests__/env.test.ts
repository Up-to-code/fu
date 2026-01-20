import { describe, it, expect } from "vitest";
import { getPublicEnv } from "../lib/env";

describe("env", () => {
  it("throws when required env vars are missing", () => {
    const prev = { ...process.env };
    delete process.env.NEXT_PUBLIC_CONVEX_URL;
    delete process.env.NEXT_PUBLIC_CONVEX_SITE_URL;
    try {
      expect(() => getPublicEnv()).toThrow();
    } finally {
      process.env = prev;
    }
  });

  it("returns values when required env vars exist", () => {
    const prev = { ...process.env };
    process.env.NEXT_PUBLIC_CONVEX_URL = "https://example.convex.cloud";
    process.env.NEXT_PUBLIC_CONVEX_SITE_URL = "https://example.convex.site";
    try {
      const env = getPublicEnv();
      expect(env.NEXT_PUBLIC_CONVEX_URL).toContain("convex.cloud");
      expect(env.NEXT_PUBLIC_CONVEX_SITE_URL).toContain("convex.site");
    } finally {
      process.env = prev;
    }
  });
});

