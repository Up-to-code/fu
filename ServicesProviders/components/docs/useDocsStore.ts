"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * مخزن محتوى التوثيق القابل للتعديل.
 *
 * - يحفظ تعديلات المستخدم محلياً (localStorage) عبر Zustand persist.
 * - عند عدم وجود تعديل مخزن لصفحة معينة، يتم عرض المحتوى الافتراضي القادم من ملفات Markdown.
 * - قيمة hydrated تُستخدم لإظهار حالة تحميل بسيطة حتى تتم إعادة الترطيب من التخزين المحلي.
 */
type DocsStore = {
  contentBySlug: Record<string, string>
  hydrated: boolean
  setContent: (slug: string, content: string) => void
  resetContent: (slug: string) => void
  markHydrated: () => void
}

export const useDocsStore = create<DocsStore>()(
  persist(
    (set) => ({
      contentBySlug: {},
      hydrated: false,
      // حفظ محتوى مخصص لصفحة توثيق محددة حسب الـ slug.
      setContent: (slug, content) =>
        set((state) => ({
          contentBySlug: { ...state.contentBySlug, [slug]: content },
        })),
      // إزالة التخصيص ليعود العرض إلى المحتوى الافتراضي.
      resetContent: (slug) =>
        set((state) => {
          const next = { ...state.contentBySlug }
          delete next[slug]
          return { contentBySlug: next }
        }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "docs-content",
      partialize: (state) => ({ contentBySlug: state.contentBySlug }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated()
      },
    }
  )
)
