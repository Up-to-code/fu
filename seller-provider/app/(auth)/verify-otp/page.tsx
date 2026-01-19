'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { OTPInput } from '../_components';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';

function VerifyOTPForm() {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (otp.length !== 6) {
            setError('الرجاء إدخال الرمز المكون من 6 أرقام');
            return;
        }

        setIsLoading(true);

        try {
            // Check if verifyEmail is available
            if (!('verifyEmail' in authClient)) {
                setError('ميزة التحقق من البريد الإلكتروني غير مفعلة حالياً');
                toast.error('غير متاح', {
                    description: 'ميزة التحقق من البريد الإلكتروني غير مفعلة.',
                });
                setIsLoading(false);
                return;
            }

            // Better Auth uses token-based email verification
            // For OTP, we'll treat the OTP as the verification token
            const result = await (authClient as any).verifyEmail({
                token: otp,
            });

            if (result?.error) {
                setError(result.error.message || 'الرمز غير صحيح');
                toast.error('فشل التحقق', {
                    description: result.error.message || 'يرجى التحقق من الرمز والمحاولة مرة أخرى',
                });
            } else {
                toast.success('تم التحقق بنجاح');
                router.push(redirectTo);
                router.refresh();
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'حدث خطأ أثناء التحقق';
            setError(errorMessage);
            toast.error('خطأ', {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setError(null);

        try {
            if (!email) {
                toast.error('البريد الإلكتروني غير متوفر');
                setIsResending(false);
                return;
            }

            // Check if sendVerificationEmail is available
            if (!('sendVerificationEmail' in authClient)) {
                toast.error('غير متاح', {
                    description: 'ميزة إعادة إرسال رمز التحقق غير مفعلة.',
                });
                setIsResending(false);
                return;
            }

            const result = await (authClient as any).sendVerificationEmail({
                email,
            });

            if (result?.error) {
                toast.error('فشل إعادة الإرسال', {
                    description: result.error.message || 'يرجى المحاولة مرة أخرى',
                });
            } else {
                toast.success('تم إرسال الرمز مرة أخرى');
                setOtp('');
            }
        } catch (err: any) {
            toast.error('خطأ', {
                description: err?.message || 'حدث خطأ أثناء إعادة الإرسال',
            });
        } finally {
            setIsResending(false);
        }
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
                    التحقق من الرمز
                </h1>
                <p className="text-slate-500 font-medium">
                    أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            length={6}
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
                        disabled={isLoading || otp.length !== 6}
                    >
                        {isLoading ? 'جاري التحقق...' : 'تحقق'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-sm text-slate-500 font-medium hover:text-slate-900 transition-colors disabled:opacity-50"
                    >
                        {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الرمز'}
                    </button>
                </div>

                <div className="text-center text-sm text-slate-500 font-medium pt-4 mt-4 border-t border-slate-100">
                    <Link
                        href="/login"
                        className="font-bold text-slate-900 hover:text-blue-600 transition-colors underline underline-offset-4 decoration-slate-200"
                    >
                        العودة لتسجيل الدخول
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>}>
            <VerifyOTPForm />
        </Suspense>
    );
}
