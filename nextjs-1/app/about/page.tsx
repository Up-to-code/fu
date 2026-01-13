import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight, Target, Eye, Lightbulb, Award } from "lucide-react";

export const metadata = {
    title: "من نحن",
    description: "تعرف على منصة أثاث بلس ورسالتنا ورؤيتنا",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <LandingHeader />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="mb-12">
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 text-[#242C5A] hover:text-[#1a2144] font-medium mb-6 transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                                العودة إلى الرئيسية
                            </Link>
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">من نحن</h1>
                            <p className="text-gray-600 text-lg">تعرف على رحلتنا ورسالتنا وقيمنا</p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-16">
                            {/* Introduction */}
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#242C5A]">مقدمة</h2>
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                                    <p>
                                        منصة أثاث بلس هي منصة متكاملة تأسست بهدف توفير حلول تقنية شاملة لإدارة أعمال التجارة الإلكترونية في قطاع الأثاث. نحن نؤمن بأن التكنولوجيا يجب أن تكون بسيطة وفعالة، وأن تساعد الشركات على النمو والازدهار.
                                    </p>
                                    <p>
                                        منذ تأسيسنا، نعمل بجد لتوفير أفضل الأدوات والخدمات التي تساعد الشركاء على إدارة منتجاتهم وطلباتهم وعملياتهم التجارية بكفاءة عالية. نحن نستثمر في التقنيات الحديثة والذكاء الاصطناعي لضمان توفير تجربة مستخدم متميزة.
                                    </p>
                                </div>
                            </section>

                            {/* Mission, Vision, Values */}
                            <section className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-[#242C5A]/5 to-[#242C5A]/10 rounded-2xl p-8 border border-[#242C5A]/10">
                                    <div className="w-14 h-14 bg-[#242C5A] rounded-xl flex items-center justify-center mb-6">
                                        <Target className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#242C5A] mb-4">رسالتنا</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        توفير منصة تقنية متكاملة تساعد الشركات على إدارة أعمالها بكفاءة وتحقيق النجاح في عالم التجارة الإلكترونية من خلال حلول مبتكرة وسهلة الاستخدام.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-[#242C5A]/5 to-[#242C5A]/10 rounded-2xl p-8 border border-[#242C5A]/10">
                                    <div className="w-14 h-14 bg-[#242C5A] rounded-xl flex items-center justify-center mb-6">
                                        <Eye className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#242C5A] mb-4">رؤيتنا</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        أن نكون المنصة الرائدة في المنطقة لقطاع الأثاث، وأن نكون الشريك المفضل للشركات الصغيرة والمتوسطة في رحلتها الرقمية والنمو.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-[#242C5A]/5 to-[#242C5A]/10 rounded-2xl p-8 border border-[#242C5A]/10">
                                    <div className="w-14 h-14 bg-[#242C5A] rounded-xl flex items-center justify-center mb-6">
                                        <Lightbulb className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#242C5A] mb-4">قيمنا</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        الابتكار، الشفافية، الجودة، والالتزام بتحقيق أفضل النتائج لعملائنا. نحن نؤمن بالعمل الجماعي والتحسين المستمر.
                                    </p>
                                </div>
                            </section>

                            {/* Why Choose Us */}
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#242C5A]">لماذا نحن</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            icon: Award,
                                            title: "الجودة والموثوقية",
                                            description: "نقدم حلولاً عالية الجودة وموثوقة مدعومة بأحدث التقنيات"
                                        },
                                        {
                                            icon: Target,
                                            title: "التركيز على العملاء",
                                            description: "عميلنا هو محور اهتمامنا، ونعمل باستمرار لتحسين تجربته"
                                        },
                                        {
                                            icon: Lightbulb,
                                            title: "الابتكار المستمر",
                                            description: "نستثمر في البحث والتطوير لتقديم حلول مبتكرة دائماً"
                                        },
                                        {
                                            icon: Eye,
                                            title: "الشفافية",
                                            description: "نؤمن بالشفافية في جميع تعاملاتنا وتواصلنا"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="w-12 h-12 bg-[#242C5A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-6 h-6 text-[#242C5A]" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[#242C5A] mb-2">{item.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Our Story */}
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#242C5A]">قصتنا</h2>
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                                    <p>
                                        بدأت رحلتنا عندما لاحظنا التحديات التي تواجهها الشركات في قطاع الأثاث عند محاولة إدارة أعمالها رقمياً. كان هناك حاجة ملحة لمنصة متكاملة تجمع بين إدارة المنتجات والطلبات والتحليلات في مكان واحد.
                                    </p>
                                    <p>
                                        من خلال خبرتنا في التكنولوجيا والتجارة الإلكترونية، قررنا بناء منصة شاملة توفر جميع الأدوات اللازمة للنجاح. اليوم، نفخر بكوننا شريكاً موثوقاً لمئات الشركات التي تثق بنا لإدارة أعمالها.
                                    </p>
                                    <p>
                                        نسعى باستمرار لتطوير وتحسين منصتنا، ونفتخر بفريقنا المتميز الذي يعمل بلا كلل لضمان توفير أفضل الخدمات لعملائنا.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
