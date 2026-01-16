// File: src/screens/cart/CartScreen.tsx
// Purpose: Shopping Cart Screen

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, EmptyCartState, PrimaryButton } from '../shared';
import { useCart } from './_hooks';
import { COLORS } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

const MOCK_CART = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', quantity: 1 },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', quantity: 2 },
];

export default function CartScreen() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeItem, getItemTotal, cartTotal, isEmpty } = useCart(MOCK_CART);
    const { getSize, fontSize, iconSize } = useResponsive();
    const styles = getStyles(getSize, fontSize, iconSize);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header
                    title="السلة"
                    rightAction={
                        !isEmpty ? (
                            <Text style={styles.itemsCount}>{cartItems.length} منتجات</Text>
                        ) : undefined
                    }
                />

                {/* Content */}
                {isEmpty ? (
                    <EmptyCartState onBrowseProducts={() => router.push('/(tabs)/home')} />
                ) : (
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.itemContent}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemName} numberOfLines={2}>
                                            {item.name}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => removeItem(item.id)}
                                            style={styles.deleteButton}
                                        >
                                            <Feather name="trash-2" size={iconSize.xs} color="#EF4444" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.itemFooter}>
                                        <View style={styles.priceRow}>
                                            <Text style={styles.itemPrice}>
                                                {getItemTotal(item)} ر.س
                                            </Text>
                                            {item.discount && (
                                                <Text style={styles.originalPrice}>
                                                    {item.price * item.quantity}
                                                </Text>
                                            )}
                                        </View>
                                        <View style={styles.quantityControls}>
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(item.id, -1)}
                                                style={styles.quantityButton}
                                            >
                                                <Feather name="minus" size={iconSize.xs} color={COLORS.text} />
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(item.id, 1)}
                                                style={styles.quantityButton}
                                            >
                                                <Feather name="plus" size={iconSize.xs} color={COLORS.text} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </SafeAreaView>

            {/* Bottom Bar */}
            {!isEmpty && (
                <View style={styles.footer}>
                    <View style={styles.totalSection}>
                        <Text style={styles.totalLabel}>الإجمالي</Text>
                        <Text style={styles.totalAmount}>{cartTotal} ر.س</Text>
                    </View>
                    <PrimaryButton
                        label="إتمام الطلب"
                        onPress={() => router.push('/checkout')}
                        style={styles.checkoutButton}
                    />
                </View>
            )}
        </View>
    );
}

const getStyles = (
    getSize: (small: number, medium: number, large: number, tablet: number, desktop: number) => number,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number },
    iconSize: { sm: number; md: number; lg: number; xl: number }
) => {
    const { StyleSheet } = require('react-native');
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        safeArea: {
            flex: 1,
        },
        itemsCount: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#64748b',
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingTop: getSize(12, 14, 16, 20, 24),
            paddingBottom: getSize(12, 14, 16, 20, 24),
        },
        cartItem: {
            flexDirection: 'row-reverse',
            backgroundColor: '#f8fafc',
            borderRadius: getSize(14, 15, 16, 18, 20),
            padding: getSize(10, 11, 12, 16, 20),
            marginBottom: getSize(10, 11, 12, 16, 20),
        },
        itemImage: {
            width: getSize(72, 76, 80, 96, 112),
            height: getSize(72, 76, 80, 96, 112),
            borderRadius: getSize(10, 11, 12, 14, 16),
            backgroundColor: '#e2e8f0',
        },
        itemContent: {
            flex: 1,
            marginRight: getSize(10, 11, 12, 16, 20),
            justifyContent: 'space-between',
        },
        itemHeader: {
            flexDirection: 'row-reverse',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        itemName: {
            flex: 1,
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: '#1e293b',
            textAlign: 'right',
        },
        deleteButton: {
            width: getSize(26, 27, 28, 32, 36),
            height: getSize(26, 27, 28, 32, 36),
            backgroundColor: '#FEF2F2',
            borderRadius: getSize(13, 13.5, 14, 16, 18),
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: getSize(6, 7, 8, 10, 12),
        },
        itemFooter: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        priceRow: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 8,
        },
        itemPrice: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: COLORS.primary,
        },
        originalPrice: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.xs,
            color: '#94a3b8',
            textDecorationLine: 'line-through',
        },
        quantityControls: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: getSize(6, 7, 8, 10, 12),
        },
        quantityButton: {
            width: getSize(30, 31, 32, 36, 40),
            height: getSize(30, 31, 32, 36, 40),
            alignItems: 'center',
            justifyContent: 'center',
        },
        quantityText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: '#1e293b',
            width: getSize(22, 23, 24, 28, 32),
            textAlign: 'center',
        },
        footer: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: getSize(16, 18, 20, 24, 32),
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
            gap: getSize(12, 14, 16, 20, 24),
        },
        totalSection: {
            alignItems: 'flex-end',
        },
        totalLabel: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.xs,
            color: '#64748b',
            marginBottom: 4,
        },
        totalAmount: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.lg,
            color: COLORS.primary,
        },
        checkoutButton: {
            flex: 1,
        },
    });
};
