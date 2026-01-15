import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { signInWithGoogle } from '../../src/lib/auth-client';
import { COLORS } from '../../src/constants/theme';

export default function LoginScreen() {
    const { login, isLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.replace('/(tabs)/home');
        } catch (error: any) {
            alert(error.message || "فشل تسجيل الدخول");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.replace('/(tabs)/home');
        } catch (error: any) {
            alert(error.message || "فشل تسجيل الدخول بـ Google");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-center px-5">
                    {/* Icon */}
                    <View className="items-center mb-8">
                        <View className="w-16 h-16 bg-slate-100 rounded-2xl items-center justify-center mb-6">
                            <Feather name="user" size={28} color={COLORS.primary} />
                        </View>
                    </View>

                    {/* Heading */}
                    <Text className="text-3xl font-cairo-bold text-slate-900 text-center mb-2">
                        أهلاً بك مجدداً
                    </Text>
                    <Text className="text-slate-500 font-cairo-medium text-center mb-10">
                        سجل الدخول للمتابعة
                    </Text>

                    {/* Form */}
                    <View className="mb-6">
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="البريد الإلكتروني"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="border border-slate-200 rounded-xl px-4 py-4 text-right font-cairo-medium text-slate-800 mb-4 bg-white"
                            placeholderTextColor={COLORS.textLight}
                        />
                        <View className="flex-row-reverse items-center border border-slate-200 rounded-xl px-4 py-4 bg-white">
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="كلمة المرور"
                                secureTextEntry={!showPassword}
                                className="flex-1 text-right font-cairo-medium text-slate-800"
                                placeholderTextColor={COLORS.textLight}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-3">
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity className="mb-6 self-end">
                        <Text className="font-cairo-medium text-right text-sm" style={{ color: COLORS.primary }}>
                            نسيت كلمة المرور؟
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={isLoading}
                        className="py-4 rounded-xl mb-8"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        <Text className="text-white font-cairo-bold text-center text-lg">
                            {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center mb-6">
                        <View className="flex-1 h-px bg-slate-200" />
                        <Text className="px-4 text-slate-400 font-cairo-medium text-sm">أو</Text>
                        <View className="flex-1 h-px bg-slate-200" />
                    </View>

                    <View className="flex-row gap-3 mb-8">
                        <TouchableOpacity
                            onPress={handleGoogleSignIn}
                            className="flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl border border-slate-200 bg-white"
                        >
                            <Feather name="chrome" size={20} color="#4285F4" />
                            <Text className="font-cairo-bold text-slate-800">Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl border border-slate-200 bg-white"
                        >
                            <Feather name="smartphone" size={20} color="#000000" />
                            <Text className="font-cairo-bold text-slate-800">Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center gap-2">
                        <Text className="text-slate-500 font-cairo-medium text-sm">ليس لديك حساب؟</Text>
                        <Link href="/auth/register" asChild>
                            <TouchableOpacity>
                                <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>سجل الآن</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
