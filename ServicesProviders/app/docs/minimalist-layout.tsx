import { MinimalistDocsSidebar } from "@/components/docs/MinimalistDocsSidebar"
import Link from "next/link"

/**
 * تخطيط توثيق عصري ومبسط مع تصميم نظيف وقابل للقراءة.
 *
 * - تصميم كامل الشاشة مع مساحة بيضاء مناسبة
 * - تباين عالي مع خطوط واضحة
 * - تنقل بسيط لا يصرف الانتباه
 * - متجاوب مع جميع الأجهزة
 */
export default function MinimalistDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-light text-gray-900">
              منصة الخدمات
            </Link>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
                  التوثيق
                </Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  لوحة التحكم
                </Link>
                <Link href="/settings" className="text-gray-600 hover:text-gray-900 transition-colors">
                  الإعدادات
                </Link>
              </nav>
              <div className="md:hidden">
                <MinimalistDocsSidebar />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 border-l border-gray-100">
            <div className="sticky top-20 p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-4">فهرس التوثيق</h2>
              <MinimalistDocsSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}