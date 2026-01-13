// Support Screen - FAQ & Contact
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, LayoutAnimation, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../../components/shared';
import { COLORS } from '../../../constants/theme';

const isTablet = Dimensions.get('window').width >= 768;

const FAQS = [
    { q: 'كيف يمكنني تتبع طلبي؟', a: 'يمكنك تتبع طلبك من خلال الذهاب إلى "طلباتي" في صفحة الحساب والنقر على الطلب لمعرفة حالته وتفاصيل التتبع.' },
    { q: 'ما هي سياسة الاسترجاع؟', a: 'يمكنك استرجاع المنتجات خلال 14 يوماً من الاستلام بشرط أن تكون بحالتها الأصلية وغير مستخدمة.' },
    { q: 'هل تتوفر خدمة التركيب؟', a: 'نعم، نوفر خدمة التركيب لجميع منتجات الأثاث الكبيرة داخل المدن الرئيسية.' },
    { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل الدفع عبر بطاقات مدى، فيزا، ماستركارد، Apple Pay، وخدمة تمارا للتقسيط.' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View className="bg-slate-50 rounded-xl mb-3 overflow-hidden border border-slate-100">
            <TouchableOpacity onPress={toggle} className="p-4 flex-row-reverse items-center justify-between">
                <Text className="font-cairo-bold text-slate-800 text-right flex-1 ml-2">{question}</Text>
                <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={COLORS.text} />
            </TouchableOpacity>
            {expanded && (
                <View className="px-4 pb-4">
                    <Text className="font-cairo-medium text-slate-600 text-right leading-6">{answer}</Text>
                </View>
            )}
        </View>
    );
}

export default function SupportScreen() {
    const router = useRouter();
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">المساعدة والدعم</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Contact Options */}
                <View className="flex-row-reverse gap-3 mb-8">
                    <TouchableOpacity className="flex-1 bg-primary/5 p-4 rounded-2xl items-center border border-primary/10">
                        <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
                            <Feather name="phone-call" size={20} color={COLORS.primary} />
                        </View>
                        <Text className="font-cairo-bold text-slate-800 mb-1">اتصل بنا</Text>
                        <Text className="font-cairo-medium text-slate-500 text-xs text-center">920000000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-green-50 p-4 rounded-2xl items-center border border-green-100">
                        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-2">
                            <Feather name="message-circle" size={20} color="#10B981" />
                        </View>
                        <Text className="font-cairo-bold text-slate-800 mb-1">واتساب</Text>
                        <Text className="font-cairo-medium text-slate-500 text-xs text-center">محادثة فورية</Text>
                    </TouchableOpacity>
                </View>

                {/* FAQ Section */}
                <Text className="font-cairo-bold text-slate-800 text-right mb-4 text-lg">الأسئلة الشائعة</Text>
                <View className="mb-8">
                    {FAQS.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} />
                    ))}
                </View>

                {/* Contact Form */}
                <Text className="font-cairo-bold text-slate-800 text-right mb-4 text-lg">إرسال رسالة</Text>
                <View className="bg-slate-50 p-4 rounded-2xl mb-6">
                    <TextInput
                        className="bg-white rounded-xl px-4 py-3 text-right font-cairo-medium min-h-[120px] mb-4 text-slate-800"
                        placeholder="كيف يمكننا مساعدتك؟"
                        placeholderTextColor="#94a3b8"
                        multiline
                        textAlignVertical="top"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <ActionButton label="إرسال" icon="send" onPress={() => console.log('Send', message)} />
                </View>

                {/* Legal Links */}
                <View className="items-center gap-4 mt-4">
                    <TouchableOpacity onPress={() => router.push('/account/support/privacy' as any)}>
                        <Text className="font-cairo-medium text-slate-500 text-sm">سياسة الخصوصية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/account/support/terms' as any)}>
                        <Text className="font-cairo-medium text-slate-500 text-sm">الشروط والأحكام</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
