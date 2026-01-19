import Link from "next/link"
import { getDocContent } from "../_lib/docsServer"
import { DocsContent } from "@/components/docs/DocsContent"
import { Button } from "@/components/ui/button"
import { docsRegistry } from "@/components/docs/docsRegistry"
import { DocsPrevNext } from "@/components/docs/DocsPrevNext"

/**
 * صفحة توثيق ديناميكية تعتمد على slug.
 *
 * - تجلب المحتوى الافتراضي من ملفات Markdown على الخادم.
 * - تعرض محتوى قابل للتعديل على العميل مع حفظ محلي.
 * - تعرض رسالة واضحة عند عدم وجود الصفحة.
 */
export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getDocContent(slug)

  if (!doc) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-10" dir="rtl">
        <h1 className="text-2xl sm:text-3xl font-black text-[#242C5A]">الصفحة غير موجودة</h1>
        <p className="text-gray-600 mt-2 leading-7">
          لم يتم العثور على صفحة التوثيق المطلوبة. تأكد من صحة الرابط، أو اختر صفحة من الفهرس.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/docs" className="inline-flex">
            <Button className="rounded-xl bg-[#242C5A] hover:bg-[#1a2144]">العودة إلى فهرس التوثيق</Button>
          </Link>
          <Link href="/docs/service-flow" className="inline-flex">
            <Button variant="outline" className="rounded-xl">ابدأ من تدفق الخدمة</Button>
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-sm font-black text-gray-500 mb-3">صفحات مقترحة</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {docsRegistry.slice(0, 6).map((d) => (
              <Link key={d.slug} href={`/docs/${d.slug}`} className="rounded-2xl border border-gray-100 px-4 py-3 text-sm font-bold text-gray-700 hover:text-[#242C5A] hover:border-[#242C5A]/20">
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const idx = docsRegistry.findIndex((d) => d.slug === doc.slug)
  const prev = idx > 0 ? docsRegistry[idx - 1] : undefined
  const next = idx >= 0 && idx < docsRegistry.length - 1 ? docsRegistry[idx + 1] : undefined

  return (
    <div>
      <DocsContent slug={doc.slug} title={doc.title} category={doc.category} defaultContent={doc.content} />
      <DocsPrevNext prev={prev ? { slug: prev.slug, title: prev.title } : undefined} next={next ? { slug: next.slug, title: next.title } : undefined} />
    </div>
  )
}