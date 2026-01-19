export async function logAuditEvent(
  ctx: any,
  data: {
    actorUserId: string;
    action: string;
    entityType: string;
    entityId: string;
    before?: any;
    after?: any;
  }
) {
  const now = Date.now();
  await ctx.db.insert("auditLogs", {
    actorUserId: data.actorUserId,
    action: data.action,
    entityType: data.entityType,
    entityId: data.entityId,
    before: data.before,
    after: data.after,
    createdAt: now,
  });
}
