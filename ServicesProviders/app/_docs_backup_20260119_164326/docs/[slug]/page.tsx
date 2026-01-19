import Link from "next/link"
import { getDocContent } from "../_lib/docsServer"
import { DocsContent } from "@/components/docs/DocsContent"
import { Button } from "@/components/ui/button"
import { docsRegistry } from "@/components/docs/docsRegistry"
import { DocsPrevNext } from "@/components/docs/DocsPrevNext"

export default async function DocPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const doc = await getDocContent(slug)

  if (!doc) {
    return (
      <div className="border border-gray-100 rounded-2xl bg-white p-10">
        <h1 className="text-2xl font-black text-[#242C5A]">Document not found</h1>
        <p className="text-gray-600 mt-2">The requested documentation page does not exist.</p>
        <Link href="/docs" className="inline-block mt-6">
          <Button className="rounded-xl bg-[#242C5A] hover:bg-[#1a2144]">Back to docs</Button>
        </Link>
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
