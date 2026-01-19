import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "الشروط والأحكام",
    description: "الشروط والأحكام لاستخدام منصة أثاث بلس",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
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
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">الشروط والأحكام</h1>
                            <p className="text-gray-600 text-lg">آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">القبول</h2>
                                <p className="leading-relaxed mb-4">
                                    من خلال الوصول إلى واستخدام منصة أثاث بلس، فإنك تقبل وتوافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فيجب عليك عدم استخدام المنصة.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">استخدام المنصة</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الأهلية</h3>
                                        <p className="leading-relaxed">
                                            يجب أن تكون بالغاً قانونياً (18 عاماً أو أكثر) لاستخدام هذه المنصة. باستخدامك للمنصة، فإنك تؤكد أنك تستوفي متطلبات الأهلية.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">حساب المستخدم</h3>
                                        <p className="leading-relaxed">
                                            أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور. أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الاستخدام المقبول</h3>
                                        <p className="leading-relaxed mb-2">تتعهد بعدم استخدام المنصة:</p>
                                        <ul className="list-disc list-inside space-y-2 pr-4">
                                            <li>لأغراض غير قانونية أو غير مصرح بها</li>
                                            <li>لانتهاك أي قوانين أو لوائح محلية أو دولية</li>
                                            <li>لإلحاق الضرر أو التدخل في تشغيل المنصة</li>
                                            <li>لمحاولة الوصول غير المصرح به إلى أي جزء من المنصة</li>
                                            <li>لنشر محتوى ضار أو مسيء أو خادش للحياء</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">المدفوعات والرسوم</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الرسوم</h3>
                                        <p className="leading-relaxed">
                                            توافق على دفع جميع الرسوم المطبقة على استخدام خدمات المنصة وفقاً لجدول الأسعار المعروض. جميع الأسعار بالريال السعودي وقد تكون قابلة للتغيير بإشعار مسبق.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">المدفوعات</h3>
                                        <p className="leading-relaxed">
                                            يجب أن توفر معلومات دقيقة وكاملة للدفع. أنت مسؤول عن أي رسوم أو ضرائب قد تنطبق على معاملاتك.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#242C5A] mb-2">الاسترداد</h3>
                                        <p className="leading-relaxed">
                                            جميع المدفوعات غير قابلة للاسترداد إلا وفقاً لسياسة الاسترداد الخاصة بنا أو عند وجود خطأ من جانبنا.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الملكية الفكرية</h2>
                                <p className="leading-relaxed mb-4">
                                    جميع المحتويات الموجودة على المنصة بما في ذلك النصوص والصور والشعارات والعلامات التجارية محمية بموجب قوانين الملكية الفكرية وتملكها منصة أثاث بلس أو الموردين المعنيين.
                                </p>
                                <p className="leading-relaxed">
                                    لا يجوز لك نسخ أو تعديل أو توزيع أو عرض أو بيع أو ترخيص أي محتوى من المنصة دون إذن كتابي صريح منا.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">إخلاء المسؤولية</h2>
                                <p className="leading-relaxed mb-4">
                                    نقدم المنصة "كما هي" و"حسب التوفر". لا نضمن أن المنصة ستعمل دون انقطاع أو خالٍ من الأخطاء.
                                </p>
                                <p className="leading-relaxed">
                                    لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدامك أو عدم القدرة على استخدام المنصة.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الحد من المسؤولية</h2>
                                <p className="leading-relaxed">
                                    في أقصى حد يسمح به القانون، لن تتجاوز مسؤوليتنا الإجمالية تجاهك عن أي مطالبات تتعلق باستخدام المنصة مبلغ الرسوم التي دفعتها لنا في الأشهر الستة السابقة.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">إنهاء الخدمة</h2>
                                <p className="leading-relaxed mb-4">
                                    نحتفظ بالحق في تعليق أو إنهاء وصولك إلى المنصة في أي وقت، دون إشعار مسبق، لأي سبب بما في ذلك انتهاك هذه الشروط.
                                </p>
                                <p className="leading-relaxed">
                                    عند إنهاء الخدمة، سيتم إلغاء وصولك فوراً، وقد نتحفظ على أو نحذف المعلومات المرتبطة بحسابك.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">القانون الحاكم</h2>
                                <p className="leading-relaxed">
                                    تحكم هذه الشروط والأحكام وتُفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاعات ستخضع للولاية القضائية الحصرية للمحاكم في المملكة العربية السعودية.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">التغييرات على الشروط</h2>
                                <p className="leading-relaxed">
                                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات من خلال نشر الشروط المحدثة على هذه الصفحة. استمرارك في استخدام المنصة بعد التغييرات يعني موافقتك على الشروط المحدثة.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-[#242C5A] mb-4">الاتصال بنا</h2>
                                <p className="leading-relaxed">
                                    إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا عبر البريد الإلكتروني:{" "}
                                    <a href="mailto:legal@furnitureplus.com" className="text-[#242C5A] hover:underline font-medium">
                                        legal@furnitureplus.com
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
