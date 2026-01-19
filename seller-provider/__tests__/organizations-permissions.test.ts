import { describe, it, expect } from "vitest";
import { getUserPermissions, Permission } from "../lib/permissions";

describe("Organizations permissions", () => {
  it("grants organizations management to admin", () => {
    const perms = getUserPermissions("admin");
    expect(perms).toContain(Permission.VIEW_ORGANIZATIONS);
    expect(perms).toContain(Permission.CREATE_ORGANIZATIONS);
    expect(perms).toContain(Permission.EDIT_ORGANIZATIONS);
    expect(perms).toContain(Permission.DELETE_ORGANIZATIONS);
  });

  it("does not grant organizations management to owner", () => {
    const perms = getUserPermissions("owner");
    expect(perms).not.toContain(Permission.VIEW_ORGANIZATIONS);
  });
});
