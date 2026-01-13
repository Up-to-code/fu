// Privacy Policy Screen
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';

export default function PrivacyScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">سياسة الخصوصية</Text>
                <View className="w-6" />
            </View>
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                <Text className="font-cairo-bold text-slate-800 text-right mb-2 text-lg">جمع المعلومات</Text>
                <Text className="font-cairo-medium text-slate-600 text-right leading-7 mb-6">
                    نقوم بجمع المعلومات التي تقدمها لنا مباشرة، مثل عند إنشاء حساب، أو طلب منتج، أو التواصل مع خدمة العملاء. قد تشمل هذه المعلومات اسمك، عنوان بريدك الإلكتروني، رقم هاتفك، وعنوان منزلك.
                </Text>

                <Text className="font-cairo-bold text-slate-800 text-right mb-2 text-lg">استخدام المعلومات</Text>
                <Text className="font-cairo-medium text-slate-600 text-right leading-7 mb-6">
                    نستخدم المعلومات التي نجمعها لتقديم خدماتنا، وتطوير تجربتك، وإرسال التحديثات والعروض الترويجية، ومعالجة طلباتك ومدفوعاتك.
                </Text>

                <Text className="font-cairo-bold text-slate-800 text-right mb-2 text-lg">مشاركة المعلومات</Text>
                <Text className="font-cairo-medium text-slate-600 text-right leading-7 mb-6">
                    لا نقوم ببيع أو تأجير معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك مع مقدمي الخدمات الذين يساعدوننا في تشغيل أعمالنا (مثل شركات الشحن).
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
