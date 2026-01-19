'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '../_components';
import { Mail, Lock, Layers, User, Building2 } from 'lucide-react';

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
        
        // TODO: Implement actual registration logic
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
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center">
                <div className="h-16 w-16 bg-[#242C5A] rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-[#242C5A]/20">
                    <Layers className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-black text-[#242C5A] tracking-tight mb-2">
                    إنشاء حساب جديد
                </h1>
                <p className="text-gray-500 font-medium">
                    انضم إلى منصة <span className="text-[#242C5A] font-bold">مقدمي الخدمات</span> وابدأ في كسب الأرباح
                </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="space-y-6">
                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم</Label>
                            <div className="relative">
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="اسمك الكامل"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="rounded-xl pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="organizationName">اسم النشاط / الخدمة</Label>
                            <div className="relative">
                                <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="organizationName"
                                    type="text"
                                    placeholder="مثال: خدمات التصميم الإبداعي"
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                    required
                                    className="rounded-xl pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

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
                            <Label htmlFor="password">كلمة المرور</Label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    required
                                    className="rounded-xl pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                            <div className="relative">
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    required
                                    className={`rounded-xl pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white transition-all ${passwordError ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                                />
                            </div>
                            {passwordError && (
                                <p className="text-sm text-red-500 font-medium">{passwordError}</p>
                            )}
                        </div>

                        <Button 
                            type="submit"
                            className="w-full h-12 text-lg font-bold bg-[#242C5A] hover:bg-[#1a2144] text-white rounded-xl transition-all shadow-lg shadow-[#242C5A]/20 active:scale-[0.98]"
                            disabled={isLoading || !!passwordError}
                        >
                            {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب جديد'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-medium">أو التسجيل باستخدام</span>
                        </div>
                    </div>

                    <SocialLoginButtons 
                        mode="register"
                        onGoogleClick={handleGoogleSignup}
                        onAppleClick={handleAppleSignup}
                    />

                    <div className="text-center text-sm text-gray-500 font-medium pt-2">
                        لديك حساب بالفعل؟{' '}
                        <Link
                            href="/login"
                            className="font-bold text-[#242C5A] hover:underline transition-all"
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
