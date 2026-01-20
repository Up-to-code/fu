import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { throwAppError } from "./errors";

export const listSellerProducts = query({
  args: {
    providerId: v.string(),
    categoryId: v.optional(v.id("sellerCategories")),
    status: v.optional(v.string()),
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
    includeDeleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 30, 1), 200);
    const q = ctx.db
      .query("sellerProducts")
      .withIndex("by_provider", (q) => q.eq("providerId", args.providerId))
      .order("desc");

    const page = await q.paginate({ cursor: args.cursor ?? null, numItems: limit });
    let items = args.includeDeleted ? page.page : page.page.filter((p) => !p.isDeleted);

    if (args.categoryId) items = items.filter((p) => p.categoryId === args.categoryId);
    if (args.status) items = items.filter((p) => p.status === args.status);

    return { ...page, page: items };
  },
});

export const getSellerProduct = query({
  args: {
    productId: v.id("sellerProducts"),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product || product.isDeleted) throwAppError("NOT_FOUND", "Product not found");
    return product;
  },
});

export const createSellerProduct = mutation({
  args: {
    name: v.string(),
    nameEn: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.number(),
    comparePrice: v.optional(v.number()),
    stock: v.number(),
    status: v.string(),
    categoryId: v.optional(v.id("sellerCategories")),
    style: v.optional(v.string()),
    sku: v.optional(v.string()),
    image: v.string(),
    images: v.array(v.string()),
    video: v.optional(v.string()),
    videos: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?.userId;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    if (!args.name.trim()) throwAppError("VALIDATION_FAILED", "Product name is required");
    if (args.price < 0) throwAppError("VALIDATION_FAILED", "Invalid price");
    if (args.comparePrice !== undefined && args.comparePrice < 0) throwAppError("VALIDATION_FAILED", "Invalid compare price");
    if (args.stock < 0) throwAppError("VALIDATION_FAILED", "Invalid stock");
    if (!args.image) throwAppError("VALIDATION_FAILED", "Product image is required");

    if (args.categoryId) {
      const category = await ctx.db.get(args.categoryId);
      if (!category || category.isDeleted) throwAppError("NOT_FOUND", "Category not found");
      if (category.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");
    }

    const now = Date.now();
    const productId = await ctx.db.insert("sellerProducts", {
      providerId,
      name: args.name.trim(),
      nameEn: args.nameEn?.trim(),
      description: args.description?.trim(),
      price: args.price,
      comparePrice: args.comparePrice,
      stock: args.stock,
      status: args.status,
      categoryId: args.categoryId,
      style: args.style,
      sku: args.sku,
      image: args.image,
      images: args.images,
      video: args.video,
      videos: args.videos,
      sales: 0,
      views: 0,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
    });

    return { success: true, productId };
  },
});

export const updateSellerProduct = mutation({
  args: {
    productId: v.id("sellerProducts"),
    expectedUpdatedAt: v.optional(v.number()),
    name: v.optional(v.string()),
    nameEn: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    comparePrice: v.optional(v.number()),
    stock: v.optional(v.number()),
    status: v.optional(v.string()),
    categoryId: v.optional(v.id("sellerCategories")),
    style: v.optional(v.string()),
    sku: v.optional(v.string()),
    image: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    video: v.optional(v.string()),
    videos: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?.userId;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    const product = await ctx.db.get(args.productId);
    if (!product || product.isDeleted) throwAppError("NOT_FOUND", "Product not found");
    if (product.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");

    if (args.expectedUpdatedAt !== undefined && product.updatedAt !== args.expectedUpdatedAt) {
      throwAppError("CONFLICT", "CONFLICT");
    }

    if (args.price !== undefined && args.price < 0) throwAppError("VALIDATION_FAILED", "Invalid price");
    if (args.comparePrice !== undefined && args.comparePrice < 0) throwAppError("VALIDATION_FAILED", "Invalid compare price");
    if (args.stock !== undefined && args.stock < 0) throwAppError("VALIDATION_FAILED", "Invalid stock");

    if (args.categoryId) {
      const category = await ctx.db.get(args.categoryId);
      if (!category || category.isDeleted) throwAppError("NOT_FOUND", "Category not found");
      if (category.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");
    }

    const updates: any = { updatedAt: Date.now() };
    if (args.name !== undefined) updates.name = args.name.trim();
    if (args.nameEn !== undefined) updates.nameEn = args.nameEn?.trim();
    if (args.description !== undefined) updates.description = args.description?.trim();
    if (args.price !== undefined) updates.price = args.price;
    if (args.comparePrice !== undefined) updates.comparePrice = args.comparePrice;
    if (args.stock !== undefined) updates.stock = args.stock;
    if (args.status !== undefined) updates.status = args.status;
    if (args.categoryId !== undefined) updates.categoryId = args.categoryId;
    if (args.style !== undefined) updates.style = args.style;
    if (args.sku !== undefined) updates.sku = args.sku;
    if (args.image !== undefined) updates.image = args.image;
    if (args.images !== undefined) updates.images = args.images;
    if (args.video !== undefined) updates.video = args.video;
    if (args.videos !== undefined) updates.videos = args.videos;

    await ctx.db.patch(args.productId, updates);
    return { success: true };
  },
});

export const deleteSellerProduct = mutation({
  args: {
    productId: v.id("sellerProducts"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    const providerId = user?.userId;
    if (!providerId) throwAppError("AUTH_REQUIRED", "Unauthenticated");

    const product = await ctx.db.get(args.productId);
    if (!product || product.isDeleted) throwAppError("NOT_FOUND", "Product not found");
    if (product.providerId !== providerId) throwAppError("FORBIDDEN", "Unauthorized");

    await ctx.db.patch(args.productId, { isDeleted: true, updatedAt: Date.now() });
    return { success: true };
  },
});
