import { CheckCircle2, TrendingDown, Award } from "lucide-react";

export function PricingSection() {
    return (
        <section id="الأسعار" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-[#242C5A]">
                            عمولة شفافة وعادلة
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            نحن ننمو معك. كلما زاد نجاحك، قلت العمولة.
                        </p>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

                        <div className="relative z-10 text-center space-y-10">
                            {/* Main Price Display */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center justify-center gap-4">
                                    <div className="text-center">
                                        <span className="block text-sm font-bold text-gray-400 mb-1">تبدأ من</span>
                                        <span className="text-5xl font-black text-gray-300">10%</span>
                                    </div>
                                    <TrendingDown className="h-8 w-8 text-[#242C5A]" />
                                    <div className="text-center">
                                        <span className="block text-sm font-bold text-[#242C5A] mb-1">تصل إلى</span>
                                        <span className="text-6xl font-black text-[#242C5A]">5%</span>
                                    </div>
                                </div>
                                <p className="text-xl text-gray-600 font-medium">
                                    نسبة متناقصة حسب نشاطك وتقييمك
                                </p>
                            </div>

                            {/* Tiers Grid */}
                            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-right">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gray-200 rounded-lg">
                                            <TrendingDown className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">المستوى الأول (مبتدئ)</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm">للشركاء الجدد في بداية رحلتهم معنا.</p>
                                    <div className="text-3xl font-black text-gray-400">10% <span className="text-sm font-medium">عمولة</span></div>
                                </div>

                                <div className="bg-[#242C5A]/5 rounded-2xl p-6 border border-[#242C5A]/10 text-right">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-[#242C5A] rounded-lg">
                                            <Award className="h-5 w-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#242C5A]">شريك نشط</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm">للشركاء المتميزين (إكمال المهام + تقييمات عالية).</p>
                                    <div className="text-3xl font-black text-[#242C5A]">5% <span className="text-sm font-medium">عمولة فقط</span></div>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="pt-8 border-t border-gray-100">
                                <div className="grid md:grid-cols-2 gap-4 text-right">
                                    {[
                                        "تسجيل مجاني بالكامل",
                                        "لا توجد رسوم شهرية ثابتة",
                                        "دفعات أسبوعية منتظمة",
                                        "لوحة تحكم احترافية لإدارة خدماتك",
                                        "دعم فني مخصص للشركاء",
                                        "تسويق مجاني لخدماتك المتميزة"
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 justify-start">
                                            <CheckCircle2 className="h-5 w-5 text-[#242C5A] flex-shrink-0" />
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
