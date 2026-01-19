"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const rotatingWords = [
    "المزيد من العملاء",
    "المزيد من الأرباح",
    "المزيد من المبيعات",
    "نمو أعمالك",
    "نجاح متواصل",
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

const ZapIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const TrendingIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export function HeroSection() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

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

    return (
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
            {/* Background Pattern - 5% opacity */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(36, 44, 90, 0.02)' }}>
                <div 
                    className="absolute inset-0 opacity-30" 
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(36, 44, 90, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(36, 44, 90, 0.03) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                ></div>
            </div>

            {/* Gradient Orbs - 10% opacity */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(36, 44, 90, 0.08)' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(36, 44, 90, 0.06)', animationDelay: '2s' }}></div>
            </div>

            {/* Floating Icons - 10% opacity */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 animate-float" style={{ opacity: 0.12 }}>
                    <SparkleIcon className="w-8 h-8 text-[#242C5A]" />
                </div>
                <div className="absolute top-40 right-20 animate-float-delayed" style={{ opacity: 0.1 }}>
                    <BrainIcon className="w-10 h-10 text-[#242C5A]" />
                </div>
                <div className="absolute bottom-32 left-20 animate-float" style={{ opacity: 0.12 }}>
                    <ZapIcon className="w-9 h-9 text-[#242C5A]" />
                </div>
                <div className="absolute bottom-20 right-32 animate-float-delayed" style={{ opacity: 0.1 }}>
                    <TrendingIcon className="w-8 h-8 text-[#242C5A]" />
                </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Badge - 20% opacity border, 10% background */}
                    <div className="flex justify-center mb-10">
                        <div 
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm"
                            style={{
                                backgroundColor: 'rgba(36, 44, 90, 0.08)',
                                border: '1px solid rgba(36, 44, 90, 0.2)'
                            }}
                        >
                            <SparkleIcon className="w-4 h-4 animate-pulse text-[#242C5A]" />
                            <span className="text-sm font-bold text-[#242C5A]">مدعوم بالذكاء الاصطناعي</span>
                        </div>
                    </div>

                    {/* Headline with animated text - 100% color */}
                    <div className="space-y-8 mb-10">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#242C5A] leading-tight font-cairo animate-spring">
                            كن شريكنا<br />
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
                            منصة متكاملة مدعومة بالذكاء الاصطناعي توفر لك الأدوات والتقنيات الحديثة لتحقيق النجاح والتميز في عالم التجارة الإلكترونية
                        </p>
                    </div>

                    {/* CTA - 100% button, 20% border */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/register">
                            <Button 
                                size="lg" 
                                className="h-14 px-10 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 font-cairo"
                                style={{
                                    backgroundColor: '#242C5A',
                                    boxShadow: '0 10px 25px -5px rgba(36, 44, 90, 0.3), 0 4px 6px -2px rgba(36, 44, 90, 0.2)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1a2144';
                                    e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(36, 44, 90, 0.4), 0 5px 8px -2px rgba(36, 44, 90, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#242C5A';
                                    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(36, 44, 90, 0.3), 0 4px 6px -2px rgba(36, 44, 90, 0.2)';
                                }}
                            >
                                <SparkleIcon className="h-5 w-5 ml-2 text-white" />
                                ابدأ رحلتك الآن
                                <ArrowLeft className="h-5 w-5 mr-2" />
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="h-14 px-10 font-bold rounded-xl text-lg transition-all hover:scale-105 font-cairo backdrop-blur-sm text-[#242C5A]"
                            style={{
                                border: '2px solid rgba(36, 44, 90, 0.2)',
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(36, 44, 90, 0.4)';
                                e.currentTarget.style.backgroundColor = 'rgba(36, 44, 90, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(36, 44, 90, 0.2)';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <BrainIcon className="h-5 w-5 ml-2 text-[#242C5A]" />
                            اكتشف المزيد
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
