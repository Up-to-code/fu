// File: src/screens/services/_components/QuickViewModal.tsx
// Purpose: Quick view modal for service provider preview

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';

interface Provider {
    id: string;
    name: string;
    type: string;
    category: string;
    avatar: string;
    rating: number;
    reviews: number;
    price: number;
    priceLabel: string;
    location: string;
    verified: boolean;
}

interface QuickViewModalProps {
    visible: boolean;
    provider: Provider | null;
    onClose: () => void;
    onViewDetails: () => void;
    onBook: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
    visible,
    provider,
    onClose,
    onViewDetails,
    onBook,
}) => {
    if (!provider) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-white rounded-t-3xl max-h-[85%]">
                    <SafeAreaView edges={['bottom']}>
                        {/* Header */}
                        <View className="flex-row-reverse items-center justify-between px-5 py-4 border-b border-slate-100">
                            <Text className="font-cairo-bold text-xl text-slate-900">معاينة سريعة</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Feather name="x" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
                            {/* Provider Info */}
                            <View className="flex-row-reverse items-center gap-4 mb-6">
                                <View className="relative">
                                    <View className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden">
                                        <Image
                                            source={{ uri: provider.avatar }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    {provider.verified && (
                                        <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                                            <Feather name="check" size={12} color="white" />
                                        </View>
                                    )}
                                </View>
                                <View className="flex-1">
                                    <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-1">
                                        {provider.name}
                                    </Text>
                                    <Text className="font-cairo-medium text-slate-500 text-sm text-right mb-2">
                                        {provider.category} • {provider.location}
                                    </Text>
                                    <View className="flex-row-reverse items-center gap-2">
                                        <View className="flex-row-reverse items-center gap-1">
                                            <Feather name="star" size={14} color="#F59E0B" />
                                            <Text className="font-cairo-bold text-slate-900 text-sm">
                                                {provider.rating}
                                            </Text>
                                        </View>
                                        <Text className="font-cairo-medium text-slate-400 text-xs">
                                            ({provider.reviews} تقييم)
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Price */}
                            <View className="bg-slate-50 rounded-2xl p-4 mb-6">
                                <Text className="font-cairo-bold text-slate-900 text-lg text-right mb-1">
                                    {provider.priceLabel}
                                </Text>
                                <Text className="font-cairo-medium text-slate-500 text-sm text-right">
                                    السعر يبدأ من
                                </Text>
                            </View>

                            {/* Actions */}
                            <View className="gap-3 pb-4">
                                <TouchableOpacity
                                    onPress={onViewDetails}
                                    className="bg-primary rounded-2xl py-4 flex-row-reverse justify-center items-center gap-2"
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-white font-cairo-bold text-base">عرض التفاصيل</Text>
                                    <Feather name="arrow-left" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onBook}
                                    className="bg-slate-100 rounded-2xl py-4 flex-row-reverse justify-center items-center gap-2"
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-slate-800 font-cairo-bold text-base">حجز موعد</Text>
                                    <Feather name="calendar" size={20} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    );
};
