"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { docsRegistry } from "./docsRegistry"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, X } from "lucide-react"
import { useState } from "react"

/**
 * شريط تنقل بسيط وعصري للتوثيق
 * تصميم نظيف بدون عناصر زائدة
 */
export function MinimalistDocsSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const grouped = docsRegistry.reduce((acc, item) => {
    const key = item.category ?? "عام"
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {} as Record<string, typeof docsRegistry>)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="فتح القائمة"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:relative inset-y-0 right-0 z-50 w-80 bg-white border-l border-gray-100 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light text-gray-900">فهرس التوثيق</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="p-6 space-y-8">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const isActive = pathname === `/docs/${item.slug}`
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/docs/${item.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block px-3 py-2 text-sm rounded-lg transition-colors",
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            {item.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="space-y-2 text-sm text-gray-500">
              <p>هل تحتاج إلى مساعدة؟</p>
              <Link 
                href="/support" 
                className="text-gray-900 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                تواصل مع الدعم
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}