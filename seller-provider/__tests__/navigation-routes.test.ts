import { describe, it, expect } from "vitest";
import { getNavigationRoutes, getGroupedNavigationRoutes } from "../config/providers";
import { Permission } from "../lib/permissions";

describe("navigation routes", () => {
  it("filters routes by entity type", () => {
    const asOrganization = getNavigationRoutes("furniture_seller", "organization");
    const asIndividual = getNavigationRoutes("furniture_seller", "individual");

    expect(asOrganization.some((r) => r.id === "organization")).toBe(true);
    expect(asIndividual.some((r) => r.id === "organization")).toBe(false);
  });

  it("filters routes by permissions when provided", () => {
    const noPermissions = getNavigationRoutes("furniture_seller", "organization", []);
    expect(noPermissions.some((r) => r.id === "help")).toBe(true);
    expect(noPermissions.some((r) => r.id === "dashboard")).toBe(false);

    const dashboardOnly = getNavigationRoutes("furniture_seller", "organization", [Permission.VIEW_DASHBOARD]);
    expect(dashboardOnly.some((r) => r.id === "dashboard")).toBe(true);
    expect(dashboardOnly.some((r) => r.id === "orders")).toBe(false);
  });

  it("groups routes into sections", () => {
    const grouped = getGroupedNavigationRoutes("furniture_seller", "organization", [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_ORDERS,
      Permission.VIEW_PRODUCTS,
      Permission.VIEW_CATEGORIES,
      Permission.VIEW_ORGANIZATION,
      Permission.VIEW_ORGANIZATIONS,
      Permission.VIEW_SETTINGS,
    ]);

    expect(grouped.main.length).toBeGreaterThan(0);
    expect(grouped.organization.length).toBeGreaterThan(0);
    expect(grouped.account.length).toBeGreaterThan(0);
  });
});
