// File: src/screens/auth/_hooks/useRegister.ts
// Purpose: Registration form state and submission

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';

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
}

export const useRegister = (): UseRegisterReturn => {
    const router = useRouter();
    const { register, isLoading: authLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            await register(email.trim(), password, name.trim());
            router.replace('/(tabs)/home');
        } catch (error: any) {
            Alert.alert('خطأ', error?.message || 'فشل إنشاء الحساب');
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
    };
};
