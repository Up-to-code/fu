// File: src/screens/checkout/CheckoutScreen.tsx
// Purpose: Checkout confirmation screen with order summary, delivery time, promo code, and notes

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeToConfirm } from '../../components/shared';
import { Header } from '../shared';
import { useCheckout, usePaymentMethods } from './_hooks';
import { useCart } from '../cart/_hooks';
import { COLORS } from '../../constants/theme';
import { styles } from './StyleSheets/CheckoutScreen.styles';

// Mock cart data (in real app, this would come from context/store)
const CART_ITEMS = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', quantity: 1 },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', quantity: 2 },
];

const DELIVERY_TIMES = [
    { id: '1', label: 'اليوم', time: '4:00 - 8:00 مساءً', available: true },
    { id: '2', label: 'غداً', time: '10:00 ص - 2:00 م', available: true },
    { id: '3', label: 'غداً', time: '4:00 - 8:00 مساءً', available: true },
    { id: '4', label: 'بعد غد', time: '10:00 ص - 2:00 م', available: false },
];

// Mock addresses
const ADDRESSES = [
    { id: '1', name: 'المنزل', address: 'شارع الملك فهد، حي النخيل، الرياض', phone: '0501234567', isDefault: true },
    { id: '2', name: 'العمل', address: 'برج المملكة، الطابق 15، الرياض', phone: '0509876543', isDefault: false },
];

