'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '../_components';
import { Mail, Lock, Layers } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // TODO: Implement actual login logic
        console.log('Login:', { email, password });
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        console.log('Google login');
    };

    const handleAppleLogin = () => {
        // TODO: Implement Apple login
        console.log('Apple login');
    };

    return (
        <div className="w-full">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center">
                <div className="h-16 w-16 bg-[#242C5A] rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-[#242C5A]/20">
                    <Layers className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-black text-[#242C5A] tracking-tight mb-2">
                    تسجيل الدخول
                </h1>
                <p className="text-gray-500 font-medium">
                    مرحباً بك في منصة <span className="text-[#242C5A] font-bold">مقدمي الخدمات</span>
                </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="space-y-6">
                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-xl pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-bold text-[#242C5A] hover:text-[#1a2144] transition-colors"
                                >
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-xl pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit"
                            className="w-full h-12 text-lg font-bold bg-[#242C5A] hover:bg-[#1a2144] text-white rounded-xl transition-all shadow-lg shadow-[#242C5A]/20 active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-medium">أو الاستمرار باستخدام</span>
                        </div>
                    </div>

                    <SocialLoginButtons 
                        mode="login"
                        onGoogleClick={handleGoogleLogin}
                        onAppleClick={handleAppleLogin}
                    />

                    <div className="text-center text-sm text-gray-500 font-medium pt-2">
                        ليس لديك حساب؟{' '}
                        <Link
                            href="/register"
                            className="font-bold text-[#242C5A] hover:underline transition-all"
                        >
                            أنشئ حساب جديد
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
