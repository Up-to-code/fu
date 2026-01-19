import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpenText, LayoutDashboard } from "lucide-react"

const BadgeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

/**
 * قسم البطل لصفحة التوثيق.
 *
 * يحافظ على نفس نمط التصميم المستخدم في بطل الصفحة الرئيسية لضمان الاستمرارية البصرية.
 */
export function DocsHero() {
  return (
    <section className="relative min-h-[35vh] flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden py-12 sm:py-14">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(36, 44, 90, 0.02)" }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(36, 44, 90, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(36, 44, 90, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir="rtl">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm"
              style={{
                backgroundColor: "rgba(36, 44, 90, 0.08)",
                border: "1px solid rgba(36, 44, 90, 0.2)",
              }}
            >
              <BadgeIcon className="w-4 h-4 animate-pulse text-[#242C5A]" />
              <span className="text-sm font-bold text-[#242C5A]">مركز التوثيق</span>
            </div>
          </div>

          <div className="space-y-4 mb-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#242C5A] leading-tight">
              كل ما تحتاجه لإدارة خدماتك من البداية إلى النهاية
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              الحجز ← الاستشارة عبر الرسائل ← تأكيد الدفع ← تنفيذ الخدمة ← تأكيد الإكمال.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/docs/service-flow">
              <Button size="lg" className="h-12 px-8 text-white font-bold rounded-xl text-base shadow-sm hover:shadow transition-all bg-[#242C5A] hover:bg-[#1a2144]">
                <BookOpenText className="h-5 w-5" />
                ابدأ القراءة
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs/dashboard-tracking">
              <Button variant="outline" size="lg" className="h-12 px-8 font-bold rounded-xl text-base transition-all text-[#242C5A] border-[#242C5A]/20 hover:bg-[#242C5A]/5">
                <LayoutDashboard className="h-5 w-5" />
                توثيق لوحة التحكم
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
