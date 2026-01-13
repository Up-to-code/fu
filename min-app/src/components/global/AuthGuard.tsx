// File: src/components/global/AuthGuard.tsx
// Purpose: Protect screens from guest access

import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { ActionButton } from '../shared';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { user, isGuest } = useAuth();
    const router = useRouter();

    if (isGuest && !user) {
        return (
            <View className="flex-1 justify-center items-center bg-white px-6">
                <View className="items-center gap-4 mb-8">
                    <Text className="text-2xl font-cairo-bold text-slate-800 text-center">
                        تسجيل الدخول مطلوب
                    </Text>
                    <Text className="text-slate-500 text-center font-cairo-medium">
                        يرجى تسجيل الدخول للوصول إلى هذه الصفحة
                    </Text>
                </View>
                <ActionButton
                    label="تسجيل الدخول"
                    icon="log-in"
                    onPress={() => router.push('/auth/login')}
                />
            </View>
        );
    }

    return <>{children}</>;
};
