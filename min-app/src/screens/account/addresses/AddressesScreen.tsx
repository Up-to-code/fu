// Addresses List Screen
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton, EmptyState } from '../../../components/shared';
import { COLORS } from '../../../constants/theme';

const isTablet = Dimensions.get('window').width >= 768;

const MOCK_ADDRESSES = [
    { id: '1', type: 'المنزل', name: 'أحمد منصور', phone: '0512345678', address: 'حي النرجس، شارع الأمير سلطان، الرياض', isDefault: true },
    { id: '2', type: 'العمل', name: 'أحمد منصور', phone: '0512345678', address: 'مركز الملك عبدالله المالي، الرياض', isDefault: false },
];

export default function AddressesScreen() {
    const router = useRouter();
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

    const handleDelete = (id: string) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">العناوين المحفوظة</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <View key={addr.id} className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
                            {/* Header */}
                            <View className="flex-row-reverse justify-between items-start mb-3">
                                <View className="flex-row-reverse items-center gap-2">
                                    <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                                        <Feather name={addr.type === 'العمل' ? 'briefcase' : 'home'} size={14} color={COLORS.primary} />
                                    </View>
                                    <View>
                                        <Text className="font-cairo-bold text-slate-800 text-right">{addr.type}</Text>
                                        {addr.isDefault && <Text className="font-cairo-medium text-primary text-xs text-right">عنوان التوصيل الافتراضي</Text>}
                                    </View>
                                </View>
                                <View className="flex-row gap-2">
                                    <TouchableOpacity onPress={() => router.push(`/account/addresses/${addr.id}` as any)} className="p-2">
                                        <Feather name="edit-2" size={16} color="#94a3b8" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(addr.id)} className="p-2">
                                        <Feather name="trash-2" size={16} color="#ef4444" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Details */}
                            <Text className="font-cairo-bold text-slate-700 text-right mb-1">{addr.name}</Text>
                            <Text className="font-cairo-medium text-slate-500 text-right text-sm mb-1">{addr.phone}</Text>
                            <Text className="font-cairo-medium text-slate-500 text-right text-sm leading-5">{addr.address}</Text>
                        </View>
                    ))
                ) : (
                    <EmptyState
                        icon="map-pin"
                        title="لا توجد عناوين"
                        description="لم تقم بإضافة عناوين توصيل بعد"
                    />
                )}
            </ScrollView>

            <View className="p-4 border-t border-slate-100">
                <ActionButton
                    label="إضافة عنوان جديد"
                    icon="plus"
                    onPress={() => router.push('/account/addresses/new' as any)}
                />
            </View>
        </SafeAreaView>
    );
}
