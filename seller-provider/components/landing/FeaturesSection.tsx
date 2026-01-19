import {
    Shield,
    Zap,
    BarChart3,
    HeadphonesIcon,
    Lock,
    Sparkles
} from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "ذكاء اصطناعي متقدم",
        description: "استخدم تقنيات الذكاء الاصطناعي لتحسين مبيعاتك وتحليل البيانات وتقديم توصيات ذكية.",
        highlight: true,
    },
    {
        icon: Shield,
        title: "أمان متقدم",
        description: "نضمن حماية بياناتك وعملياتك بأعلى معايير الأمان التكنولوجي والتشفير.",
    },
    {
        icon: Zap,
        title: "أداء فائق",
        description: "نظام سريع ومستقر مصمم لتحمل الضغوط العالية وتوفير تجربة سلسة بدون انقطاع.",
    },
    {
        icon: BarChart3,
        title: "تحليلات شاملة",
        description: "احصل على رؤى عميقة عن أداء عملك من خلال تقارير تفصيلية ومؤشرات أداء دقيقة.",
    },
    {
        icon: HeadphonesIcon,
        title: "دعم متخصص",
        description: "فريق دعم فني محترف جاهز لمساعدتك في أي وقت تحتاج فيه للمساعدة والإرشاد.",
    },
    {
        icon: Lock,
        title: "خصوصية مضمونة",
        description: "نحترم خصوصيتك ونضمن سرية معلوماتك وعدم مشاركتها مع أي جهة خارجية.",
    },
];

export function FeaturesSection() {
    return (
        <section id="المميزات" className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-[#242C5A]">
                            لماذا تختارنا
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            نوفر لك مجموعة متكاملة من الحلول التقنية المبتكرة التي تساعدك على تحقيق أهدافك التجارية
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group p-8 rounded-3xl border-2 transition-all duration-300 ${
                                    feature.highlight
                                        ? "bg-gradient-to-br from-[#242C5A]/10 to-blue-50 border-[#242C5A]/30 shadow-xl"
                                        : "bg-white border-gray-200 hover:border-[#242C5A] hover:shadow-xl"
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                        feature.highlight
                                            ? "bg-[#242C5A] text-white"
                                            : "bg-[#242C5A]/10 group-hover:bg-[#242C5A] group-hover:text-white"
                                    }`}>
                                        <feature.icon className={`w-7 h-7 ${
                                            feature.highlight
                                                ? "text-white"
                                                : "text-[#242C5A] group-hover:text-white transition-colors"
                                        }`} />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-black text-[#242C5A]">{feature.title}</h3>
                                            {feature.highlight && (
                                                <span className="px-2 py-0.5 bg-[#242C5A] text-white text-xs font-bold rounded-full">
                                                    AI
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
