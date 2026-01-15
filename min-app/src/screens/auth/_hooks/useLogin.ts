// File: src/screens/auth/_hooks/useLogin.ts
// Purpose: Login form state and submission

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';

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
}

export const useLogin = (): UseLoginReturn => {
    const router = useRouter();
    const { login, isLoading: authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            await login(email.trim(), password);
            router.replace('/(tabs)/home');
        } catch (error: any) {
            Alert.alert('خطأ', error?.message || 'فشل تسجيل الدخول');
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
    };
};
