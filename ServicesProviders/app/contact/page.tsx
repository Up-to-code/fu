"use client";

import { useState } from "react";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/landing/Footer";
import { ArrowRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            alert("شكراً لتواصلك معنا! سنقوم بالرد عليك قريباً.");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

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
                            <h1 className="text-4xl sm:text-5xl font-black text-[#242C5A] mb-4">اتصل بنا</h1>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                نحن هنا للإجابة على جميع أسئلتك. تواصل معنا وسنكون سعداء بمساعدتك
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#242C5A] mb-6">معلومات التواصل</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#242C5A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-[#242C5A]" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#242C5A] mb-1">العنوان</h3>
                                                <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#242C5A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-6 h-6 text-[#242C5A]" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#242C5A] mb-1">الهاتف</h3>
                                                <p className="text-gray-600" dir="ltr">+966 50 000 0000</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#242C5A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-[#242C5A]" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#242C5A] mb-1">البريد الإلكتروني</h3>
                                                <p className="text-gray-600">support@furnitureplus.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#242C5A]/5 to-[#242C5A]/10 rounded-2xl p-6 border border-[#242C5A]/10">
                                    <h3 className="font-bold text-[#242C5A] mb-2">ساعات العمل</h3>
                                    <div className="space-y-2 text-gray-600 text-sm">
                                        <p>الأحد - الخميس: 9:00 ص - 6:00 م</p>
                                        <p>الجمعة - السبت: مغلق</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold text-[#242C5A] mb-6">أرسل لنا رسالة</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">الاسم</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-xl"
                                                    placeholder="اسمك الكامل"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-xl"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">رقم الهاتف</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="rounded-xl"
                                                placeholder="+966 50 000 0000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">الموضوع</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="rounded-xl"
                                                placeholder="موضوع الرسالة"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">الرسالة</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="rounded-xl"
                                                placeholder="اكتب رسالتك هنا..."
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#242C5A] hover:bg-[#1a2144] text-white font-bold rounded-xl h-12"
                                        >
                                            {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                                            <Send className="h-5 w-5 mr-2" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
