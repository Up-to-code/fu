"use client";

import { ChevronLeft } from "lucide-react";

interface FAQItem {
    q: string;
    a: string;
}

interface FAQSectionProps {
    items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-[#242C5A] mb-6">الأسئلة الشائعة</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{item.q}</h3>
                            <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-[#242C5A] transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
