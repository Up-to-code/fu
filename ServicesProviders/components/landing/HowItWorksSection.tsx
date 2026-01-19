import { FileText, UserCheck, Rocket } from "lucide-react";

export function HowItWorksSection() {
    const steps = [
        {
            icon: FileText,
            number: "01",
            title: "سجل طلبك",
            description: "املأ نموذج التسجيل بالبيانات المطلوبة واختر الباقة المناسبة لاحتياجاتك في دقائق.",
        },
        {
            icon: UserCheck,
            number: "02",
            title: "تفعيل الحساب",
            description: "سيتم مراجعة طلبك والموافقة عليه من قبل فريقنا المختص في أقصر وقت ممكن.",
        },
        {
            icon: Rocket,
            number: "03",
            title: "ابدأ العمل",
            description: "بعد التفعيل، ستحصل على وصول كامل للمنصة ويمكنك البدء في إدارة أعمالك فوراً.",
        }
    ];

    return (
        <section id="الشراكة" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-[#242C5A]">
                            كيف نبدأ معاً
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            عملية بسيطة وواضحة للانضمام إلى منصتنا والاستفادة من خدماتنا المتكاملة
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        
                        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                            {steps.map((step, index) => (
                                <div key={index} className="relative">
                                    <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-[#242C5A] hover:shadow-2xl transition-all duration-300 space-y-6 group">
                                        {/* Step Number */}
                                        <div className="flex items-center justify-between">
                                            <div className="w-16 h-16 bg-gradient-to-br from-[#242C5A]/10 to-[#242C5A]/5 rounded-2xl flex items-center justify-center group-hover:from-[#242C5A] group-hover:to-[#242C5A]/80 transition-all">
                                                <step.icon className="w-8 h-8 text-[#242C5A] group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-5xl font-black text-gray-100 group-hover:text-[#242C5A]/10 transition-colors">{step.number}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-black text-[#242C5A]">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Connector Dot (Desktop) */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-24 -right-6 w-5 h-5 bg-[#242C5A] rounded-full border-4 border-white z-10 shadow-lg"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
