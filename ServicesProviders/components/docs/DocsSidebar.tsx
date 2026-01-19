"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Menu, Info } from "lucide-react"
import { getDocsByCategory } from "./docsRegistry"

/**
 * الشريط الجانبي للتوثيق.
 *
 * - يعرض مجموعات الصفحات حسب التصنيف.
 * - يتضمن بطاقة تعريف (Avatar) في الأعلى.
 * - يتوفر إصدار للجوال عبر Sheet مع إغلاق تلقائي بعد اختيار صفحة.
 */
function DocsNavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const grouped = getDocsByCategory()

  return (
    <div className="space-y-6">
      {grouped.map(({ category, docs }) => (
        <div key={category} className="space-y-2">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider">{category}</p>
          <div className="space-y-1">
            {docs.map((doc) => {
              const href = `/docs/${doc.slug}`
              const active = pathname === href
              return (
                <Link
                  key={doc.slug}
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "block px-3 py-2 rounded-xl text-sm font-bold transition-colors",
                    active ? "bg-[#242C5A]/10 text-[#242C5A]" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {doc.title}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function DocsSidebar() {
  const mockUser = { name: "أحمد منصور", email: "ahmed@example.com", initials: "أم" }

  return (
    <div className="h-full flex flex-col border border-gray-100 rounded-2xl bg-white overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#242C5A] text-white font-bold">{mockUser.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-black text-[#242C5A] truncate">{mockUser.name}</p>
            <p className="text-[11px] text-gray-400 font-bold truncate">{mockUser.email}</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-[#242C5A]" aria-label="مساعدة التوثيق">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>استعرض الأقسام واستخدم زر «تعديل» لتحديث المحتوى</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="p-5 flex-1 overflow-auto">
        <DocsNavList />
      </div>
    </div>
  )
}

export function MobileDocsSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl" aria-label="فتح قائمة التوثيق">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-80">
        <div className="h-full bg-white p-4">
          <div className="h-full border border-gray-100 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <p className="text-lg font-black text-[#242C5A]">التوثيق</p>
              <p className="text-sm text-gray-500">انتقل بين الصفحات</p>
            </div>
            <div className="p-4 overflow-auto h-[calc(100%-88px)]">
              <DocsNavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
