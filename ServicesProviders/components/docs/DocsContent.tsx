"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart3, Bell, BookOpenText, CircleHelp, Layers, LayoutDashboard, Loader2, MessagesSquare, Pencil, Settings, ShieldCheck, Star, Users, Wallet } from "lucide-react"
import { useDocsStore } from "./useDocsStore"
import { DocsEditor } from "./DocsEditor"

type TocItem = { id: string; text: string; level: 2 | 3 }

function toPlainText(node: any): string {
  if (node == null) return ""
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (typeof node === "object" && "props" in node) return toPlainText((node as any).props?.children)
  return ""
}

function slugifyHeading(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function buildToc(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const counts = new Map<string, number>()

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/)
    if (!match) continue
    const level = match[1] === "##" ? 2 : 3
    const rawText = match[2].replace(/\s+#*$/, "").trim()
    const base = slugifyHeading(rawText) || "section"
    const current = counts.get(base) ?? 0
    counts.set(base, current + 1)
    const id = current === 0 ? base : `${base}-${current + 1}`
    items.push({ id, text: rawText, level })
  }

  return items
}

function getDocVisual(slug: string) {
  const map: Record<string, { icon: any; subtitle: string }> = {
    "service-flow": { icon: Layers, subtitle: "تعرّف على دورة الخدمة من الحجز حتى تأكيد الإكمال." },
    "service-creation": { icon: BookOpenText, subtitle: "أنشئ خدماتك وحدد خياراتك المسعّرة بطريقة واضحة." },
    "dashboard-tracking": { icon: LayoutDashboard, subtitle: "تتبع العمل الحالي والمواعيد والمؤشرات بسرعة." },
    "chat-consultation": { icon: MessagesSquare, subtitle: "نظّم التواصل والملفات والتحديثات ضمن محادثة واحدة." },
    "banking-wallet": { icon: Wallet, subtitle: "أدر المحفظة والحساب البنكي ومسار الصرف." },
    notifications: { icon: Bell, subtitle: "افهم أنواع الإشعارات وكيفية تفعيلها وتشغيلها." },
    "reviews-ratings": { icon: Star, subtitle: "إدارة التقييمات والمراجعات لتعزيز الثقة والجودة." },
    "auth-account": { icon: ShieldCheck, subtitle: "تسجيل الدخول والتحقق واستعادة كلمة المرور بأمان." },
    settings: { icon: Settings, subtitle: "ضبط تفضيلات الحساب والتنبيهات وتجربة الاستخدام." },
    team: { icon: Users, subtitle: "إدارة أعضاء الفريق وصلاحياتهم وفق أفضل الممارسات." },
    analytics: { icon: BarChart3, subtitle: "قراءة المؤشرات والتقارير لمتابعة الأداء والنمو." },
    "technical-architecture": { icon: ShieldCheck, subtitle: "نظرة عامة على البنية التقنية وحدود الوحدات." },
  }

  return map[slug] ?? { icon: BookOpenText, subtitle: "صفحة توثيق مرتبطة بالميزة حسب الرابط." }
}

/**
 * عرض صفحة توثيق واحدة.
 *
 * - يعرض المحتوى الافتراضي القادم من الخادم.
 * - يسمح بالتعديل والحفظ محلياً عبر useDocsStore.
 * - يعرض حالة تحميل قصيرة قبل اكتمال إعادة الترطيب من localStorage.
 */
