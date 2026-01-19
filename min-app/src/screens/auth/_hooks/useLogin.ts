// File: src/screens/auth/_hooks/useLogin.ts
// Purpose: Login form state and submission

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';

// Convert technical error messages to user-friendly Arabic
const parseServerError = (error: any): string => {
    const message = error?.message || '';

    // Check for common login error patterns
    if (message.includes('Invalid credentials') || message.includes('invalid') || message.includes('incorrect')) {
        return 'البريد أو كلمة المرور غير صحيح';
    }

    if (message.includes('body.email') || message.includes('email')) {
        if (message.includes('Invalid')) {
            return 'البريد الإلكتروني غير صحيح';
        }
        if (message.includes('not found') || message.includes('Not found')) {
            return 'لا يوجد حساب بهذا البريد';
        }
    }

    if (message.includes('body.password') || message.includes('password')) {
        if (message.includes('Too small') || message.includes('short')) {
            return 'كلمة المرور قصيرة جداً';
        }
    }

    // Network errors
    if (message.includes('network') || message.includes('Network')) {
        return 'خطأ في الاتصال. تحقق من الإنترنت';
    }

    // Default error
    return 'فشل تسجيل الدخول. حاول مرة أخرى';
};

interface UseLoginReturn {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleLogin: () => Promise<void>;
    isLoading: boolean;
    errors: {
        email?: string;
        password?: string;
    };
    serverError: string | null;
    clearServerError: () => void;
}

export const useLogin = (): UseLoginReturn => {
    const router = useRouter();
    const { login, isLoading: authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const clearServerError = () => setServerError(null);

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'البريد الإلكتروني غير صحيح';
        }

        if (!password.trim()) {
            newErrors.password = 'كلمة المرور مطلوبة';
        } else if (password.length < 6) {
            newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setServerError(null);
        try {
            await login(email.trim(), password);
            router.replace('/(tabs)/home');
        } catch (error: any) {
            setServerError(parseServerError(error));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        handleLogin,
        isLoading: isLoading || authLoading,
        errors,
        serverError,
        clearServerError,
    };
};
