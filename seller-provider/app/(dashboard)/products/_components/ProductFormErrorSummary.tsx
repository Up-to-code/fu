"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ProductFormErrorItem = {
  label: string;
  message: string;
  targetId?: string;
  stepId?: "basics" | "media" | "options";
};

export function ProductFormErrorSummary(props: {
  items: ProductFormErrorItem[];
  onStepChange?: (stepId: ProductFormErrorItem["stepId"]) => void;
  className?: string;
}) {
  if (props.items.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn("rounded-2xl border border-destructive/20 bg-destructive/5 p-4", props.className)}
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold text-destructive">يرجى تصحيح الأخطاء قبل الحفظ</p>
          <p className="text-sm text-muted-foreground">اضغط على أي عنصر للانتقال إليه</p>
        </div>
        <div className="text-sm font-medium text-destructive">{props.items.length}</div>
      </div>

      <div className="mt-3 space-y-2">
        {props.items.map((it, idx) => (
          <Button
            key={`${it.label}-${idx}`}
            type="button"
            variant="ghost"
            className="w-full justify-between rounded-xl bg-white hover:bg-white/80 border border-destructive/15"
            onClick={() => {
              if (it.stepId && props.onStepChange) props.onStepChange(it.stepId);
              if (!it.targetId) return;
              requestAnimationFrame(() => {
                const el = document.getElementById(it.targetId!);
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                if (el && "focus" in el) (el as any).focus?.();
              });
            }}
          >
            <span className="text-right">
              <span className="block font-medium text-foreground">{it.label}</span>
              <span className="block text-xs text-muted-foreground">{it.message}</span>
            </span>
            <span className="text-xs text-destructive">عرض</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

