'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '../_components';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePasswords = () => {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError('كلمات المرور غير متطابقة');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (confirmPassword && value !== confirmPassword) {
            setPasswordError('كلمات المرور غير متطابقة');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (password && value !== password) {
            setPasswordError('كلمات المرور غير متطابقة');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validatePasswords()) {
            return;
        }
        
        setIsLoading(true);
        
        // TODO: Implement actual registration logic with Better Auth
        console.log('Register:', { name, organizationName, email, password });
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleGoogleSignup = () => {
        // TODO: Implement Google signup
        console.log('Google signup');
    };

    const handleAppleSignup = () => {
        // TODO: Implement Apple signup
        console.log('Apple signup');
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
                    إنشاء حساب جديد
                </h1>
                <p className="text-slate-500 font-medium">
                    انضم إلى منصة <span className="text-slate-900 font-bold">Houses</span> لإدارة معرضك
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="اسمك الكامل"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="organizationName">اسم المنشأة</Label>
                            <Input
                                id="organizationName"
                                type="text"
                                placeholder="اسم معرضك أو منشأتك"
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>

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
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                required
                                className={`rounded-xl ${passwordError ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                            />
                            {passwordError && (
                                <p className="text-sm text-red-500 font-medium">{passwordError}</p>
                            )}
                        </div>

                        <Button 
                            type="submit"
                            className="w-full h-13 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-md active:scale-[0.98]"
                            disabled={isLoading || !!passwordError}
                        >
                            {isLoading ? 'جاري إنشاء الحساب...' : 'التسجيل'}
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
                        mode="register"
                        onGoogleClick={handleGoogleSignup}
                        onAppleClick={handleAppleSignup}
                    />

                    <div className="text-center text-sm text-slate-500 font-medium pt-2">
                        لديك حساب بالفعل؟{' '}
                        <Link
                            href="/login"
                            className="font-bold text-slate-900 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-200"
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
