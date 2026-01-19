"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const rotatingWords = [
    "تقديم خدماتك",
    "زيادة دخلك",
    "الوصول لعملاء جدد",
    "إدارة أعمالك",
    "النجاح المهني",
];

// Custom SVG Icons
const SparkleIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export function HeroSection() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [calculatorValue, setCalculatorValue] = useState([5000]); // Monthly earnings

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
                setIsVisible(true);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Calculator Logic
    const monthlyEarnings = calculatorValue[0];
    const commissionRate = monthlyEarnings > 10000 ? 0.05 : 0.10; // 5% for high earners, 10% for others
    const commission = monthlyEarnings * commissionRate;
    const yourTake = monthlyEarnings - commission;

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden py-20">
            {/* Background Pattern */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(36, 44, 90, 0.02)' }}>
                <div 
                    className="absolute inset-0 opacity-30" 
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(36, 44, 90, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(36, 44, 90, 0.03) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Badge */}
                    <div className="flex justify-center mb-8">
                        <div 
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm"
                            style={{
                                backgroundColor: 'rgba(36, 44, 90, 0.08)',
                                border: '1px solid rgba(36, 44, 90, 0.2)'
                            }}
                        >
                            <SparkleIcon className="w-4 h-4 animate-pulse text-[#242C5A]" />
                            <span className="text-sm font-bold text-[#242C5A]">منصة الخدمات الاحترافية</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="space-y-6 mb-12">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#242C5A] leading-tight font-cairo">
                            ابدأ رحلتك في<br />
                            <span className="relative inline-block min-h-[1.2em] w-full mt-3">
                                <span 
                                    className={`block transition-all duration-500 ease-in-out py-2 ${
                                        isVisible 
                                            ? 'opacity-100 translate-y-0 scale-100' 
                                            : 'opacity-0 -translate-y-4 scale-95'
                                    }`}
                                    style={{
                                        background: 'linear-gradient(to right, #242C5A, rgba(36, 44, 90, 0.7))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {rotatingWords[currentWordIndex]}
                                </span>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium font-cairo">
                            انضم إلى نخبة مقدمي الخدمات وحقق دخلاً مستداماً مع منصة توفر لك كل ما تحتاجه للنجاح
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link href="/register">
                            <Button 
                                size="lg" 
                                className="h-14 px-10 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 font-cairo bg-[#242C5A] hover:bg-[#1a2144]"
                            >
                                <SparkleIcon className="h-5 w-5 ml-2 text-white" />
                                سجل كمقدم خدمة
                                <ArrowLeft className="h-5 w-5 mr-2" />
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="h-14 px-10 font-bold rounded-xl text-lg transition-all hover:scale-105 font-cairo text-[#242C5A] border-[#242C5A]/20 hover:bg-[#242C5A]/5"
                        >
                            <BrainIcon className="h-5 w-5 ml-2 text-[#242C5A]" />
                            كيف نعمل؟
                        </Button>
                    </div>

                    {/* Calculator AdCard */}
                    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#242C5A] to-purple-500" />
                        
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-6 w-full">
                                <div className="text-right space-y-2">
                                    <h3 className="text-2xl font-black text-[#242C5A] flex items-center gap-2">
                                        <Calculator className="h-6 w-6" />
                                        احسب أرباحك المتوقعة
                                    </h3>
                                    <p className="text-gray-500 text-sm">حرك المؤشر لتقدير دخلك الشهري معنا</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between font-bold text-gray-700">
                                        <span>مبيعات شهرية</span>
                                        <span>{monthlyEarnings.toLocaleString()} ر.س</span>
                                    </div>
                                    <Slider
                                        value={calculatorValue}
                                        onValueChange={setCalculatorValue}
                                        max={50000}
                                        step={1000}
                                        min={1000}
                                        className="py-4"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-auto bg-gray-50 rounded-2xl p-6 min-w-[250px] border border-gray-100">
                                <div className="space-y-4 text-center">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">صافي ربحك التقديري</p>
                                        <p className="text-4xl font-black text-[#242C5A]">{yourTake.toLocaleString()}</p>
                                        <p className="text-xs text-gray-400 mt-1">ريال سعودي</p>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>نسبة العمولة</span>
                                            <span className="font-bold text-[#242C5A]">{(commissionRate * 100)}%</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>قيمة العمولة</span>
                                            <span>{commission.toLocaleString()} ر.س</span>
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
