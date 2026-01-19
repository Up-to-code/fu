import Link from "next/link"
import { DocsHero } from "@/components/docs/DocsHero"
import { getDocsByCategory } from "@/components/docs/docsRegistry"

export default function DocsLandingPage() {
  const grouped = getDocsByCategory()

  return (
    <div>
      <DocsHero />
      <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8" dir="ltr">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 -mt-10 relative z-10">
          {grouped.map(({ category, docs }) => (
            <div key={category} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-wider">{category}</p>
              <p className="text-lg font-black text-[#242C5A] mt-2">{docs.length} pages</p>
              <div className="mt-4 space-y-2">
                {docs.slice(0, 3).map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="block text-sm font-bold text-gray-700 hover:text-[#242C5A]"
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
              <Link href={`/docs/${docs[0]?.slug ?? "service-flow"}`} className="inline-block mt-5 text-sm font-black text-[#242C5A]">
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

