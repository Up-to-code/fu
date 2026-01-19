"use client"

import { useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Save, X, RotateCcw, Info } from "lucide-react"

/**
 * محرر توثيق بصيغة Markdown مع معاينة.
 *
 * يوفر: تحرير، معاينة، حفظ، إلغاء، وإعادة ضبط للمحتوى الافتراضي.
 */
export function DocsEditor({
  initialValue,
  onSave,
  onCancel,
  onReset,
}: {
  initialValue: string
  onSave: (value: string) => void
  onCancel: () => void
  onReset: () => void
}) {
  const [value, setValue] = useState(initialValue)
  const [tab, setTab] = useState<"edit" | "preview">("edit")

  const canSave = useMemo(() => value.trim().length > 0, [value])

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="font-black text-[#242C5A]">تعديل التوثيق</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-[#242C5A]" aria-label="تلميح التعديل">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>يدعم Markdown (جداول، قوائم، شيفرة)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl" onClick={onReset} aria-label="إعادة الضبط">
            <RotateCcw className="h-4 w-4" />
            إعادة ضبط
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={onCancel} aria-label="إلغاء التعديل">
            <X className="h-4 w-4" />
            إلغاء
          </Button>
          <Button className="rounded-xl bg-[#242C5A] hover:bg-[#1a2144]" disabled={!canSave} onClick={() => onSave(value)} aria-label="حفظ المحتوى">
            <Save className="h-4 w-4" />
            حفظ
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="p-4">
        <TabsList className="rounded-xl">
          <TabsTrigger value="edit">تحرير</TabsTrigger>
          <TabsTrigger value="preview">معاينة</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="mt-4">
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} className="min-h-[420px] rounded-2xl font-mono text-sm" aria-label="محرر توثيق بصيغة Markdown" />
        </TabsContent>
        <TabsContent value="preview" className="mt-4">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
