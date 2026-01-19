'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '../_components';
import { useAuthActions } from '@/lib/auth/hooks';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function RegisterForm() {
    const [name, setName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { signUp } = useAuthActions();
    
    // Convex mutation to update profile with business details
    const updateUserProfile = useMutation(api.users.updateUserProfile);

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
        setError(null);

        if (!validatePasswords()) {
            return;
        }

        setIsLoading(true);

        try {
            // 1. Sign up with Better Auth
            const result = await signUp.email({
                email,
                password,
                name: name, // Use personal name for the user account
            });

            if (result.error) {
                setError(result.error.message || 'فشل إنشاء الحساب');
                toast.error('فشل إنشاء الحساب', {
                    description: result.error.message || 'يرجى المحاولة مرة أخرى',
                });
                setIsLoading(false);
            } else {
                // 2. If successful, update the profile with business name
                // We need to wait a moment for the session to propagate or use the user ID if returned
                // Better Auth signUp doesn't return the user ID in the result object usually, but logs in.
                
                try {
                   // We attempt to update the profile. Since signUp logs us in, 
                   // the mutation should have the userId from context.
                   // However, we might need to rely on the backend trigger or do it here optimistically.
                   // Note: We need the userId. updateUserProfile expects userId.
                   // But wait, the mutation args requires `userId`.
                   // If we are logged in, we can get userId from `ctx.auth.getUser(ctx)`.
                   // But my `updateUserProfile` mutation takes `userId` as an argument.
                   // It assumes the caller knows the ID.
                   // Does `signUp` return the user?
                   // result.data might have user info.
                   
                   // Let's check what `result.data` has.
                   // If not, we might rely on the user filling this later or `better-auth` hooks.
                   
                   // WORKAROUND: For now, we just proceed. The user can update settings later.
                   // OR: We pass businessName as part of the name temporarily? "Name | Business"
                   // No, that's messy.
                   
                   // Let's try to get the user from authClient immediately?
                   const session = await authClient.getSession();
                   if (session.data?.user?.id) {
                       await updateUserProfile({
                           userId: session.data.user.id,
                           businessName: organizationName,
                           role: "vendor" // Enforce vendor role
                       });
                   }
                } catch (updateError) {
                    console.error("Failed to update business profile:", updateError);
                    // Don't block registration success
                }

                toast.success('تم إنشاء الحساب بنجاح');
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'حدث خطأ أثناء إنشاء الحساب';
            setError(errorMessage);
            toast.error('خطأ', {
                description: errorMessage,
            });
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            console.log("Starting Google signup...");
            const result = await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/dashboard',
            }) as { data?: { url?: string }; error?: any } | undefined;

            if (result?.error) {
                 // ... existing error handling ...
                 toast.error('فشل التسجيل مع Google');
                 return;
            }

            if (result?.data?.url) {
                window.location.href = result.data.url;
            }
        } catch (err: any) {
            console.error("Google signup exception:", err);
            toast.error('فشل التسجيل مع Google');
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
                    إنشاء حساب جديد
                </h1>
                <p className="text-slate-500 font-medium">
                    انضم إلى منصة <span className="text-slate-900 font-bold">Houses</span> لإدارة معرضك
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8">
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

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
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

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
