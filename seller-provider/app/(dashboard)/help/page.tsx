"use client";

import { FileText, Video, MessageCircle } from "lucide-react";
import { HelpSearchHeader, HelpCategoriesGrid, FAQSection, ContactSupportCard } from "./_components";

const helpCategories = [
    { icon: FileText, title: "الأسئلة الشائعة", description: "إجابات على الأسئلة الأكثر شيوعاً", count: 24 },
    { icon: Video, title: "فيديوهات تعليمية", description: "شروحات مرئية لاستخدام المنصة", count: 12 },
    { icon: MessageCircle, title: "الدعم الفني", description: "تواصل مع فريق الدعم", count: null },
];

const faqItems = [
    { q: "كيف أضيف منتج جديد؟", a: "اذهب إلى صفحة المنتجات واضغط على زر 'إضافة منتج'" },
    { q: "كيف أتابع حالة الطلبات؟", a: "من صفحة الطلبات يمكنك متابعة جميع الطلبات وحالاتها" },
    { q: "كيف أدعو أعضاء لفريق العمل؟", a: "من صفحة المنشأة يمكنك دعوة أعضاء جدد" },
    { q: "كيف أصدر تقارير المبيعات؟", a: "من صفحة التحليلات اضغط على زر التصدير" },
];

export default function HelpPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto" dir="rtl">
            <HelpSearchHeader />
            <HelpCategoriesGrid categories={helpCategories} />
            <FAQSection items={faqItems} />
            <ContactSupportCard />
        </div>
    );
}
