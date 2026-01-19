import { Target, Lightbulb, BookOpen, Eye } from "lucide-react";

export function AboutSection() {
    return (
        <section id="من-نحن" className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-[#242C5A]">
                            من نحن
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            نقدم حلولاً متكاملة مصممة لمساعدتك على النجاح والتميز
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* About Us */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 space-y-4 border border-gray-200 hover:border-[#242C5A]/30 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#242C5A]/10 to-[#242C5A]/5 rounded-2xl flex items-center justify-center">
                                <Target className="w-7 h-7 text-[#242C5A]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#242C5A]">من نحن</h3>
                            <p className="text-gray-600 leading-relaxed">
                                منصة متكاملة تأسست بهدف توفير حلول تقنية شاملة لإدارة الأعمال بكفاءة عالية. نؤمن بأن التكنولوجيا يجب أن تكون بسيطة وفعالة.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 space-y-4 border border-gray-200 hover:border-[#242C5A]/30 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#242C5A]/10 to-[#242C5A]/5 rounded-2xl flex items-center justify-center">
                                <Eye className="w-7 h-7 text-[#242C5A]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#242C5A]">رؤيتنا</h3>
                            <p className="text-gray-600 leading-relaxed">
                                نطمح لأن نكون الشريك المفضل للشركات الصغيرة والمتوسطة في رحلتها الرقمية، من خلال توفير أدوات قوية وسهلة الاستخدام.
                            </p>
                        </div>

                        {/* Guide */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 space-y-4 border border-gray-200 hover:border-[#242C5A]/30 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#242C5A]/10 to-[#242C5A]/5 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-7 h-7 text-[#242C5A]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#242C5A]">الدليل</h3>
                            <p className="text-gray-600 leading-relaxed">
                                نوفر دليلاً شاملاً وموارد تعليمية لمساعدتك على الاستفادة القصوى من المنصة. فريقنا جاهز لدعمك في كل خطوة.
                            </p>
                        </div>

                        {/* Theme */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 space-y-4 border border-gray-200 hover:border-[#242C5A]/30 hover:shadow-xl transition-all duration-300">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#242C5A]/10 to-[#242C5A]/5 rounded-2xl flex items-center justify-center">
                                <Lightbulb className="w-7 h-7 text-[#242C5A]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#242C5A]">الفلسفة</h3>
                            <p className="text-gray-600 leading-relaxed">
                                نؤمن بالبساطة والشفافية. نقدم حلولاً مباشرة بدون تعقيدات، مع التركيز على ما يحتاجه عملك بالفعل لتحقيق النجاح.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
