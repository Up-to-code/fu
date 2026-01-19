"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
            <Accordion type="single" collapsible className="space-y-3">
                {items.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border border-gray-100 rounded-xl px-4 bg-gray-50/50">
                        <AccordionTrigger className="text-right font-bold text-gray-900 hover:no-underline">
                            {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-4">
                            {item.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
