"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { ProductSection } from "./ProductSection";

export type QuickPresetId = "size_basic" | "color_basic" | "material_basic";

export type QuickPresetOption = { name: string; values: string[] };

const presets: Array<{ id: QuickPresetId; label: string; options: QuickPresetOption[] }> = [
  {
    id: "size_basic",
    label: "مقاسات جاهزة",
    options: [{ name: "المقاس", values: ["S", "M", "L", "XL"] }],
  },
  {
    id: "color_basic",
    label: "ألوان جاهزة",
    options: [{ name: "اللون", values: ["أسود", "أبيض", "رمادي", "بيج"] }],
  },
  {
    id: "material_basic",
    label: "خامات جاهزة",
    options: [{ name: "الخامة", values: ["خشب", "معدن", "قماش", "جلد"] }],
  },
];

export function QuickAddPresets(props: {
  onApply: (presetId: QuickPresetId, options: QuickPresetOption[]) => void;
}) {
  return (
    <ProductSection
      title="إنشاء سريع"
      subtitle="أضف عناصر شائعة بنقرة واحدة"
      right={<Badge variant="outline" className="text-xs">اختصارات</Badge>}
    >
      <div className="grid gap-2 md:grid-cols-3">
        {presets.map((p) => (
          <Button
            key={p.id}
            type="button"
            variant="outline"
            className="rounded-xl justify-between"
            onClick={() => props.onApply(p.id, p.options)}
          >
            <span>{p.label}</span>
            <Plus className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </ProductSection>
  );
}
