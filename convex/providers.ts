/**
 * Providers Convex Functions
 * Queries and mutations for provider configuration
 */

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get provider configuration by userId
 */
export const getProviderConfig = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get user profile
    const profile = await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!profile || profile.isDeleted) {
      return null;
    }

    // Check if user has selected a provider type
    // If role is "customer", they haven't selected a type yet
    if (profile.role === "customer") {
      return null; // User needs to select type
    }

    // Map role to provider type and entity type
    // We now enforce "furniture_seller" for all providers
    const providerType = "furniture_seller";
    
    // If role is "freelancer", treat as "individual" for backward compatibility
    // "vendor" can be either, but usually implies organization or established seller
    // For now, let's assume "vendor" is the standard role
    const entityType = profile.role === "freelancer" 
      ? "individual" 
      : "organization"; // Default to organization or need better mapping

    return {
      id: profile._id,
      providerType,
      entityType,
      name: profile.businessName || profile.name || "مستخدم",
      businessName: profile.businessName,
      userId: args.userId,
    };
  },
});

/**
 * Check if user has selected a provider type
 */
export const hasProviderType = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!profile || profile.isDeleted) {
      return false;
    }

    // If role is "customer", they haven't selected a type
    return profile.role !== "customer";
  },
});

/**
 * Update provider configuration
 */
export const updateProviderConfig = mutation({
  args: {
    userId: v.string(),
    providerType: v.literal("furniture_seller"),
    entityType: v.union(v.literal("individual"), v.literal("organization")),
  },
  handler: async (ctx, args) => {
    // Get user profile
    let profile = await ctx.db
      .query("userProfiles")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    const now = Date.now();

    // Create profile if it doesn't exist
    if (!profile) {
      const profileId = await ctx.db.insert("userProfiles", {
        userId: args.userId,
        role: "customer", // Will be updated below
        name: null,
        phone: null,
        createdAt: now,
        updatedAt: now,
      });
      profile = await ctx.db.get(profileId);
      if (!profile) {
        throw new Error("Failed to create user profile");
      }
    }

    if (profile.isDeleted) {
      throw new Error("User profile is deleted");
    }

    // Always map to "vendor" role for furniture sellers
    const role = "vendor";

    // Update user profile with new role
    await ctx.db.patch(profile._id, {
      role,
      updatedAt: now,
    });

    return { success: true, role };
  },
});
