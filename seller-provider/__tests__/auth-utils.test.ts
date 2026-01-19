import { describe, it, expect } from "vitest";
import { shouldRedirect, shouldShowLoader, getLoginRedirectURL } from "../lib/auth/utils";

describe("auth utils", () => {
  it("should redirect when not authenticated and not loading", () => {
    expect(shouldRedirect(false, false)).toBe(true);
  });
  it("should not redirect when loading", () => {
    expect(shouldRedirect(false, true)).toBe(false);
  });
  it("should show loader when loading or initializing", () => {
    expect(shouldShowLoader(true, false)).toBe(true);
    expect(shouldShowLoader(false, true)).toBe(true);
    expect(shouldShowLoader(false, false)).toBe(false);
  });
  it("should build login redirect URL", () => {
    const u = getLoginRedirectURL("/dashboard");
    expect(u.startsWith("/login?redirect=")).toBe(true);
  });
});
