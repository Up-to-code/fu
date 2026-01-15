// File: src/screens/shared/components/QuickViewModal.tsx
// Purpose: Generic quick view modal for previews

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import { QuickViewModalProps } from '../types/ui';
import { styles } from '../StyleSheets/QuickViewModal.styles';

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
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <SafeAreaView edges={['bottom']}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>معاينة سريعة</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Feather name="x" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            {/* Provider Info */}
                            <View style={styles.providerInfo}>
                                <View style={styles.avatarContainer}>
                                    <View style={styles.avatarWrapper}>
                                        <Image
                                            source={{ uri: provider.avatar }}
                                            style={styles.avatar}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    {provider.verified && (
                                        <View style={styles.verifiedBadge}>
                                            <Feather name="check" size={12} color="white" />
                                        </View>
                                    )}
                                </View>
                                <View style={styles.providerDetails}>
                                    <Text style={styles.providerName}>
                                        {provider.name}
                                    </Text>
                                    <Text style={styles.providerCategory}>
                                        {provider.category} • {provider.location}
                                    </Text>
                                    <View style={styles.ratingRow}>
                                        <View style={styles.ratingContainer}>
                                            <Feather name="star" size={14} color="#F59E0B" />
                                            <Text style={styles.ratingText}>
                                                {provider.rating}
                                            </Text>
                                        </View>
                                        <Text style={styles.reviewCount}>
                                            ({provider.reviews} تقييم)
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Price */}
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>
                                    {provider.priceLabel}
                                </Text>
                                <Text style={styles.priceSubtext}>
                                    السعر يبدأ من
                                </Text>
                            </View>

                            {/* Actions */}
                            <View style={styles.actions}>
                                <TouchableOpacity
                                    onPress={onViewDetails}
                                    style={styles.viewDetailsButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.viewDetailsText}>عرض التفاصيل</Text>
                                    <Feather name="arrow-left" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onBook}
                                    style={styles.bookButton}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.bookText}>حجز موعد</Text>
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
