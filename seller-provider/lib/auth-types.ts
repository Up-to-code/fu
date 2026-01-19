export type UserRole = "vendor" | "admin";
export type DashboardRole = "owner" | "admin" | "member";

export const USER_ROLES = {
  VENDOR: "vendor",
  ADMIN: "admin",
} as const;

export const DASHBOARD_ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  MEMBER: "member",
} as const;
