import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function CTASection() {
    return (
        <section id="التواصل" className="py-24 bg-gradient-to-br from-[#242C5A] via-[#1f2749] to-[#1a2144] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Animated gradients */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-12 md:p-16 text-center space-y-8 shadow-2xl">
                        <div className="space-y-4">
                            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                                هل أنت مستعد للبدء؟
                            </h2>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                انضم إلى مئات الشركاء الذين يثقون بنا لتحقيق أهدافهم التجارية ونمو أعمالهم بشكل مستمر
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/register">
                                <Button 
                                    size="lg" 
                                    className="w-full sm:w-auto h-14 px-10 text-lg bg-white hover:bg-gray-100 text-[#242C5A] font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
                                >
                                    ابدأ الآن مجاناً
                                    <ArrowLeft className="h-5 w-5 mr-2" />
                                </Button>
                            </Link>
                            <Button 
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto h-14 px-10 text-lg border-2 border-white/30 hover:border-white/50 text-white font-bold rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                            >
                                تواصل معنا
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
