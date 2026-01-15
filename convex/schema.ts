import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    // Products table (for e-commerce functionality)
    products: defineTable({
      name: v.string(),
      description: v.optional(v.string()),
      price: v.number(),
      imageUrl: v.optional(v.string()),
      categoryId: v.optional(v.string()),
      stock: v.optional(v.number()),
      isActive: v.optional(v.boolean()),
    }),

    // Categories table
    categories: defineTable({
      name: v.string(),
      description: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      parentId: v.optional(v.id("categories")),
    }),

    // Orders table
    orders: defineTable({
      userId: v.string(),
      status: v.string(),
      total: v.number(),
      items: v.array(v.object({
        productId: v.string(),
        quantity: v.number(),
        price: v.number(),
      })),
      shippingAddress: v.optional(v.object({
        street: v.string(),
        city: v.string(),
        country: v.string(),
      })),
      createdAt: v.number(),
    }),

    // User addresses
    addresses: defineTable({
      userId: v.string(),
      label: v.string(),
      street: v.string(),
      city: v.string(),
      country: v.string(),
      district: v.optional(v.string()),
      details: v.optional(v.string()),
      isDefault: v.optional(v.boolean()),
    }),

    // Favorites/Wishlist
    favorites: defineTable({
      userId: v.string(),
      productId: v.string(),
    }),

    // User profiles with role information
    userProfiles: defineTable({
      userId: v.string(),
      role: v.string(), // "customer" (default), "freelancer", "vendor", "admin"
      name: v.union(v.string(), v.null()),
      phone: v.union(v.string(), v.null()),
      language: v.optional(v.string()),
      imageStorageId: v.optional(v.id("_storage")),
      isDeleted: v.optional(v.boolean()),
      deletedAt: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
  },
  { schemaValidation: true }
);
