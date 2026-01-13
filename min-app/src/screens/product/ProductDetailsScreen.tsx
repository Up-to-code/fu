// File: src/screens/product/ProductDetailsScreen.tsx
// Purpose: Complete Product Details Screen with Reviews and Similar Products

import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Product, Review } from '../../components/shared';
import { ActionButton, BottomBar, FloatingHeader, PriceTable, ReviewCard, StarRating } from '../../components/shared';
import { ProductCard } from './_components';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

// Responsive breakpoints
const isSmall = width < 375;
const isMedium = width >= 375 && width < 428;
const isLarge = width >= 428 && width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

const getSize = (small: number, medium: number, large: number, tablet: number, desktop: number) => {
    if (isDesktop) return desktop;
    if (isTablet) return tablet;
    if (isLarge) return large;
    if (isMedium) return medium;
    return small;
};

const padding = getSize(16, 20, 24, 32, 48);
const imageHeight = getSize(300, 350, 400, 450, 500);
const maxWidth = getSize(width, width, width, 700, 800);

// Mock Data
const MOCK_PRODUCT = {
    id: '1',
    name: 'صوفا مودرن مريحة',
    description: 'صوفا عالية الجودة مصممة لتوفير أقصى درجات الراحة والأناقة لغرفة المعيشة.',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
        'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=800&q=80',
    ],
    colors: [
        { id: 1, name: 'رمادي', code: '#808080' },
        { id: 2, name: 'كحلي', code: '#000080' },
        { id: 3, name: 'بيج', code: '#F5F5DC' },
    ],
    sizes: [
        { id: 1, name: 'صغير', available: true },
        { id: 2, name: 'متوسط', available: true },
        { id: 3, name: 'كبير', available: true },
    ],
    features: [
        { icon: 'checkmark-circle', text: 'ضمان سنتين', color: '#22c55e' },
        { icon: 'car', text: 'شحن مجاني', color: '#3b82f6' },
        { icon: 'refresh-circle', text: 'إرجاع 14 يوم', color: '#f59e0b' },
        { icon: 'shield-checkmark', text: 'دفع آمن', color: '#8b5cf6' },
    ],
};

const MOCK_REVIEWS: Review[] = [
    {
        id: '1',
        userName: 'محمد أحمد',
        rating: 5,
        date: 'منذ 3 أيام',
        comment: 'صوفا رائعة جداً! الجودة ممتازة والتوصيل كان سريع. أنصح بها بشدة.',
        helpful: 12,
    },
    {
        id: '2',
        userName: 'سارة محمود',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        rating: 4,
        date: 'منذ أسبوع',
        comment: 'منتج جيد جداً، الألوان مطابقة للصور. الحجم مناسب لغرفة المعيشة.',
        helpful: 8,
    },
    {
        id: '3',
        userName: 'أحمد علي',
        rating: 5,
        date: 'منذ أسبوعين',
        comment: 'أفضل صوفا اشتريتها! مريحة جداً وتصميمها عصري.',
    },
];

const SIMILAR_PRODUCTS: Product[] = [
    { id: '2', name: 'كنبة زاوية فاخرة', price: 3499, discount: 15, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.5 },
    { id: '3', name: 'صوفا جلد أصلي', price: 4299, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.9 },
    { id: '4', name: 'أريكة كلاسيكية', price: 1899, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.3 },
];

