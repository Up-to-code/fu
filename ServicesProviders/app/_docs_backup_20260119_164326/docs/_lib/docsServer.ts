import { readFile } from "node:fs/promises"
import path from "node:path"

import { getDocMeta } from "@/components/docs/docsRegistry"

export async function getDocContent(slug: string) {
  const meta = getDocMeta(slug)
  if (!meta) return null

  const docsDir = path.join(process.cwd(), "docs")
  const filePath = path.join(docsDir, meta.fileName)

  try {
    const content = await readFile(filePath, "utf8")
    return { ...meta, content }
  } catch {
    return null
  }
}

