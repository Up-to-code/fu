import { readFile } from "node:fs/promises"
import path from "node:path"

import { getDocMeta } from "@/components/docs/docsRegistry"

function isSafeSlug(slug: string) {
  if (!slug) return false
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) return false
  return /^[a-z0-9-]+$/i.test(slug)
}

function extractTitleFromMarkdown(markdown: string) {
  const firstLine = markdown.split("\n", 1)[0] ?? ""
  const match = firstLine.match(/^#\s+(.+)\s*$/)
  return match?.[1]?.trim() || "توثيق"
}

/**
 * تحميل محتوى صفحة التوثيق من ملفات Markdown على الخادم.
 *
 * - يعتمد على سجل docsRegistry لتحديد اسم الملف.
 * - يعيد null عند عدم وجود slug أو عدم القدرة على قراءة الملف.
 * - الغرض هو توفير محتوى افتراضي (Server Default) يمكن للمستخدم تعديله لاحقاً على العميل.
 */
export async function getDocContent(slug: string) {
  if (!isSafeSlug(slug)) return null

  const meta = getDocMeta(slug)
  const fileName = meta?.fileName ?? `${slug}.md`

  const possibleDirs = [
    path.join(process.cwd(), "app", "docs", "_content"),
    path.join(process.cwd(), "ServicesProviders", "app", "docs", "_content"),
  ]

  let content: string | null = null
  let usedPath = ""

  for (const dir of possibleDirs) {
    try {
      const p = path.join(dir, fileName)
      content = await readFile(p, "utf8")
      usedPath = p
      break
    } catch {
      continue
    }
  }

  if (!content) return null

  if (meta) return { ...meta, content }
  return {
    slug,
    title: extractTitleFromMarkdown(content),
    category: "غير مصنّف",
    fileName,
    content,
  }
}