export default function CheckoutScreen() {
    const router = useRouter();
    const { cartItems, cartTotal } = useCart(CART_ITEMS);
    const { formState, handleChange, handleSubmit, isLoading, errors } = useCheckout();
    const { paymentMethods, selectedMethod, setSelectedMethod } = usePaymentMethods();
    const [selectedTime, setSelectedTime] = useState<string>('1');
    const [selectedAddress, setSelectedAddress] = useState<string>('1');
    const [showAddressMenu, setShowAddressMenu] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const addressMenuAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Toggle address menu animation
    useEffect(() => {
        Animated.timing(addressMenuAnim, {
            toValue: showAddressMenu ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [showAddressMenu]);

    const currentAddress = ADDRESSES.find(a => a.id === selectedAddress) || ADDRESSES[0];

    // Calculate totals
    const subtotal = CART_ITEMS.reduce((sum, item) => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return sum + Math.round(price * item.quantity);
    }, 0);
    const shipping = subtotal >= 2000 ? 0 : 50;
    const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - promoDiscount + shipping;

    const handleApplyPromo = () => {
        if (promoCode.toLowerCase() === 'خصم10' || promoCode.toLowerCase() === 'save10') {
            setPromoApplied(true);
            Alert.alert('تم', 'تم تطبيق كود الخصم بنجاح!');
        } else {
            Alert.alert('خطأ', 'كود الخصم غير صالح');
        }
    };

    const handleConfirmOrder = async () => {
        await handleSubmit(cartItems, cartTotal);
    };

    const [notes, setNotes] = useState('');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="تأكيد الطلب" showBack />

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Delivery Address */}
                    <Animated.View 
                        style={[
                            styles.section,
                            { 
                                opacity: fadeAnim, 
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                عنوان التوصيل
                            </Text>
                            <TouchableOpacity 
                                onPress={() => setShowAddressMenu(!showAddressMenu)}
                                style={styles.changeButton}
                            >
                                <Text style={styles.changeText}>
                                    تغيير
                                </Text>
                                <Feather name="chevron-down" size={16} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        
                        {/* Current Address Card */}
                        <View style={styles.addressCard}>
                            <View style={styles.addressCardContent}>
                                <View style={styles.addressIcon}>
                                    <Feather name="map-pin" size={20} color={COLORS.primary} />
                                </View>
                                <View style={styles.addressDetails}>
                                    <Text style={styles.addressName}>
                                        {currentAddress.name}
                                    </Text>
                                    <Text style={styles.addressText}>
                                        {currentAddress.address}
                                    </Text>
                                    <Text style={styles.addressPhone}>
                                        {currentAddress.phone}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Address Selection Menu */}
                        {showAddressMenu && (
                            <Animated.View 
                                style={[
                                    styles.addressMenu,
                                    {
                                        opacity: addressMenuAnim,
                                        transform: [{
                                            translateY: addressMenuAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-10, 0],
                                            })
                                        }]
                                    }
                                ]}
                            >
                                {ADDRESSES.map((addr, index) => (
                                    <TouchableOpacity
                                        key={addr.id}
                                        onPress={() => {
                                            setSelectedAddress(addr.id);
                                            setShowAddressMenu(false);
                                        }}
                                        style={[
                                            styles.addressMenuItem,
                                            index < ADDRESSES.length - 1 && styles.addressMenuItemBorder
                                        ]}
                                    >
                                        <View style={[
                                            styles.addressRadio,
                                            selectedAddress === addr.id ? styles.addressRadioSelected : styles.addressRadioUnselected
                                        ]}>
                                            {selectedAddress === addr.id && (
                                                <View style={styles.addressRadioDot} />
                                            )}
                                        </View>
                                        <View style={styles.addressMenuItemDetails}>
                                            <Text style={styles.addressMenuItemName}>
                                                {addr.name}
                                            </Text>
                                            <Text style={styles.addressMenuItemText}>
                                                {addr.address}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                
                                {/* Add New Address */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowAddressMenu(false);
                                        router.push('/account/addresses' as any);
                                    }}
                                    style={styles.addAddressButton}
                                >
                                    <View style={styles.addAddressIcon}>
                                        <Feather name="plus" size={14} color={COLORS.primary} />
                                    </View>
                                    <Text style={styles.addAddressText}>
                                        إضافة عنوان جديد
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Order Summary */}
                    <Animated.View 
                        style={[
                            styles.section,
                            { 
                                opacity: fadeAnim, 
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>
                            ملخص الطلب
                        </Text>
                        {CART_ITEMS.map((item) => {
                            const itemPrice = item.discount 
                                ? Math.round(item.price * (1 - item.discount / 100)) 
                                : item.price;
                            return (
                                <View key={item.id} style={styles.orderItem}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.orderItemImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.orderItemDetails}>
                                        <Text style={styles.orderItemName} numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.orderItemQuantity}>
                                            {item.quantity} × {itemPrice} ر.س
                                        </Text>
                                    </View>
                                    <Text style={styles.orderItemPrice}>
                                        {itemPrice * item.quantity} ر.س
                                    </Text>
                                </View>
                            );
                        })}
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Delivery Time */}
                    <Animated.View 
                        style={[
                            styles.section,
                            { 
                                opacity: fadeAnim, 
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>
                            موعد التوصيل
                        </Text>
                        <View style={styles.deliveryTimesContainer}>
                            {DELIVERY_TIMES.map((time) => (
                                <TouchableOpacity
                                    key={time.id}
                                    onPress={() => time.available && setSelectedTime(time.id)}
                                    disabled={!time.available}
                                    style={[
                                        styles.deliveryTimeButton,
                                        selectedTime === time.id
                                            ? styles.deliveryTimeButtonSelected
                                            : time.available
                                            ? styles.deliveryTimeButtonAvailable
                                            : styles.deliveryTimeButtonUnavailable
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.deliveryTimeLabel,
                                            selectedTime === time.id
                                                ? styles.deliveryTimeLabelSelected
                                                : time.available
                                                ? styles.deliveryTimeLabelAvailable
                                                : styles.deliveryTimeLabelUnavailable
                                        ]}
                                    >
                                        {time.label}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.deliveryTimeText,
                                            selectedTime === time.id
                                                ? styles.deliveryTimeTextSelected
                                                : time.available
                                                ? styles.deliveryTimeTextAvailable
                                                : styles.deliveryTimeTextUnavailable
                                        ]}
                                    >
                                        {time.time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Promo Code */}
                    <Animated.View 
                        style={[
                            styles.section,
                            { 
                                opacity: fadeAnim, 
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>
                            كود الخصم
                        </Text>
                        <View style={styles.promoContainer}>
                            <TextInput
                                style={styles.promoInput}
                                placeholder="أدخل كود الخصم"
                                placeholderTextColor="#94a3b8"
                                value={promoCode}
                                onChangeText={setPromoCode}
                                editable={!promoApplied}
                            />
                            <TouchableOpacity
                                onPress={handleApplyPromo}
                                disabled={promoApplied || !promoCode}
                                style={[
                                    styles.promoButton,
                                    promoApplied
                                        ? styles.promoButtonApplied
                                        : promoCode
                                        ? styles.promoButtonActive
                                        : styles.promoButtonDisabled
                                ]}
                            >
                                <Text style={styles.promoButtonText}>
                                    {promoApplied ? '✓ تم' : 'تطبيق'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {promoApplied && (
                            <Text style={styles.promoSuccessText}>
                                تم تطبيق خصم 10%
                            </Text>
                        )}
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Order Notes */}
                    <Animated.View 
                        style={[
                            styles.section,
                            { 
                                opacity: fadeAnim, 
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>
                            ملاحظات الطلب
                        </Text>
                        <TextInput
                            style={styles.notesInput}
                            placeholder="أضف ملاحظات للطلب (اختياري)"
                            placeholderTextColor="#94a3b8"
                            value={notes}
                            onChangeText={setNotes}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Price Breakdown */}
                    <Animated.View 
                        style={[
                            styles.section,
                            { 
                                opacity: fadeAnim, 
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>
                            تفاصيل السعر
                        </Text>
                        
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>المجموع الفرعي</Text>
                            <Text style={styles.priceValue}>{subtotal} ر.س</Text>
                        </View>
                        
                        {promoApplied && (
                            <View style={styles.priceRow}>
                                <Text style={styles.priceDiscountLabel}>خصم الكود</Text>
                                <Text style={styles.priceDiscountValue}>-{promoDiscount} ر.س</Text>
                            </View>
                        )}
                        
                        <View style={[styles.priceRow, { marginBottom: 12 }]}>
                            <Text style={styles.priceLabel}>الشحن</Text>
                            <Text style={styles.priceValue}>
                                {shipping === 0 ? 'مجاني' : `${shipping} ر.س`}
                            </Text>
                        </View>
                        
                        <View style={styles.priceDivider} />
                        
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>الإجمالي</Text>
                            <Text style={styles.totalValue}>
                                {total} ر.س
                            </Text>
                        </View>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>

            {/* Bottom - Swipe to Confirm */}
            <SafeAreaView edges={['bottom']} style={styles.bottomContainer}>
                <View style={styles.bottomContent}>
                    <SwipeToConfirm
                        onConfirm={handleConfirmOrder}
                        label="اسحب لتأكيد الطلب"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
