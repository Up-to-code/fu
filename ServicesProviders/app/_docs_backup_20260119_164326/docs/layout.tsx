import { DocsSidebar, MobileDocsSidebar } from "@/components/docs/DocsSidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="flex items-center justify-between gap-3 mb-6 lg:hidden">
        <div>
          <p className="text-2xl font-black text-[#242C5A]">Documentation</p>
          <p className="text-sm text-gray-500">Browse and edit docs</p>
        </div>
        <MobileDocsSidebar />
      </div>

      <div className="grid gap-8 lg:grid-cols-12 min-h-[60vh]">
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <DocsSidebar />
        </aside>
        <main className="lg:col-span-8 xl:col-span-9">
          {children}
        </main>
      </div>
    </div>
  )
}

