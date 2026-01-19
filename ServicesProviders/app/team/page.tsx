import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight, Linkedin, Twitter, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata = {
    title: "الفريق",
    description: "تعرف على فريق عمل منصة أثاث بلس",
};

const teamMembers = [
    {
        name: "أحمد محمد",
        role: "المدير التنفيذي",
        description: "خبرة 15 عاماً في التكنولوجيا وإدارة الأعمال",
        avatar: "AM",
        social: {
            linkedin: "#",
            twitter: "#",
            email: "ahmed@furnitureplus.com"
        }
    },
    {
        name: "فاطمة علي",
        role: "مديرة التطوير",
        description: "متخصصة في تطوير المنصات والحلول التقنية",
        avatar: "FA",
        social: {
            linkedin: "#",
            twitter: "#",
            email: "fatima@furnitureplus.com"
        }
    },
    {
        name: "محمد خالد",
        role: "مدير المنتج",
        description: "خبرة واسعة في تصميم تجربة المستخدم",
        avatar: "MK",
        social: {
            linkedin: "#",
            twitter: "#",
            email: "mohammed@furnitureplus.com"
        }
    },
    {
        name: "سارة أحمد",
        role: "مديرة التسويق",
        description: "متخصصة في التسويق الرقمي وبناء العلامات التجارية",
        avatar: "SA",
        social: {
            linkedin: "#",
            twitter: "#",
            email: "sara@furnitureplus.com"
        }
    },
    {
        name: "خالد سعيد",
        role: "مدير الدعم الفني",
        description: "فريق دعم محترف جاهز لمساعدة العملاء",
        avatar: "KS",
        social: {
            linkedin: "#",
            twitter: "#",
            email: "khalid@furnitureplus.com"
        }
    },
    {
        name: "نورا حسن",
        role: "مصممة واجهات المستخدم",
        description: "مبدعة في تصميم واجهات مستخدم جذابة وسهلة",
        avatar: "NH",
        social: {
            linkedin: "#",
            twitter: "#",
            email: "nora@furnitureplus.com"
        }
    }
];

export default function TeamPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <LandingHeader />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 text-[#242C5A] hover:text-[#1a2144] font-medium mb-6 transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                                العودة إلى الرئيسية
                            </Link>
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">فريقنا</h1>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                فريق متخصص ومتفاني يعمل بلا كلل لتوفير أفضل الخدمات والحلول لعملائنا
                            </p>
                        </div>

                        {/* Team Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#242C5A] hover:shadow-xl transition-all duration-300 text-center"
                                >
                                    <Avatar className="w-24 h-24 mx-auto mb-4">
                                        <AvatarFallback className="bg-[#242C5A] text-white text-2xl font-bold">
                                            {member.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-bold text-[#242C5A] mb-2">{member.name}</h3>
                                    <p className="text-[#242C5A] font-semibold mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.description}</p>
                                    <div className="flex justify-center gap-3">
                                        <Link 
                                            href={member.social.linkedin}
                                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#242C5A] flex items-center justify-center text-gray-600 hover:text-white transition-all"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </Link>
                                        <Link 
                                            href={member.social.twitter}
                                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#242C5A] flex items-center justify-center text-gray-600 hover:text-white transition-all"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </Link>
                                        <Link 
                                            href={`mailto:${member.social.email}`}
                                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-[#242C5A] flex items-center justify-center text-gray-600 hover:text-white transition-all"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Join Us Section */}
                        <div className="mt-16 bg-gradient-to-br from-[#242C5A] to-[#1a2144] rounded-3xl p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">انضم إلى فريقنا</h2>
                            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                                نحن دائماً نبحث عن مواهب جديدة ومتحمسة للانضمام إلى فريقنا. إذا كنت مهتماً بالعمل معنا، نود أن نسمع منك.
                            </p>
                            <Link 
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#242C5A] font-bold rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                تواصل معنا
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
