import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "كيف يعمل نظام التسعير؟",
        answer: "نستخدم نموذج رسوم مرن: 5% - 10% من قيمة كل معاملة حسب حجم المعاملة ونوع الخدمة. على سبيل المثال، معاملة بقيمة 1,000 ريال ستحمل رسوم 5% (50 ريال).",
    },
    {
        question: "هل توجد رسوم شهرية أو رسوم إعداد؟",
        answer: "لا، لا توجد رسوم شهرية أو رسوم إعداد. تدفع فقط عند حدوث معاملة، مما يجعل النموذج بسيطاً وشفافاً ومناسباً لجميع أحجام الأعمال.",
    },
    {
        question: "كيف يمكنني البدء؟",
        answer: "يمكنك البدء بالتسجيل في المنصة مجاناً. بعد التسجيل والتحقق من حسابك، يمكنك البدء في إضافة منتجاتك واستقبال الطلبات فوراً.",
    },
    {
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "نوفر طرق دفع آمنة ومتنوعة تتضمن البطاقات الائتمانية والدفع الإلكتروني، مع ضمان أمان جميع المعاملات عبر تقنيات التشفير المتقدمة.",
    },
    {
        question: "هل يمكنني إلغاء الاشتراك في أي وقت؟",
        answer: "نعم، يمكنك إلغاء استخدام الخدمة في أي وقت بدون أي رسوم إضافية أو التزامات. لا توجد عقود طويلة الأمد، أنت تتحكم الكامل.",
    },
    {
        question: "كيف يمكنني الحصول على الدعم الفني؟",
        answer: "نوفر دعم فني مجاني على مدار الساعة. يمكنك التواصل معنا من خلال البريد الإلكتروني أو من خلال لوحة التحكم، وسنقوم بالرد في أقصر وقت ممكن.",
    },
];

export function QASection() {
    return (
        <section id="الأسئلة-الشائعة" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-[#242C5A]">
                            الأسئلة الشائعة
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا ومنصتنا
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="bg-white border-2 border-gray-200 rounded-2xl px-6 hover:border-[#242C5A]/30 transition-colors"
                            >
                                <AccordionTrigger className="text-right font-bold text-[#242C5A] hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-right text-gray-600 leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
