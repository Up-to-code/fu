import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const logAuditEvent = async (ctx: any, args: any) => {
    await ctx.db.insert("auditLogs", {
        ...args,
        timestamp: Date.now(),
    });
};
