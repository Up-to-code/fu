"use client";

import { ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export function ProductSection(props: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn("bg-white rounded-2xl border border-gray-100 p-6 space-y-4", props.className)}
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 id={titleId} className="text-lg font-bold text-primary">
            {props.title}
          </h2>
          {props.subtitle ? <p className="text-sm text-muted-foreground">{props.subtitle}</p> : null}
        </div>
        {props.right ? <div className="shrink-0">{props.right}</div> : null}
      </div>
      {props.children}
    </section>
  );
}

