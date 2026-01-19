import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "سياسة الاستخدام",
    description: "سياسة استخدام منصة أثاث بلس",
};

export default function UsagePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <LandingHeader />
            <main className="flex-1 pt-20">
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
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">سياسة الاستخدام</h1>
                            <p className="text-gray-600 text-lg">آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">مقدمة</h2>
                                <p className="leading-relaxed mb-4">
                                    توضح سياسة الاستخدام هذه القواعد والإرشادات لاستخدام منصة أثاث بلس. من خلال استخدام المنصة، فإنك توافق على اتباع هذه السياسة.
                                </p>
                                <p className="leading-relaxed">
                                    نحتفظ بالحق في تحديث هذه السياسة في أي وقت. يُنصح بمراجعة هذه الصفحة بانتظام للاطلاع على أي تغييرات.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">القواعد العامة</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الاستخدام المسموح</h3>
                                        <p className="leading-relaxed mb-2">يمكنك استخدام المنصة للأغراض التالية:</p>
                                        <ul className="list-disc list-inside space-y-2 pr-4">
                                            <li>إدارة منتجاتك وطلباتك</li>
                                            <li>عرض وبيع منتجاتك بشكل قانوني</li>
                                            <li>التواصل مع العملاء والشركاء</li>
                                            <li>الوصول إلى التقارير والتحليلات</li>
                                            <li>استخدام الخدمات المقدمة كما هو مخصص</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الاستخدام المحظور</h3>
                                        <p className="leading-relaxed mb-2">يُحظر استخدام المنصة للأغراض التالية:</p>
                                        <ul className="list-disc list-inside space-y-2 pr-4">
                                            <li>أي نشاط غير قانوني أو احتيالي</li>
                                            <li>انتهاك حقوق الملكية الفكرية للآخرين</li>
                                            <li>إرسال محتوى ضار أو فيروسات أو كود خبيث</li>
                                            <li>محاولة اختراق أو تعطيل أمان المنصة</li>
                                            <li>استخدام الحساب لشخص آخر دون إذن</li>
                                            <li>التحايل على أنظمة الحماية والرسوم</li>
                                            <li>إرسال رسائل غير مرغوب فيها (سبام) للمستخدمين</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">المحتوى والمعلومات</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">محتوى المستخدم</h3>
                                        <p className="leading-relaxed">
                                            أنت مسؤول عن جميع المحتويات والمعلومات التي تقدمها على المنصة. يجب أن يكون المحتوى دقيقاً ومحترماً ومتوافقاً مع جميع القوانين المعمول بها.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">المحتوى المحظور</h3>
                                        <p className="leading-relaxed mb-2">لا يجوز نشر المحتوى التالي:</p>
                                        <ul className="list-disc list-inside space-y-2 pr-4">
                                            <li>محتوى كاذب أو مضلل</li>
                                            <li>محتوى مسيء أو خادش للحياء</li>
                                            <li>محتوى ينتهك حقوق الآخرين</li>
                                            <li>معلومات شخصية للآخرين دون إذن</li>
                                            <li>إعلانات مضللة أو احتيالية</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الأمان والخصوصية</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">حماية الحساب</h3>
                                        <p className="leading-relaxed">
                                            يجب عليك الحفاظ على سرية معلومات حسابك. لا تشارك بيانات الدخول مع أي شخص. إذا اكتشفت أي استخدام غير مصرح به لحسابك، يجب إبلاغنا فوراً.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">كلمات المرور</h3>
                                        <p className="leading-relaxed">
                                            استخدم كلمة مرور قوية وفريدة لحسابك. يُنصح بتغيير كلمة المرور بانتظام وعدم إعادة استخدام كلمات المرور من حسابات أخرى.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">المعاملات والمدفوعات</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الالتزام بالدفع</h3>
                                        <p className="leading-relaxed">
                                            أنت مسؤول عن دفع جميع الرسوم المترتبة على استخدامك للمنصة وفقاً لجدول الأسعار المعمول به.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">المعاملات</h3>
                                        <p className="leading-relaxed">
                                            جميع المعاملات المالية تخضع للتحقق والموافقة. نحتفظ بالحق في رفض أو إلغاء أي معاملة نشتبه في أنها غير قانونية أو احتيالية.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">التواصل والتفاعل</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الاحترام</h3>
                                        <p className="leading-relaxed">
                                            يجب أن يكون جميع التواصل بين المستخدمين محترماً ومهنياً. لا يُسمح بالتحرش أو التهديد أو السلوك المسيء بأي شكل من الأشكال.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الخصوصية</h3>
                                        <p className="leading-relaxed">
                                            احترم خصوصية المستخدمين الآخرين. لا تحاول الحصول على معلومات شخصية عن مستخدمين آخرين دون إذن صريح.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الانتهاكات والعقوبات</h2>
                                <p className="leading-relaxed mb-4">
                                    في حالة انتهاكك لسياسة الاستخدام هذه، نحتفظ بالحق في اتخاذ إجراءات قد تشمل:
                                </p>
                                <ul className="list-disc list-inside space-y-2 pr-4">
                                    <li>تحذير رسمي</li>
                                    <li>تعليق مؤقت للحساب</li>
                                    <li>إنهاء دائم للحساب</li>
                                    <li>اتخاذ إجراءات قانونية إذا لزم الأمر</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">التحديثات والتغييرات</h2>
                                <p className="leading-relaxed">
                                    قد نحدث سياسة الاستخدام هذه من وقت لآخر. ستكون التغييرات المهمة مرئية على هذه الصفحة مع تاريخ التحديث. يُنصح بمراجعة هذه السياسة بانتظام.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الاتصال بنا</h2>
                                <p className="leading-relaxed">
                                    إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الاستخدام، يرجى الاتصال بنا عبر البريد الإلكتروني:{" "}
                                    <a href="mailto:support@furnitureplus.com" className="text-[#242C5A] hover:underline font-medium">
                                        support@furnitureplus.com
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
