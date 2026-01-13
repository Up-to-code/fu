import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "سياسة الخصوصية",
    description: "سياسة الخصوصية لمنصة أثاث بلس",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen   flex flex-col bg-white">
            <LandingHeader />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-12">
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 text-[#242C5A] hover:text-[#1a2144] font-medium mb-6 transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                                العودة إلى الرئيسية
                            </Link>
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">سياسة الخصوصية</h1>
                            <p className="text-gray-600 text-lg">آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">مقدمة</h2>
                                <p className="leading-relaxed mb-4">
                                    نحن في منصة أثاث بلس نلتزم بحماية خصوصية مستخدمينا. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عند استخدامك لمنصتنا.
                                </p>
                                <p className="leading-relaxed">
                                    باستخدامك لمنصتنا، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">المعلومات التي نجمعها</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">معلومات شخصية</h3>
                                        <p className="leading-relaxed">
                                            نجمع المعلومات التي تزودنا بها مباشرة مثل الاسم، عنوان البريد الإلكتروني، رقم الهاتف، وعنوان الفواتير عند التسجيل أو استخدام خدماتنا.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">معلومات الاستخدام</h3>
                                        <p className="leading-relaxed">
                                            نجمع معلومات حول كيفية استخدامك للمنصة بما في ذلك الصفحات التي تزورها، الوقت الذي تقضيه، والأنشطة التي تقوم بها.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">معلومات الأجهزة</h3>
                                        <p className="leading-relaxed">
                                            قد نجمع معلومات عن جهازك مثل نوع المتصفح، عنوان IP، ونظام التشغيل لأغراض التحليل والأمان.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">كيف نستخدم معلوماتك</h2>
                                <ul className="list-disc list-inside space-y-2 pr-4">
                                    <li>توفير وتحسين خدمات المنصة</li>
                                    <li>معالجة المعاملات والطلبات</li>
                                    <li>إرسال إشعارات مهمة عن حسابك</li>
                                    <li>تحليل الاستخدام لتحسين تجربة المستخدم</li>
                                    <li>الحماية من الاحتيال والأنشطة غير القانونية</li>
                                    <li>التواصل معك بشأن المنتجات والخدمات</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">حماية المعلومات</h2>
                                <p className="leading-relaxed mb-4">
                                    نستخدم تقنيات أمان متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفشاء أو الإتلاف.
                                </p>
                                <p className="leading-relaxed">
                                    ومع ذلك، لا يمكن ضمان الأمان المطلق للبيانات المرسلة عبر الإنترنت. نوصي باستخدام كلمات مرور قوية وعدم مشاركة بيانات الاعتماد مع الآخرين.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">مشاركة المعلومات</h2>
                                <p className="leading-relaxed mb-4">
                                    لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية فقط:
                                </p>
                                <ul className="list-disc list-inside space-y-2 pr-4">
                                    <li>مع مزودي الخدمات الذين يساعدوننا في تشغيل المنصة</li>
                                    <li>عندما يتطلب القانون ذلك</li>
                                    <li>لحماية حقوقنا ومستخدمينا</li>
                                    <li>في حالة نقل الأعمال أو الاندماج</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">حقوقك</h2>
                                <p className="leading-relaxed mb-4">لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:</p>
                                <ul className="list-disc list-inside space-y-2 pr-4">
                                    <li>الوصول إلى معلوماتك الشخصية</li>
                                    <li>تصحيح المعلومات غير الدقيقة</li>
                                    <li>طلب حذف معلوماتك</li>
                                    <li>الاعتراض على معالجة معلوماتك</li>
                                    <li>طلب نقل بياناتك</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">التغييرات على السياسة</h2>
                                <p className="leading-relaxed">
                                    قد نحدث هذه السياسة من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة من خلال نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث".
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الاتصال بنا</h2>
                                <p className="leading-relaxed">
                                    إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر البريد الإلكتروني:{" "}
                                    <a href="mailto:privacy@furnitureplus.com" className="text-[#242C5A] hover:underline font-medium">
                                        privacy@furnitureplus.com
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
