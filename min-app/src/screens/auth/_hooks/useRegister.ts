// File: src/screens/auth/_hooks/useRegister.ts
// Purpose: Registration form state and submission

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';

// Convert technical error messages to user-friendly Arabic
const parseServerError = (error: any): string => {
    const message = error?.message || '';

    // Check for common validation patterns
    if (message.includes('body.name') || message.includes('name')) {
        if (message.includes('Too small') || message.includes('required')) {
            return 'الاسم مطلوب';
        }
    }

    if (message.includes('body.email') || message.includes('email')) {
        if (message.includes('Invalid')) {
            return 'البريد الإلكتروني غير صحيح';
        }
        if (message.includes('already') || message.includes('exists')) {
            return 'هذا البريد الإلكتروني مسجل مسبقاً';
        }
        if (message.includes('Too small') || message.includes('required')) {
            return 'البريد الإلكتروني مطلوب';
        }
    }

    if (message.includes('body.password') || message.includes('password')) {
        if (message.includes('Too small') || message.includes('short')) {
            return 'كلمة المرور قصيرة جداً';
        }
        if (message.includes('required')) {
            return 'كلمة المرور مطلوبة';
        }
    }

    // Network errors
    if (message.includes('network') || message.includes('Network')) {
        return 'خطأ في الاتصال. تحقق من الإنترنت';
    }

    // Default error
    return 'فشل إنشاء الحساب. حاول مرة أخرى';
};

interface UseRegisterReturn {
    name: string;
    email: string;
    password: string;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleRegister: () => Promise<void>;
    isLoading: boolean;
    errors: {
        name?: string;
        email?: string;
        password?: string;
    };
    serverError: string | null;
    clearServerError: () => void;
}

export const useRegister = (): UseRegisterReturn => {
    const router = useRouter();
    const { register, isLoading: authLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const clearServerError = () => setServerError(null);

    const validateForm = (): boolean => {
        const newErrors: { name?: string; email?: string; password?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        }

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

    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setServerError(null);
        try {
            await register(email.trim(), password, name.trim());
            router.replace('/(tabs)/home');
        } catch (error: any) {
            setServerError(parseServerError(error));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        handleRegister,
        isLoading: isLoading || authLoading,
        errors,
        serverError,
        clearServerError,
    };
};
