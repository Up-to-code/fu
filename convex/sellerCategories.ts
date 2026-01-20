import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { throwAppError } from "./errors";

export const listSellerCategories = query({
  args: {
    providerId: v.string(),
    includeDeleted: v.optional(v.boolean()),
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 200);
    const q = ctx.db
      .query("sellerCategories")
      .withIndex("by_provider", (q) => q.eq("providerId", args.providerId))
      .order("desc");

    const page = await q.paginate({ cursor: args.cursor ?? null, numItems: limit });
    const items = args.includeDeleted
      ? page.page
      : page.page.filter((c) => !c.isDeleted);

    return { ...page, page: items };
  },
});

export const createSellerCategory = mutation({
  args: {
    name: v.string(),
    nameEn: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    icon: v.optional(v.string()),
    style: v.optional(v.string()),
    parentId: v.optional(v.id("sellerCategories")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?._id;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    if (!args.name.trim() || args.name.trim().length < 2) {
      throwAppError("VALIDATION_FAILED", "Category name is required");
    }

    if (args.parentId) {
      const parent = await ctx.db.get(args.parentId);
      if (!parent || parent.isDeleted) throwAppError("NOT_FOUND", "Parent category not found");
      if (parent.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");
    }

    const now = Date.now();
    const categoryId = await ctx.db.insert("sellerCategories", {
      providerId,
      name: args.name.trim(),
      nameEn: args.nameEn?.trim(),
      description: args.description?.trim(),
      imageUrl: args.imageUrl,
      image: args.image,
      icon: args.icon,
      style: args.style,
      products: 0,
      parentId: args.parentId,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    });

    return { success: true, categoryId };
  },
});

export const seedDefaultSellerCategories = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?._id;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    const existing = await ctx.db
      .query("sellerCategories")
      .withIndex("by_provider", (q) => q.eq("providerId", providerId))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .first();

    if (existing) {
      return { seeded: false, categoryIds: [] as string[] };
    }

    const now = Date.now();
    const defaults = [
      {
        name: "غرف نوم",
        nameEn: "Bedrooms",
        description: "أسرّة، خزائن ملابس، كومودينو، تسريحات",
        icon: "🛏️",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
        style: "modern",
      },
      {
        name: "غرف معيشة",
        nameEn: "Living Rooms",
        description: "كنب، طاولات قهوة، وحدات تلفزيون، سجاد",
        icon: "🛋️",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400",
        style: "classic",
      },
      {
        name: "غرف طعام",
        nameEn: "Dining Rooms",
        description: "طاولات طعام، كراسي، بوفيهات، خزائن عرض",
        icon: "🍽️",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400",
        style: "luxury",
      },
      {
        name: "مكتبي",
        nameEn: "Office",
        description: "مكاتب عمل، كراسي مكتب، أرفف، خزائن ملفات",
        icon: "💼",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
        style: "minimal",
      },
      {
        name: "إكسسوارات",
        nameEn: "Accessories",
        description: "مرايا، لوحات فنية، مزهريات، ديكورات",
        icon: "🎨",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        style: "modern",
      },
      {
        name: "إضاءة",
        nameEn: "Lighting",
        description: "ثريات، أباجورات، إضاءة أرضية، إضاءة حائط",
        icon: "💡",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
        style: "rustic",
      },
      {
        name: "غرف أطفال",
        nameEn: "Kids Rooms",
        description: "أسرّة أطفال، مكاتب دراسة، خزائن، ألعاب",
        icon: "🧸",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400",
        style: "scandinavian",
      },
      {
        name: "حدائق وخارجية",
        nameEn: "Outdoor",
        description: "جلسات خارجية، طاولات حديقة، مظلات",
        icon: "🌳",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400",
        style: "rustic",
      },
    ];

    const categoryIds: string[] = [];
    for (const c of defaults) {
      const id = await ctx.db.insert("sellerCategories", {
        providerId,
        name: c.name,
        nameEn: c.nameEn,
        description: c.description,
        image: c.image,
        icon: c.icon,
        style: c.style,
        products: 0,
        parentId: undefined,
        isDeleted: false,
        createdAt: now,
        updatedAt: now,
      });
      categoryIds.push(id);
    }

    return { seeded: true, categoryIds };
  },
});

export const updateSellerCategory = mutation({
  args: {
    categoryId: v.id("sellerCategories"),
    name: v.optional(v.string()),
    nameEn: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    image: v.optional(v.string()),
    icon: v.optional(v.string()),
    style: v.optional(v.string()),
    products: v.optional(v.number()),
    parentId: v.optional(v.id("sellerCategories")),
    expectedUpdatedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?._id;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    const category = await ctx.db.get(args.categoryId);
    if (!category || category.isDeleted) throwAppError("NOT_FOUND", "Category not found");
    if (category.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");

    if (args.expectedUpdatedAt !== undefined && category.updatedAt !== args.expectedUpdatedAt) {
      throwAppError("CONFLICT", "CONFLICT");
    }

    if (args.parentId) {
      const parent = await ctx.db.get(args.parentId);
      if (!parent || parent.isDeleted) throwAppError("NOT_FOUND", "Parent category not found");
      if (parent.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");
    }

    const updates: any = { updatedAt: Date.now() };
    if (args.name !== undefined) updates.name = args.name.trim();
    if (args.nameEn !== undefined) updates.nameEn = args.nameEn?.trim();
    if (args.description !== undefined) updates.description = args.description?.trim();
    if (args.imageUrl !== undefined) updates.imageUrl = args.imageUrl;
    if (args.image !== undefined) updates.image = args.image;
    if (args.icon !== undefined) updates.icon = args.icon;
    if (args.style !== undefined) updates.style = args.style;
    if (args.products !== undefined) updates.products = args.products;
    if (args.parentId !== undefined) updates.parentId = args.parentId;

    await ctx.db.patch(args.categoryId, updates);
    return { success: true };
  },
});

export const deleteSellerCategory = mutation({
  args: {
    categoryId: v.id("sellerCategories"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?._id;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    const category = await ctx.db.get(args.categoryId);
    if (!category || category.isDeleted) throwAppError("NOT_FOUND", "Category not found");
    if (category.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");

    await ctx.db.patch(args.categoryId, { isDeleted: true, updatedAt: Date.now() });
    return { success: true };
  },
});
