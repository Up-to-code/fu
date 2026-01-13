import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#242C5A] rounded-lg p-2">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">أثاث بلس</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                منصة متكاملة توفر حلولاً شاملة لإدارة أعمالك بكل كفاءة واحترافية. شريكك الموثوق في رحلة نجاحك.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { Icon: Facebook, href: "#" },
                                    { Icon: Twitter, href: "#" },
                                    { Icon: Instagram, href: "#" },
                                    { Icon: Linkedin, href: "#" },
                                ].map(({ Icon, href }, i) => (
                                    <Link
                                        key={i}
                                        href={href}
                                        className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#242C5A] flex items-center justify-center text-gray-400 hover:text-white transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold mb-6">روابط سريعة</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                        الرئيسية
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                        من نحن
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/team" className="text-gray-400 hover:text-white transition-colors">
                                        الفريق
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                                        المدونة
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                        اتصل بنا
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-white font-bold mb-6">خدماتنا</h3>
                            <ul className="space-y-3">
                                {["إدارة المتاجر", "التحليلات", "التكامل", "الدعم الفني", "التطوير"].map((service) => (
                                    <li key={service}>
                                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                            {service}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-bold mb-6">تواصل معنا</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
                                </li>
                                <li className="flex items-center gap-3" dir="ltr">
                                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-400 text-right block">+966 50 000 0000</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-400">support@furnitureplus.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} أثاث بلس. جميع الحقوق محفوظة.
                            </p>
                            <div className="flex flex-wrap items-center gap-6">
                                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    سياسة الخصوصية
                                </Link>
                                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    الشروط والأحكام
                                </Link>
                                <Link href="/usage" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    سياسة الاستخدام
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
