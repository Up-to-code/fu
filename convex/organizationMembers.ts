import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { requireOrgRole } from "./authz";

export const listOrganizationMembers = query({
  args: {
    organizationId: v.id("organizations"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    await requireOrgRole(ctx, args.organizationId, ["owner", "admin", "member"]);

    const members = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", (q: any) => q.eq("organizationId", args.organizationId))
      .filter((q: any) => q.eq(q.field("isDeleted"), false))
      .paginate(args.paginationOpts);

    return members;
  },
});

export const createOrganizationMember = mutation({
  args: {
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireOrgRole(ctx, args.organizationId, ["owner", "admin"]);

    const now = Date.now();
    const memberId = await ctx.db.insert("organizationMembers", {
      organizationId: args.organizationId,
      inviteEmail: args.email,
      role: args.role,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
      createdByUserId: userId,
      updatedByUserId: userId,
    });
    return memberId;
  },
});

export const getOrganizationMember = query({
  args: {
    memberId: v.id("organizationMembers"),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.memberId);
    if (!member || member.isDeleted) return null;
    
    return member;
  },
});
