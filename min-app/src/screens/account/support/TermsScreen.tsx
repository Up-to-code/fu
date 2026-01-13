// Terms Screen
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';

export default function TermsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">الشروط والأحكام</Text>
                <View className="w-6" />
            </View>
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                <Text className="font-cairo-bold text-slate-800 text-right mb-2 text-lg">المقدمة</Text>
                <Text className="font-cairo-medium text-slate-600 text-right leading-7 mb-6">
                    مرحباً بك في تطبيقنا. من خلال استخدامك لهذا التطبيق، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية.
                </Text>

                <Text className="font-cairo-bold text-slate-800 text-right mb-2 text-lg">الحساب والتسجيل</Text>
                <Text className="font-cairo-medium text-slate-600 text-right leading-7 mb-6">
                    أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور. نحن نحتفظ بالحق في إنهاء الحسابات أو رفض الخدمة وفقاً لتقديرنا.
                </Text>

                <Text className="font-cairo-bold text-slate-800 text-right mb-2 text-lg">حقوق الملكية الفكرية</Text>
                <Text className="font-cairo-medium text-slate-600 text-right leading-7 mb-6">
                    جميع المحتويات الموجودة في هذا التطبيق، بما في ذلك النصوص، الصور، والشعارات، هي ملكية حصرية لنا ومحمية بموجب قوانين حقوق الطبع والنشر.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
