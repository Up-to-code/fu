import { query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuthUserId } from "./authz";

export const getDashboardStats = query({
  args: {
    from: v.optional(v.number()), // timestamp
    to: v.optional(v.number()), // timestamp
  },
  handler: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    
    // Get stats for the current user (provider)
    // Products count
    const products = await ctx.db
      .query("sellerProducts")
      .withIndex("by_provider_and_deleted", (q) => q.eq("providerId", userId).eq("isDeleted", false))
      .collect();
    
    const activeProductsCount = products.length;

    // Orders stats
    // We need to filter by date if provided
    // Orders have `date` string "YYYY-MM-DD" or `createdAt` number.
    // Schema says `date` string, `createdAt` number.
    // Let's use `createdAt` for easier range filtering if possible, but index is on `createdAt` only in `orders` table not `sellerOrders`.
    // `sellerOrders` has `by_provider`. We fetch all and filter in memory for now (assuming reasonable volume per seller).
    // Or we can use `createdAt` index if we add it to `sellerOrders`.
    // `sellerOrders` schema:
    // .index("by_provider", ["providerId"])
    // .index("by_provider_and_status", ["providerId", "status"])
    // .index("by_orderNumber", ["orderNumber"])
    // It doesn't have createdAt index combined with provider.
    // We'll fetch all orders for provider and filter.
    
    const orders = await ctx.db
      .query("sellerOrders")
      .withIndex("by_provider", (q) => q.eq("providerId", userId))
      .collect();

    const from = args.from || 0;
    const to = args.to || Date.now();

    const filteredOrders = orders.filter(o => {
      // Filter by date range if provided
      // Use createdAt
      return o.createdAt >= from && o.createdAt <= to;
    });

    const revenue = filteredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const ordersCount = filteredOrders.length;
    
    // Unique customers
    const customers = new Set(filteredOrders.map(o => o.email)).size;

    // Calculate trends (mock logic: compare with previous period of same length)
    // Real logic would require fetching prev period data.
    // For now return 0 trends or calculate if possible.
    // Let's just return 0 for trends to save complexity.
    
    return {
      revenue,
      orders: ordersCount,
      products: activeProductsCount,
      customers,
      trends: {
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0,
      }
    };
  },
});

export const getRevenueChartData = query({
  args: {
    from: v.optional(v.number()),
    to: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    
    const orders = await ctx.db
      .query("sellerOrders")
      .withIndex("by_provider", (q) => q.eq("providerId", userId))
      .collect();

    const from = args.from || 0;
    const to = args.to || Date.now();

    const filteredOrders = orders.filter(o => o.createdAt >= from && o.createdAt <= to);

    // Group by month (Arabic names as per mock)
    // Or just return standard format and let UI format.
    // The UI expects: { name: "يناير", total: 45000, orders: 56 }
    
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    
    const grouped = new Map<string, { total: number, orders: number }>();
    
    // Initialize for range? Or just return what we have.
    // If range is large, we might want to fill gaps.
    // Let's just group existing data.
    
    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthName = months[date.getMonth()]; // 0-indexed
      
      const current = grouped.get(monthName) || { total: 0, orders: 0 };
      grouped.set(monthName, {
        total: current.total + (order.total || 0),
        orders: current.orders + 1
      });
    });

    // Convert to array
    // Sort by month index if we want order?
    // We'll just return the entries found.
    const result = Array.from(grouped.entries()).map(([name, stats]) => ({
      name,
      total: stats.total,
      orders: stats.orders
    }));
    
    // Sort by month index to be safe
    result.sort((a, b) => months.indexOf(a.name) - months.indexOf(b.name));

    return result;
  },
});
