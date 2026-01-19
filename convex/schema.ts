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
      businessName: v.optional(v.string()), // Store/Organization name
      phone: v.union(v.string(), v.null()),
      language: v.optional(v.string()),
      imageStorageId: v.optional(v.id("_storage")),
      isDeleted: v.optional(v.boolean()),
      deletedAt: v.optional(v.number()),
      organizationId: v.optional(v.id("organizations")),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
    .index("by_userId", ["userId"]),

    // Services table (for service providers)
    services: defineTable({
      providerId: v.string(),              // Links to userProfiles.userId
      name: v.string(),
      nameEn: v.string(),
      description: v.string(),
      categoryId: v.id("serviceCategories"),
      price: v.number(),
      priceType: v.union(v.literal("fixed"), v.literal("hourly"), v.literal("range")),
      priceRange: v.optional(v.object({
        min: v.number(),
        max: v.number(),
      })),
      images: v.array(v.string()),
      location: v.string(),
      locationType: v.union(v.literal("home"), v.literal("provider_location"), v.literal("remote")),
      duration: v.optional(v.number()),   // Duration in minutes
      experienceYears: v.optional(v.number()),
      languages: v.array(v.string()),
      responseTime: v.optional(v.string()),
      isActive: v.boolean(),
      verified: v.boolean(),
      rating: v.optional(v.number()),
      reviewsCount: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
    .index("by_provider", ["providerId"])
    .index("by_category", ["categoryId"])
    .index("by_provider_and_active", ["providerId", "isActive"]),

    // Service Categories table
    serviceCategories: defineTable({
      name: v.string(),
      nameEn: v.string(),
      description: v.optional(v.string()),
      icon: v.optional(v.string()),
      parentId: v.optional(v.id("serviceCategories")),
      order: v.number(),
    })
    .index("by_parent", ["parentId"]),

    // Bookings table
    bookings: defineTable({
      serviceId: v.id("services"),
      providerId: v.string(),             // Service provider
      customerId: v.string(),              // Customer who booked
      status: v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("in_progress"),
        v.literal("completed"),
        v.literal("cancelled"),
        v.literal("rejected")
      ),
      selectedServices: v.array(v.string()), // Service IDs selected
      scheduledDate: v.string(),           // ISO date string
      scheduledTime: v.string(),          // Time string (HH:mm)
      location: v.union(
        v.literal("home"),
        v.literal("provider_location"),
        v.literal("remote")
      ),
      address: v.optional(v.string()),
      addressId: v.optional(v.id("addresses")),
      phone: v.string(),
      description: v.optional(v.string()),
      totalPrice: v.number(),
      paymentStatus: v.union(v.literal("unpaid"), v.literal("paid"), v.literal("refunded")),
      paymentMethod: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
    .index("by_provider", ["providerId"])
    .index("by_customer", ["customerId"])
    .index("by_service", ["serviceId"])
    .index("by_provider_and_status", ["providerId", "status"])
    .index("by_date", ["scheduledDate"]),

    // Service Reviews table
    serviceReviews: defineTable({
      serviceId: v.id("services"),
      bookingId: v.optional(v.id("bookings")),
      customerId: v.string(),
      customerName: v.string(),
      rating: v.number(),                  // 1-5
      comment: v.string(),
      images: v.optional(v.array(v.string())),
      createdAt: v.number(),
    })
    .index("by_service", ["serviceId"])
    .index("by_customer", ["customerId"]),

    // Organizations
    organizations: defineTable({
      name: v.string(),
      nameLower: v.string(),
      slug: v.string(),
      commercialRegistration: v.optional(v.string()),
      description: v.optional(v.string()),
      website: v.optional(v.string()),
      isDeleted: v.boolean(),
      deletedAt: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
      createdByUserId: v.string(),
      updatedByUserId: v.string(),
    })
    .index("by_slug", ["slug"])
    .index("by_createdAt", ["createdAt"])
    .searchIndex("search_name", { searchField: "name", filterFields: ["isDeleted"] }),

    organizationMembers: defineTable({
      organizationId: v.id("organizations"),
      userId: v.optional(v.string()),
      inviteEmail: v.optional(v.string()),
      role: v.string(),
      isDeleted: v.boolean(),
      deletedAt: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
      createdByUserId: v.string(),
      updatedByUserId: v.string(),
    })
    .index("by_organization", ["organizationId"])
    .index("by_org_user", ["organizationId", "userId"])
    .index("by_email", ["inviteEmail"]),

    auditLogs: defineTable({
      actorUserId: v.string(),
      action: v.string(),
      entityType: v.string(),
      entityId: v.string(),
      before: v.optional(v.any()),
      after: v.optional(v.any()),
      timestamp: v.number(),
    }),
  },
  { schemaValidation: true }
);
