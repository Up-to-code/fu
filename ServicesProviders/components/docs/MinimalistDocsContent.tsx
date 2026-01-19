"use client"

import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useDocsStore } from "./useDocsStore"
import { DocsEditor } from "./DocsEditor"
import { Edit3, Save, X } from "lucide-react"

type TocItem = { id: string; text: string; level: 2 | 3 }

function toPlainText(node: any): string {
  if (node == null) return ""
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (typeof node === "object" && "props" in node) return toPlainText((node as any).props?.children)
  return ""
}

function slugifyHeading(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function buildToc(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const counts = new Map<string, number>()

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/)
    if (!match) continue
    const level = match[1] === "##" ? 2 : 3
    const rawText = match[2].replace(/\s+#*$/, "").trim()
    const base = slugifyHeading(rawText) || "section"
    const current = counts.get(base) ?? 0
    counts.set(base, current + 1)
    const id = current === 0 ? base : `${base}-${current + 1}`
    items.push({ id, text: rawText, level })
  }

  return items
}

/**
 * Minimalist documentation content component with clean design and maximum readability
 */
export function MinimalistDocsContent({
  slug,
  title,
  category,
  defaultContent,
}: {
  slug: string
  title: string
  category?: string
  defaultContent: string
}) {
  const hydrated = useDocsStore((s) => s.hydrated)
  const stored = useDocsStore((s) => s.contentBySlug[slug])
  const setContent = useDocsStore((s) => s.setContent)
  const resetContent = useDocsStore((s) => s.resetContent)

  const content = stored ?? defaultContent
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(false)
  }, [slug])

  const showLoader = useMemo(() => !hydrated && typeof window !== "undefined", [hydrated])
  const toc = useMemo(() => (editing ? [] : buildToc(content)), [content, editing])

  const markdownComponents = useMemo(() => {
    const counts = new Map<string, number>()
    const headingIdFor = (raw: string) => {
      const base = slugifyHeading(raw) || "section"
      const current = counts.get(base) ?? 0
      counts.set(base, current + 1)
      return current === 0 ? base : `${base}-${current + 1}`
    }

    return {
      h1: ({ children }: any) => (
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => {
        const text = toPlainText(children)
        const id = headingIdFor(text)
        return (
          <h2 id={id} className="text-2xl md:text-3xl font-light text-gray-900 mt-12 mb-6 leading-tight">
            {children}
          </h2>
        )
      },
      h3: ({ children }: any) => {
        const text = toPlainText(children)
        const id = headingIdFor(text)
        return (
          <h3 id={id} className="text-xl md:text-2xl font-light text-gray-900 mt-8 mb-4 leading-tight">
            {children}
          </h3>
        )
      },
      h4: ({ children }: any) => (
        <h4 className="text-lg font-medium text-gray-900 mt-6 mb-3">
          {children}
        </h4>
      ),
      p: ({ children }: any) => (
        <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
          {children}
        </p>
      ),
      ul: ({ children }: any) => (
        <ul className="space-y-2 mb-6 text-gray-700">
          {children}
        </ul>
      ),
      ol: ({ children }: any) => (
        <ol className="space-y-2 mb-6 text-gray-700">
          {children}
        </ol>
      ),
      li: ({ children }: any) => (
        <li className="flex items-start">
          <span className="mr-3 text-gray-400">•</span>
          <span className="text-gray-700 leading-relaxed">{children}</span>
        </li>
      ),
      a: ({ href, children }: any) => (
        <a
          href={href}
          className="text-gray-900 underline underline-offset-4 hover:text-gray-700 transition-colors"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-2 border-gray-300 pl-6 my-6 text-gray-600 italic">
          {children}
        </blockquote>
      ),
      table: ({ children }: any) => (
        <div className="overflow-x-auto my-8">
          <table className="w-full text-sm border-collapse">
            {children}
          </table>
        </div>
      ),
      thead: ({ children }: any) => (
        <thead>
          <tr className="border-b border-gray-200">
            {children}
          </tr>
        </thead>
      ),
      th: ({ children }: any) => (
        <th className="text-left px-4 py-3 font-medium text-gray-900 bg-gray-50">
          {children}
        </th>
      ),
      td: ({ children }: any) => (
        <td className="px-4 py-3 border-b border-gray-100 text-gray-700">
          {children}
        </td>
      ),
      code: ({ inline, children }: any) =>
        inline ? (
          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
            {children}
          </code>
        ) : (
          <code className="block">{children}</code>
        ),
      pre: ({ children }: any) => (
        <div className="my-8 rounded-lg bg-gray-900 text-gray-100 p-6 overflow-x-auto">
          <pre className="text-sm leading-relaxed">{children}</pre>
        </div>
      ),
      hr: () => (
        <hr className="my-12 border-gray-200" />
      ),
      strong: ({ children }: any) => (
        <strong className="font-medium text-gray-900">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-gray-700">{children}</em>
      ),
    }
  }, [])

  if (showLoader) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-sm">جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {category && (
                <span className="text-sm text-gray-500 font-medium">
                  {category}
                </span>
              )}
              <h1 className="text-2xl font-light text-gray-900">
                {title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="text-sm">تعديل</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span className="text-sm">إلغاء</span>
                  </button>
                  <button
                    onClick={() => {
                      // Save logic would be implemented here
                      setEditing(false)
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded"
                  >
                    <Save className="h-4 w-4" />
                    <span className="text-sm">حفظ</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-8 xl:col-span-9">
            {editing ? (
              <DocsEditor
                initialValue={content}
                onSave={(newContent) => {
                  setContent(slug, newContent)
                  setEditing(false)
                }}
                onCancel={() => setEditing(false)}
                onReset={() => {
                  resetContent(slug)
                  setEditing(false)
                }}
              />
            ) : (
              <article className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </article>
            )}
          </main>

          {/* Table of Contents */}
          {toc.length > 0 && (
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-8">
                <nav className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    في هذه الصفحة
                  </h3>
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1 ${
                        item.level === 3 ? 'pr-4' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(item.id)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}