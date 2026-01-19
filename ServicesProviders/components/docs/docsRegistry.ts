export type DocMeta = {
  slug: string
  title: string
  category: string
  fileName: string
}

/**
 * سجل صفحات التوثيق (المصدر المركزي للملاحة والعناوين).
 *
 * ملاحظات:
 * - slug هو الذي يظهر في الرابط: /docs/{slug}
 * - fileName يشير إلى ملف Markdown داخل app/docs/_content
 * - category تستخدم لتجميع الصفحات داخل الشريط الجانبي
 */
export const docsRegistry: DocMeta[] = [
  { slug: "service-flow", title: "تدفق الخدمة (من الحجز إلى الإكمال)", category: "البدء", fileName: "service-flow.md" },
  { slug: "service-creation", title: "إنشاء الخدمة وإدارتها", category: "الخدمات", fileName: "service-creation.md" },
  { slug: "dashboard-tracking", title: "لوحة التحكم وتتبع العمل", category: "لوحة التحكم", fileName: "dashboard-tracking.md" },
  { slug: "chat-consultation", title: "المراسلات والاستشارة", category: "المراسلات", fileName: "chat-consultation.md" },
  { slug: "banking-wallet", title: "المحفظة والحساب البنكي", category: "المالية", fileName: "banking-wallet.md" },
  { slug: "notifications", title: "الإشعارات", category: "النظام", fileName: "notifications.md" },
  { slug: "reviews-ratings", title: "التقييمات والمراجعات", category: "الثقة", fileName: "reviews-ratings.md" },
  { slug: "technical-architecture", title: "البنية التقنية (نظرة عامة)", category: "البنية التقنية", fileName: "technical-architecture.md" },
  { slug: "auth-account", title: "التسجيل وتسجيل الدخول والتحقق", category: "الحساب والأمان", fileName: "auth-account.md" },
  { slug: "settings", title: "الإعدادات", category: "الحساب والأمان", fileName: "settings.md" },
  { slug: "team", title: "إدارة الفريق", category: "الإدارة", fileName: "team.md" },
  { slug: "analytics", title: "التحليلات والتقارير", category: "الإدارة", fileName: "analytics.md" },
  { slug: "help-center", title: "مركز المساعدة", category: "الدعم", fileName: "help-center.md" },
  { slug: "policies", title: "الشروط والخصوصية والاستخدام", category: "السياسات", fileName: "policies.md" },
  { slug: "platform-pages", title: "صفحات المنصة العامة", category: "المنصة", fileName: "platform-pages.md" },
]

export function getDocMeta(slug: string) {
  return docsRegistry.find((d) => d.slug === slug)
}

export function getDocsByCategory() {
  const byCategory = new Map<string, DocMeta[]>()
  for (const doc of docsRegistry) {
    const existing = byCategory.get(doc.category)
    if (existing) existing.push(doc)
    else byCategory.set(doc.category, [doc])
  }
  return Array.from(byCategory.entries()).map(([category, docs]) => ({ category, docs }))
}
