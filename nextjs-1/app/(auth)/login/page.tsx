'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '../_components';

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
            {/* Mobile Header */}
            <div className="mb-10 lg:hidden flex flex-col items-center">
                <div className="h-14 w-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl font-bold text-white italic">H</span>
                </div>
            </div>

            <div className="mb-10 text-center lg:text-right">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    تسجيل الدخول
                </h1>
                <p className="text-slate-500 font-medium">
                    أهلاً بك مجدداً في منصة <span className="text-slate-900 font-bold">Houses</span>
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                    {/* Email/Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <Button 
                            type="submit"
                            className="w-full h-13 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-md active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500 font-medium">أو</span>
                        </div>
                    </div>

                    <SocialLoginButtons 
                        mode="login"
                        onGoogleClick={handleGoogleLogin}
                        onAppleClick={handleAppleLogin}
                    />

                    <div className="text-center text-sm text-slate-500 font-medium pt-2">
                        ليس لديك حساب؟{' '}
                        <Link
                            href="/register"
                            className="font-bold text-slate-900 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-200"
                        >
                            أنشئ حساب جديد
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
