// Address Edit/Create Screen
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from '../../../components/shared';
import { COLORS } from '../../../constants/theme';

const isTablet = Dimensions.get('window').width >= 768;

export default function AddressEditScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const isEdit = id !== 'new';

    const [type, setType] = useState('المنزل');
    const [name, setName] = useState('أحمد منصور');
    const [phone, setPhone] = useState('0512345678');
    const [city, setCity] = useState('الرياض');
    const [street, setStreet] = useState('شارع العليا');
    const [details, setDetails] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">{isEdit ? 'تعديل العنوان' : 'إضافة عنوان جديد'}</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Type Selection */}
                <View className="flex-row-reverse gap-3 mb-6">
                    {['المنزل', 'العمل', 'آخر'].map(t => (
                        <TouchableOpacity
                            key={t}
                            onPress={() => setType(t)}
                            className={`flex-1 py-3 rounded-xl border items-center ${type === t ? 'bg-primary border-primary' : 'bg-white border-slate-200'}`}
                        >
                            <Text className={`font-cairo-bold ${type === t ? 'text-white' : 'text-slate-600'}`}>{t}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Form */}
                <View className="gap-4 mb-6">
                    <View>
                        <Text className="font-cairo-bold text-slate-700 text-right mb-2">الاسم</Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View>
                        <Text className="font-cairo-bold text-slate-700 text-right mb-2">رقم الجوال</Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View className="flex-row-reverse gap-3">
                        <View className="flex-1">
                            <Text className="font-cairo-bold text-slate-700 text-right mb-2">المدينة</Text>
                            <TextInput
                                className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium"
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="font-cairo-bold text-slate-700 text-right mb-2">الحي / الشارع</Text>
                            <TextInput
                                className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium"
                                value={street}
                                onChangeText={setStreet}
                            />
                        </View>
                    </View>
                    <View>
                        <Text className="font-cairo-bold text-slate-700 text-right mb-2">تفاصيل إضافية</Text>
                        <TextInput
                            className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium min-h-[100px]"
                            value={details}
                            onChangeText={setDetails}
                            multiline
                            textAlignVertical="top"
                            placeholder="مثال: الدور الأول، شقة 4"
                        />
                    </View>
                </View>

                {/* Default Toggle */}
                <View className="flex-row-reverse justify-between items-center bg-slate-50 p-4 rounded-xl mb-8">
                    <Text className="font-cairo-bold text-slate-700">تعيين كعنوان افتراضي</Text>
                    <Switch
                        value={isDefault}
                        onValueChange={setIsDefault}
                        trackColor={{ true: COLORS.primary }}
                    />
                </View>

                <ActionButton
                    label="حفظ العنوان"
                    icon="check"
                    onPress={() => router.back()}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
