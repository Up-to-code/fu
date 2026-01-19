'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Check if forgetPassword is available
            if (!('forgetPassword' in authClient)) {
                setError('ميزة إعادة تعيين كلمة المرور غير مفعلة حالياً');
                toast.error('غير متاح', {
                    description: 'ميزة إعادة تعيين كلمة المرور غير مفعلة. يرجى التواصل مع الدعم.',
                });
                setIsLoading(false);
                return;
            }

            const result = await (authClient as any).forgetPassword({
                email,
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (result?.error) {
                setError(result.error.message || 'فشل إرسال رابط إعادة التعيين');
                toast.error('خطأ', {
                    description: result.error.message || 'يرجى المحاولة مرة أخرى',
                });
            } else {
                setIsSubmitted(true);
                toast.success('تم إرسال رابط إعادة التعيين');
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'حدث خطأ أثناء إرسال رابط إعادة التعيين';
            setError(errorMessage);
            toast.error('خطأ', {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
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
                        تحقق من بريدك
                    </h1>
                    <p className="text-slate-500 font-medium">
                        تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
                    </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-slate-600 font-medium">
                            تم إرسال رابط إعادة تعيين كلمة المرور إلى <span className="font-bold text-slate-900">{email}</span>
                        </p>
                        <p className="text-sm text-slate-500">
                            يرجى التحقق من بريدك الإلكتروني ومتابعة التعليمات
                        </p>
                        <div className="pt-4">
                            <Link href="/login">
                                <Button variant="outline" className="w-full rounded-xl">
                                    العودة لتسجيل الدخول
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                    نسيت كلمة المرور؟
                </h1>
                <p className="text-slate-500 font-medium">
                    أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
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

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-13 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-md active:scale-[0.98]"
                        disabled={isLoading}
                    >
                        {isLoading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
                    </Button>
                </form>

                <div className="text-center text-sm text-slate-500 font-medium pt-4 mt-4 border-t border-slate-100">
                    تذكرت كلمة المرور؟{' '}
                    <Link
                        href="/login"
                        className="font-bold text-slate-900 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-200"
                    >
                        تسجيل الدخول
                    </Link>
                </div>
            </div>
        </div>
    );
}