export function DocsContent({
  slug,
  title,
  category,
  defaultContent,
}: {
  slug: string
  title: string
  category?: string
  defaultContent: string
}) {
  const hydrated = useDocsStore((s) => s.hydrated)
  const stored = useDocsStore((s) => s.contentBySlug[slug])
  const setContent = useDocsStore((s) => s.setContent)
  const resetContent = useDocsStore((s) => s.resetContent)

  const content = stored ?? defaultContent
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(false)
  }, [slug])

  const showLoader = useMemo(() => !hydrated && typeof window !== "undefined", [hydrated])
  const toc = useMemo(() => (editing ? [] : buildToc(content)), [content, editing])
  const visual = useMemo(() => getDocVisual(slug), [slug])
  const Icon = visual.icon

  const markdownComponents = useMemo(() => {
    const counts = new Map<string, number>()
    const headingIdFor = (raw: string) => {
      const base = slugifyHeading(raw) || "section"
      const current = counts.get(base) ?? 0
      counts.set(base, current + 1)
      return current === 0 ? base : `${base}-${current + 1}`
    }

    return {
      h2: ({ children }: any) => {
        const text = toPlainText(children)
        const id = headingIdFor(text)
        return (
          <h2 id={id} className="scroll-mt-28 mt-10 text-2xl sm:text-[26px] leading-tight font-black text-[#242C5A]">
            {children}
          </h2>
        )
      },
      h3: ({ children }: any) => {
        const text = toPlainText(children)
        const id = headingIdFor(text)
        return (
          <h3 id={id} className="scroll-mt-28 mt-7 text-xl sm:text-[22px] leading-tight font-extrabold text-[#242C5A]">
            {children}
          </h3>
        )
      },
      p: ({ children }: any) => <p className="mt-4 text-[17px] leading-8 text-gray-700">{children}</p>,
      ul: ({ children }: any) => <ul className="mt-4 space-y-2 pr-6 list-disc text-[17px] leading-8 text-gray-700">{children}</ul>,
      ol: ({ children }: any) => <ol className="mt-4 space-y-2 pr-6 list-decimal text-[17px] leading-8 text-gray-700">{children}</ol>,
      li: ({ children }: any) => <li className="marker:text-gray-300">{children}</li>,
      a: ({ href, children }: any) => (
        <a
          href={href}
          className="font-bold text-[#242C5A] underline underline-offset-4 decoration-[#242C5A]/20 hover:decoration-[#242C5A]"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="mt-6 border-r-4 border-[#242C5A]/20 bg-[#242C5A]/[0.03] rounded-2xl px-5 py-4 text-[17px] leading-8 text-gray-700">
          {children}
        </blockquote>
      ),
      table: ({ children }: any) => (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">{children}</table>
        </div>
      ),
      thead: ({ children }: any) => <thead className="bg-gray-50">{children}</thead>,
      th: ({ children }: any) => <th className="text-right px-4 py-3 font-black text-[#242C5A]">{children}</th>,
      td: ({ children }: any) => <td className="text-right px-4 py-3 align-top text-gray-700">{children}</td>,
      code: ({ inline, children }: any) =>
        inline ? (
          <code className="rounded-lg bg-gray-100 px-2 py-1 text-[0.95em] font-mono text-gray-800">{children}</code>
        ) : (
          <code className="block">{children}</code>
        ),
      pre: ({ children }: any) => (
        <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#0B1020] px-5 py-4 text-sm leading-7 text-gray-100">{children}</pre>
      ),
    }
  }, [])

  if (showLoader) {
    return (
      <div className="border border-gray-100 rounded-2xl bg-white p-10 flex items-center justify-center text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="ml-2 font-bold">جارٍ تحميل التوثيق…</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#242C5A]/[0.06] via-white to-white">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-11 w-11 rounded-2xl bg-[#242C5A] text-white flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-gray-500">{category ?? "التوثيق"}</p>
                  <h1 className="text-3xl sm:text-4xl font-black text-[#242C5A] leading-tight">{title}</h1>
                </div>
              </div>
              <p className="text-base sm:text-lg text-gray-600 leading-8">{visual.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/docs" className="inline-flex">
                  <Button variant="outline" className="rounded-xl h-10 px-4">
                    <CircleHelp className="h-4 w-4" />
                    فهرس التوثيق
                  </Button>
                </Link>
                <Link href="/dashboard" className="inline-flex">
                  <Button variant="outline" className="rounded-xl h-10 px-4">
                    <LayoutDashboard className="h-4 w-4" />
                    لوحة التحكم
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">هذه الصفحة قابلة للتعديل، وتنعكس التحديثات على جميع العروض.</p>
            </div>
            {!editing && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="rounded-xl whitespace-nowrap" onClick={() => setEditing(true)} aria-label="تعديل التوثيق">
                      <Pencil className="h-4 w-4" />
                      تعديل
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>تعديل هذا المستند (Markdown)</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>

      {editing ? (
        <DocsEditor
          initialValue={content}
          onSave={(value) => {
            setContent(slug, value)
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
          onReset={() => {
            resetContent(slug)
            setEditing(false)
          }}
        />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="border border-gray-100 rounded-3xl bg-white p-6 sm:p-8">
            <div dir="rtl">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents as any}>
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {toc.length > 0 ? (
            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-5">
                <p className="text-sm font-black text-[#242C5A] mb-3">محتويات الصفحة</p>
                <nav aria-label="محتويات الصفحة">
                  <div className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm font-bold text-gray-600 hover:text-[#242C5A] ${item.level === 3 ? "pr-4" : ""}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </aside>
          ) : null}
        </div>
      )}
    </div>
  )
}
