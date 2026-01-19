'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '../_components';
import { useAuthActions } from '@/lib/auth/hooks';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn } = useAuthActions();
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || 'فشل تسجيل الدخول');
                toast.error('فشل تسجيل الدخول', {
                    description: result.error.message || 'يرجى التحقق من بياناتك والمحاولة مرة أخرى',
                });
            } else {
                toast.success('تم تسجيل الدخول بنجاح');
                router.push(redirectTo);
                router.refresh();
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'حدث خطأ أثناء تسجيل الدخول';
            setError(errorMessage);
            toast.error('خطأ', {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await authClient.signIn.social({
                provider: 'google',
                callbackURL: redirectTo,
            }) as { data?: { url?: string }; error?: any } | undefined;

            // If result has an error, show it
            if (result?.error) {
                console.error("Google OAuth API error:", result.error);
                console.error("Full result:", result);

                // Extract error message from various possible formats
                let errorMessage = "حدث خطأ أثناء الاتصال بخدمة Google.";

                if (typeof result.error === 'string') {
                    errorMessage = result.error;
                } else if (result.error?.message) {
                    errorMessage = result.error.message;
                } else if (result.error?.code) {
                    errorMessage = `خطأ ${result.error.code}: ${result.error.message || 'يرجى التحقق من إعدادات OAuth'}`;
                } else if (typeof result.error === 'object') {
                    // Try to extract any useful info from the error object
                    const errorKeys = Object.keys(result.error);
                    if (errorKeys.length > 0) {
                        errorMessage = `خطأ في OAuth: ${JSON.stringify(result.error)}`;
                    } else {
                        errorMessage = "لم يتم تكوين Google OAuth بشكل صحيح. يرجى التحقق من إعدادات GOOGLE_CLIENT_ID و GOOGLE_CLIENT_SECRET في Convex.";
                    }
                }

                toast.error('فشل تسجيل الدخول مع Google', {
                    description: errorMessage,
                    duration: 5000,
                });
                return;
            }

            // If result has a redirect URL, navigate to it (OAuth flow)
            if (result?.data?.url) {
                window.location.href = result.data.url;
                return; // Don't show error, we're redirecting
            }

            // If no URL but no error, the OAuth flow might be starting
            // The OAuth flow will redirect automatically via the callback
        } catch (err: any) {
            console.error("Google login error:", err);
            const errorMessage = err?.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو استخدام طريقة تسجيل الدخول الأخرى.";
            toast.error('فشل تسجيل الدخول مع Google', {
                description: errorMessage,
                duration: 5000,
            });
        }
    };

    return (
        <div className="w-full">
            {/* Mobile Header */}
            <div className="mb-10 lg:hidden flex flex-col items-center">
                <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center mb-6">
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

            <div className="bg-white border border-slate-100 rounded-2xl p-8">
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

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
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

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>}>
            <LoginForm />
        </Suspense>
    );
}
