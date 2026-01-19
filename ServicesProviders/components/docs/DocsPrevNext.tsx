import Link from "next/link"
import { Button } from "@/components/ui/button"

/**
 * أزرار تنقل بسيطة بين صفحات التوثيق (السابق/التالي) اعتماداً على ترتيب docsRegistry.
 */
export function DocsPrevNext({
  prev,
  next,
}: {
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}) {
  if (!prev && !next) return null

  return (
    <div className="flex items-center justify-between gap-3 pt-6">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className="min-w-0">
          <Button variant="outline" className="rounded-xl">
            السابق: {prev.title}
          </Button>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/docs/${next.slug}`} className="min-w-0">
          <Button variant="outline" className="rounded-xl">
            التالي: {next.title}
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
