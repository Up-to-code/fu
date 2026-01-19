"use client";

import { FileText, Video, MessageCircle } from "lucide-react";
import { HelpSearchHeader, HelpCategoriesGrid, FAQSection, ContactSupportCard } from "./_components";

const helpCategories = [
    { icon: FileText, title: "الأسئلة الشائعة", description: "إجابات على الأسئلة الأكثر شيوعاً", count: 24 },
    { icon: Video, title: "فيديوهات تعليمية", description: "شروحات مرئية لاستخدام المنصة", count: 12 },
    { icon: MessageCircle, title: "الدعم الفني", description: "تواصل مع فريق الدعم", count: null },
];

const faqItems = [
    { q: "كيف أضيف خدمة جديدة؟", a: "اذهب إلى صفحة خدماتي ثم اضغط على زر 'إضافة خدمة' أو افتح /services/new." },
    { q: "كيف أضيف خيارات وأسعار مختلفة للخدمة؟", a: "أثناء إنشاء الخدمة أضف خيارات مخصصة مع سعر لكل خيار، وحدد الحد الأدنى (والحد الأعلى اختياري)." },
    { q: "أين أتابع مواعيد الحجوزات؟", a: "من لوحة التحكم ستجد التقويم يعرض جميع مواعيد العملاء. على الجوال ستظهر قائمة مواعيد (Agenda)." },
    { q: "كيف أضيف حسابي البنكي لاستلام الأرباح؟", a: "اذهب إلى صفحة المالية ثم اختر 'حساب بنكي' أو افتح /finance/bank، وأدخل IBAN و Swift." },
    { q: "كيف أتعامل مع رسالة عميل أثناء تنفيذ الخدمة؟", a: "من صفحة الرسائل يمكنك فتح المحادثة والرد وإرسال الملفات، وستظهر لديك مؤشرات الاتصال والرسائل غير المقروءة." },
    { q: "أين أجد شرح تدفق الخدمة من الحجز إلى الإكمال؟", a: "افتح صفحة التوثيق داخل التطبيق عبر /docs ثم اختر 'تدفق الخدمة (من الحجز إلى الإكمال)' أو افتح /docs/service-flow مباشرة." },
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
