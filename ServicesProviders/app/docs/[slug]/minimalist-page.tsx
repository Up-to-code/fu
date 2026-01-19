import { MinimalistDocsContent } from "@/components/docs/MinimalistDocsContent"
import { DocsPrevNext } from "@/components/docs/DocsPrevNext"
import { docsRegistry } from "@/components/docs/docsRegistry"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

/**
 * صفحة توثيق ديناميكية مع تصميم عصري ومبسط.
 *
 * - تجلب المحتوى الافتراضي من ملفات Markdown على الخادم.
 * - تعرض محتوى قابل للتعديل على العميل مع حفظ محلي.
 * - تعرض رسالة واضحة عند عدم وجود الصفحة.
 */
export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Dynamic import to avoid build issues
  const { getDocContent } = await import("../_lib/docsServer")
  const doc = await getDocContent(slug)

  if (!doc) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">الصفحة غير موجودة</h1>
            <p className="text-lg text-gray-600 mb-8">
              لم يتم العثور على صفحة التوثيق المطلوبة.
            </p>
            <Link 
              href="/docs" 
              className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>العودة إلى التوثيق</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const idx = docsRegistry.findIndex((d) => d.slug === doc.slug)
  const prev = idx > 0 ? docsRegistry[idx - 1] : undefined
  const next = idx >= 0 && idx < docsRegistry.length - 1 ? docsRegistry[idx + 1] : undefined

  return (
    <div className="min-h-screen bg-white">
      <MinimalistDocsContent 
        slug={doc.slug} 
        title={doc.title} 
        category={doc.category} 
        defaultContent={doc.content} 
      />
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <DocsPrevNext 
          prev={prev ? { slug: prev.slug, title: prev.title } : undefined} 
          next={next ? { slug: next.slug, title: next.title } : undefined} 
        />
      </div>
    </div>
  )
}