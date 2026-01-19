import { DocsSidebar, MobileDocsSidebar } from "@/components/docs/DocsSidebar"

/**
 * تخطيط قسم التوثيق (عام داخل التطبيق).
 *
 * - سطح مكتب: شريط جانبي ثابت + محتوى.
 * - جوال: شريط جانبي داخل Sheet مع عنوان مختصر.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8" dir="rtl">
      <a
        href="#docs-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-black focus:text-[#242C5A] focus:shadow"
      >
        تخطَّ إلى المحتوى
      </a>
      <div className="flex items-center justify-between gap-3 mb-6 lg:hidden">
        <div>
          <p className="text-2xl font-black text-[#242C5A]">التوثيق</p>
          <p className="text-sm text-gray-500">استعرض وعدّل الصفحات</p>
        </div>
        <MobileDocsSidebar />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 min-h-[60vh]">
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <DocsSidebar />
        </aside>
        <main id="docs-main" className="lg:col-span-8 xl:col-span-9">
          {children}
        </main>
      </div>
    </div>
  )
}
