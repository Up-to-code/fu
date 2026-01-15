// File: src/screens/cart/CartScreen.tsx
// Purpose: Shopping Cart Screen

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, EmptyCartState, PrimaryButton } from '../shared';
import { useCart } from './_hooks';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const MOCK_CART = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', quantity: 1 },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', quantity: 2 },
];

export default function CartScreen() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeItem, getItemTotal, cartTotal, isEmpty } = useCart(MOCK_CART);

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
                                            <Feather name="trash-2" size={14} color="#EF4444" />
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
                                                <Feather name="minus" size={14} color={COLORS.text} />
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(item.id, 1)}
                                                style={styles.quantityButton}
                                            >
                                                <Feather name="plus" size={14} color={COLORS.text} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
    },
    itemsCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    cartItem: {
        flexDirection: 'row-reverse',
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#e2e8f0',
    },
    itemContent: {
        flex: 1,
        marginRight: 12,
        justifyContent: 'space-between',
    },
    itemHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemName: {
        flex: 1,
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    deleteButton: {
        width: 28,
        height: 28,
        backgroundColor: '#FEF2F2',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
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
        fontSize: 16,
        color: COLORS.primary,
    },
    originalPrice: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textDecorationLine: 'line-through',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    quantityButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        width: 24,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        gap: 16,
    },
    totalSection: {
        alignItems: 'flex-end',
    },
    totalLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        marginBottom: 4,
    },
    totalAmount: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.primary,
    },
    checkoutButton: {
        flex: 1,
    },
});
