"use client";

import { LucideIcon } from "lucide-react";

interface HelpCategory {
    icon: LucideIcon;
    title: string;
    description: string;
    count: number | null;
}

interface HelpCategoriesGridProps {
    categories: HelpCategory[];
}

export function HelpCategoriesGrid({ categories }: HelpCategoriesGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                    <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#242C5A]/20 transition-all cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-[#242C5A]/5 flex items-center justify-center mb-4 group-hover:bg-[#242C5A]/10 transition-colors">
                            <Icon className="h-6 w-6 text-[#242C5A]" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{category.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{category.description}</p>
                        {category.count && (
                            <span className="text-xs text-[#242C5A] font-bold">{category.count} مقالة</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
