"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProductWizardStep = {
  id: "basics" | "media" | "options";
  label: string;
};

export function ProductWizardHeader(props: {
  backHref: string;
  title: string;
  subtitle?: string;
  steps: ProductWizardStep[];
  activeStepId: ProductWizardStep["id"];
  onStepChange: (stepId: ProductWizardStep["id"]) => void;
  isSubmitting?: boolean;
  onSubmit?: () => void;
  submitLabel?: string;
}) {
  const activeIndex = useMemo(
    () => props.steps.findIndex((s) => s.id === props.activeStepId),
    [props.steps, props.activeStepId]
  );

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={props.backHref}>
            <Button type="button" variant="ghost" size="icon" className="rounded-xl">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-primary">{props.title}</h1>
            {props.subtitle ? <p className="text-gray-500">{props.subtitle}</p> : null}
          </div>
        </div>

        {props.onSubmit ? (
          <Button
            type="button"
            disabled={props.isSubmitting}
            className="rounded-xl"
            onClick={props.onSubmit}
          >
            {props.submitLabel ?? "حفظ"}
          </Button>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          الخطوة {Math.max(activeIndex + 1, 1)} من {props.steps.length}
        </p>
      </div>

      <nav aria-label="Product wizard steps" className="-mx-2 px-2 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
        {props.steps.map((s, idx) => {
          const isActive = s.id === props.activeStepId;
          const isDone = idx < activeIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => props.onStepChange(s.id)}
              className={cn(
                "min-w-[10rem] rounded-xl border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : isDone
                    ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              )}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-medium">{s.label}</span>
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs",
                    isActive ? "bg-primary text-primary-foreground" : isDone ? "bg-muted text-foreground" : "bg-muted text-muted-foreground"
                  )}
                  aria-hidden
                >
                  {idx + 1}
                </span>
              </span>
            </button>
          );
        })}
        </div>
      </nav>
    </div>
  );
}