export default function ProductDetailsScreen({ id }: { id: string }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const product = MOCK_PRODUCT;
    const subtotal = product.price * quantity;
    const shipping = subtotal >= 2000 ? 0 : 50;
    const total = subtotal + shipping;

    const handleShare = async () => {
        try {
            await Share.share({ message: `${product.name} - ${product.price} ر.س` });
        } catch (error) {
            console.error(error);
        }
    };

    // Section Header Component
    const SectionHeader = ({ title, actionLabel, onAction }: { title: string; actionLabel?: string; onAction?: () => void }) => (
        <View className="flex-row-reverse justify-between items-center mb-4">
            <Text
                className="font-cairo-bold text-slate-800"
                style={{ fontSize: getSize(14, 15, 16, 18, 20) }}
            >
                {title}
            </Text>
            {actionLabel && onAction && (
                <TouchableOpacity onPress={onAction}>
                    <Text className="font-cairo-medium text-primary" style={{ fontSize: getSize(12, 13, 14, 15, 16) }}>
                        {actionLabel}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 140,
                    maxWidth: maxWidth,
                    alignSelf: 'center',
                    width: '100%'
                }}
            >
                {/* Image Gallery */}
                <TouchableOpacity
                    style={{ height: imageHeight }}
                    className="bg-slate-100 relative"
                    activeOpacity={0.95}
                    onPress={() => router.push({
                        pathname: '/product/fullscreen',
                        params: {
                            images: JSON.stringify(product.images),
                            index: selectedImage.toString()
                        }
                    })}
                >
                    <Image
                        source={{ uri: product.images[selectedImage] }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />

                    {/* Expand Icon */}
                    <View
                        className="absolute bottom-12 right-4 w-10 h-10 bg-black/40 rounded-full items-center justify-center z-20"
                    >
                        <Feather name="maximize-2" size={18} color="white" />
                    </View>

                    {/* Thumbnails */}
                    <View className="absolute bottom-12 left-0 right-0 flex-row justify-center gap-2">
                        {product.images.map((img, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(idx);
                                }}
                                style={{
                                    width: getSize(48, 56, 64, 72, 80),
                                    height: getSize(48, 56, 64, 72, 80),
                                }}
                                className={`rounded-xl overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-white'
                                    }`}
                            >
                                <Image source={{ uri: img }} className="w-full h-full" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>

                {/* Content */}
                <View
                    className="-mt-6 bg-white rounded-t-3xl"
                    style={{ paddingHorizontal: padding, paddingTop: getSize(20, 24, 28, 32, 40) }}
                >
                    <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-6" />

                    {/* Title & Rating */}
                    <View className="mb-4">
                        <Text
                            className="font-cairo-bold text-slate-800 text-right mb-2"
                            style={{ fontSize: getSize(18, 20, 22, 26, 30) }}
                        >
                            {product.name}
                        </Text>
                        <StarRating
                            rating={product.rating}
                            reviews={product.reviews}
                            size={isTablet || isDesktop ? 'lg' : 'md'}
                        />
                    </View>

                    {/* Discount Label */}
                    {product.discount && (
                        <View className="flex-row-reverse items-center gap-2 mb-3">
                            <View className="bg-red-100 px-3 py-1.5 rounded-full">
                                <Text
                                    className="font-cairo-bold text-red-600"
                                    style={{ fontSize: getSize(12, 13, 14, 15, 16) }}
                                >
                                    خصم {product.discount}% | وفر {Math.round(product.originalPrice! - product.price)} ر.س
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Price */}
                    <View className="flex-row-reverse items-baseline gap-3 mb-6">
                        <Text
                            className="font-cairo-bold"
                            style={{ fontSize: getSize(24, 28, 32, 36, 42), color: COLORS.primary }}
                        >
                            {product.price} ر.س
                        </Text>
                        {product.originalPrice && (
                            <Text
                                className="font-cairo-medium text-slate-400 line-through"
                                style={{ fontSize: getSize(14, 15, 16, 18, 20) }}
                            >
                                {product.originalPrice} ر.س
                            </Text>
                        )}
                    </View>

                    {/* Colors */}
                    <View className="mb-6">
                        <SectionHeader title="اللون" />
                        <View className="flex-row-reverse flex-wrap gap-3">
                            {product.colors.map((color, idx) => (
                                <TouchableOpacity
                                    key={color.id}
                                    onPress={() => setSelectedColor(idx)}
                                    style={{
                                        width: getSize(40, 44, 48, 56, 64),
                                        height: getSize(40, 44, 48, 56, 64),
                                    }}
                                    className={`rounded-full items-center justify-center border-2 ${selectedColor === idx ? 'border-primary' : 'border-slate-200'
                                        }`}
                                >
                                    <View
                                        style={{
                                            backgroundColor: color.code,
                                            width: getSize(28, 32, 36, 44, 52),
                                            height: getSize(28, 32, 36, 44, 52),
                                        }}
                                        className="rounded-full"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Sizes */}
                    <View className="mb-6">
                        <SectionHeader title="المقاس" />
                        <View className="flex-row-reverse flex-wrap gap-3">
                            {product.sizes.map((size, idx) => (
                                <TouchableOpacity
                                    key={size.id}
                                    onPress={() => size.available && setSelectedSize(idx)}
                                    disabled={!size.available}
                                    style={{
                                        paddingHorizontal: getSize(16, 20, 24, 28, 32),
                                        paddingVertical: getSize(10, 12, 14, 16, 18),
                                    }}
                                    className={`rounded-xl border ${selectedSize === idx
                                        ? 'bg-primary border-primary'
                                        : size.available
                                            ? 'bg-white border-slate-200'
                                            : 'bg-slate-100 border-slate-100'
                                        }`}
                                >
                                    <Text
                                        className={`font-cairo-bold ${selectedSize === idx ? 'text-white' : size.available ? 'text-slate-700' : 'text-slate-400'
                                            }`}
                                        style={{ fontSize: getSize(13, 14, 15, 16, 18) }}
                                    >
                                        {size.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Quantity */}
                    <View className="mb-6">
                        <SectionHeader title="الكمية" />
                        <View className="flex-row-reverse items-center gap-4">
                            <View className="flex-row items-center bg-slate-100 rounded-xl">
                                <TouchableOpacity
                                    onPress={() => setQuantity(q => Math.max(1, q - 1))}
                                    style={{
                                        width: getSize(40, 44, 48, 52, 56),
                                        height: getSize(40, 44, 48, 52, 56),
                                    }}
                                    className="items-center justify-center"
                                >
                                    <Feather name="minus" size={getSize(16, 18, 20, 22, 24)} color={COLORS.text} />
                                </TouchableOpacity>
                                <Text
                                    className="font-cairo-bold text-slate-800 px-4"
                                    style={{ fontSize: getSize(16, 18, 20, 22, 24) }}
                                >
                                    {quantity}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setQuantity(q => q + 1)}
                                    style={{
                                        width: getSize(40, 44, 48, 52, 56),
                                        height: getSize(40, 44, 48, 52, 56),
                                    }}
                                    className="items-center justify-center"
                                >
                                    <Feather name="plus" size={getSize(16, 18, 20, 22, 24)} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>
                            <Text
                                className="font-cairo-medium text-slate-500"
                                style={{ fontSize: getSize(12, 13, 14, 15, 16) }}
                            >
                                {product.stock} متوفر
                            </Text>
                        </View>
                    </View>

                    {/* Features */}
                    <View className="flex-row flex-wrap gap-3 mb-6">
                        {product.features.map((feature, idx) => (
                            <View
                                key={idx}
                                className="flex-row-reverse items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl"
                            >
                                <Ionicons name={feature.icon as any} size={getSize(18, 20, 22, 24, 26)} color={feature.color} />
                                <Text
                                    className="font-cairo-bold text-slate-700"
                                    style={{ fontSize: getSize(12, 13, 14, 15, 16) }}
                                >
                                    {feature.text}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Description */}
                    <View className="mb-6">
                        <SectionHeader title="الوصف" />
                        <Text
                            className="font-cairo-medium text-slate-500 text-right leading-6"
                            style={{ fontSize: getSize(13, 14, 15, 16, 18) }}
                        >
                            {product.description}
                        </Text>
                    </View>

                    {/* Price Table */}
                    <View className="mb-8">
                        <SectionHeader title="ملخص الطلب" />
                        <PriceTable
                            items={[
                                { label: 'السعر', value: product.price * quantity },
                                { label: 'الخصم', value: Math.round(product.price * quantity * (product.discount / 100)), isDiscount: true },
                                { label: 'الشحن', value: shipping, isFree: shipping === 0 },
                            ]}
                            total={total - Math.round(product.price * quantity * (product.discount / 100))}
                        />
                    </View>

                    {/* Reviews Section */}
                    <View className="mb-8">
                        <SectionHeader
                            title={`التقييمات (${MOCK_REVIEWS.length})`}
                            actionLabel="عرض الكل"
                            onAction={() => console.log('View all reviews')}
                        />
                        {MOCK_REVIEWS.slice(0, 2).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </View>

                    {/* Similar Products Section */}
                    <View className="mb-6">
                        <SectionHeader
                            title="منتجات مشابهة"
                            actionLabel="عرض المزيد"
                            onAction={() => router.push('/(tabs)/categories')}
                        />
                    </View>
                </View>

                {/* Similar Products Horizontal Scroll */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: padding }}
                    style={{ transform: [{ scaleX: -1 }] }}
                >
                    {SIMILAR_PRODUCTS.map((item) => (
                        <View key={item.id} style={{ transform: [{ scaleX: -1 }], marginLeft: 12 }}>
                            <ProductCard
                                product={item}
                                variant="horizontal"
                                onPress={() => router.push(`/product/${item.id}`)}
                            />
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>

            {/* Floating Header */}
            <FloatingHeader
                showBack
                showShare
                showFavorite
                onShare={handleShare}
                onFavorite={() => setIsFavorite(!isFavorite)}
                isFavorite={isFavorite}
            />

            {/* Bottom Bar - Add to Cart */}
            <BottomBar>
                <ActionButton
                    label="إضافة للسلة"
                    icon="shopping-cart"
                    onPress={() => console.log('Add to cart', { quantity, color: selectedColor, size: selectedSize })}
                />
            </BottomBar>
        </SafeAreaView>
    );
}
