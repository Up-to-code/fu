'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { OTPInput } from '../_components';

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (otp.length !== 6) {
            return;
        }
        
        setIsLoading(true);
        
        // TODO: Implement actual OTP verification with Better Auth
        console.log('Verify OTP:', otp);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // TODO: Redirect to appropriate page after verification
        }, 1000);
    };

    const handleResend = async () => {
        setIsResending(true);
        
        // TODO: Implement resend OTP with Better Auth
        console.log('Resend OTP');
        
        setTimeout(() => {
            setIsResending(false);
            setOtp('');
        }, 1000);
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
