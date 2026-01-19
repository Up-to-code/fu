import { CheckCircle2 } from "lucide-react";

export function PricingSection() {
    return (
        <section id="الأسعار" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-[#242C5A]">
                            الأسعار الشفافة
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            نموذج تسعير مرن ومناسب لجميع أحجام الأعمال
                        </p>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="text-center space-y-8">
                            {/* Main Price Display */}
                            <div className="space-y-4">
                                <div className="inline-block">
                                    <span className="text-6xl font-black text-[#242C5A]">5%</span>
                                    <span className="text-4xl font-black text-gray-400 mx-2">-</span>
                                    <span className="text-6xl font-black text-[#242C5A]">10%</span>
                                </div>
                                <p className="text-xl text-gray-600 font-medium">
                                    من قيمة كل معاملة
                                </p>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-lg text-gray-700 font-bold">
                                        النسبة تتراوح حسب حجم المعاملة ونوع الخدمة
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="grid md:grid-cols-2 gap-4 text-right pt-8">
                                {[
                                    "بدون رسوم شهرية",
                                    "بدون رسوم إعداد",
                                    "بدون التزامات طويلة الأمد",
                                    "مدفوعات آمنة ومشفرة",
                                    "تقارير مفصلة ودقيقة",
                                    "دعم فني مجاني 24/7"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 justify-start">
                                        <CheckCircle2 className="h-5 w-5 text-[#242C5A] flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Examples */}
                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div className="bg-gradient-to-br from-[#242C5A]/5 to-[#242C5A]/10 rounded-2xl p-6">
                                    <p className="text-sm font-bold text-gray-500 mb-4">مثال 1:</p>
                                    <div className="space-y-2 text-right">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">معاملة بقيمة 1,000 ريال</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">(5% × 1,000)</span>
                                            <span className="text-2xl font-black text-[#242C5A]">50 ريال</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-[#242C5A]/5 to-[#242C5A]/10 rounded-2xl p-6">
                                    <p className="text-sm font-bold text-gray-500 mb-4">مثال 2:</p>
                                    <div className="space-y-2 text-right">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">معاملة بقيمة 5,000 ريال</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">(8% × 5,000)</span>
                                            <span className="text-2xl font-black text-[#242C5A]">400 ريال</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
