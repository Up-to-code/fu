// File: src/screens/product/ProductDetailsScreen.tsx
// Purpose: Complete Product Details Screen with Reviews and Similar Products

import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton, BottomBar, FloatingHeader, PriceTable, StarRating } from '../../components/shared';
import { ReviewCard, Review } from '../shared';
import { ProductCard, IProductCardProps } from '../shared';
import { useProductDetails, useProductReviews, useSimilarProducts } from './_hooks';
import { COLORS } from '../../constants/theme';
import { SectionHeaderProps } from './types/product';
import { styles, padding, imageHeight, maxWidth, getSize } from './StyleSheets/ProductDetailsScreen.styles';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

const SIMILAR_PRODUCTS: IProductCardProps[] = [
    { id: '2', name: 'كنبة زاوية فاخرة', price: 3499, discount: 15, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.5 },
    { id: '3', name: 'صوفا جلد أصلي', price: 4299, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.9 },
    { id: '4', name: 'أريكة كلاسيكية', price: 1899, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.3 },
];

export default function ProductDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { product: hookProduct, isLoading: productLoading } = useProductDetails(id || '1');
    const { reviews: hookReviews, isLoading: reviewsLoading, addReview } = useProductReviews(id || '1');
    const { similarProducts: hookSimilar, isLoading: similarLoading } = useSimilarProducts(id || '1', undefined);
    
    // Fallback to mock data if hooks return empty
    const product = hookProduct || MOCK_PRODUCT;
    const reviews = hookReviews.length > 0 ? hookReviews : MOCK_REVIEWS;
    const similarProducts = hookSimilar.length > 0 ? hookSimilar : SIMILAR_PRODUCTS;
    
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

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
    const SectionHeader: React.FC<SectionHeaderProps> = ({ title, actionLabel, onAction }) => (
        <View style={styles.sectionHeader}>
            <Text
                style={[styles.sectionTitle, { fontSize: getSize(14, 15, 16, 18, 20) }]}
            >
                {title}
            </Text>
            {actionLabel && onAction && (
                <TouchableOpacity onPress={onAction} style={styles.sectionAction}>
                    <Text style={[styles.sectionActionText, { fontSize: getSize(12, 13, 14, 15, 16) }]}>
                        {actionLabel}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Image Gallery */}
                <TouchableOpacity
                    style={[styles.imageContainer, { height: imageHeight }]}
                    activeOpacity={0.95}
                    onPress={() => product.images && product.images.length > 0 && router.push({
                        pathname: '/product/fullscreen',
                        params: {
                            images: JSON.stringify(product.images),
                            index: selectedImage.toString()
                        }
                    })}
                >
                    {product.images && product.images.length > 0 && (
                        <Image
                            source={{ uri: product.images[selectedImage] }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                    )}

                    {/* Expand Icon */}
                    <View style={styles.expandIcon}>
                        <Feather name="maximize-2" size={18} color="white" />
                    </View>

                    {/* Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <View style={styles.thumbnailsContainer}>
                            {product.images.map((img, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(idx);
                                    }}
                                    style={[
                                        styles.thumbnail,
                                        {
                                            width: getSize(48, 56, 64, 72, 80),
                                            height: getSize(48, 56, 64, 72, 80),
                                        },
                                        selectedImage === idx ? styles.thumbnailSelected : styles.thumbnailUnselected
                                    ]}
                                >
                                    <Image source={{ uri: img }} style={styles.thumbnailImage} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </TouchableOpacity>

                {/* Content */}
                <View
                    style={[
                        styles.contentContainer,
                        { paddingTop: getSize(20, 24, 28, 32, 40) }
                    ]}
                >
                    <View style={styles.dragIndicator} />

                    {/* Title & Rating */}
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, { fontSize: getSize(18, 20, 22, 26, 30) }]}
                        >
                            {product.name}
                        </Text>
                        <StarRating
                            rating={product.rating}
                            reviews={product.reviews}
                            size={(width >= 768 || width >= 1024) ? 'lg' : 'md'}
                        />
                    </View>

                    {/* Discount Label */}
                    {product.discount && (
                        <View style={styles.discountContainer}>
                            <View style={styles.discountBadge}>
                                <Text
                                    style={[styles.discountText, { fontSize: getSize(12, 13, 14, 15, 16) }]}
                                >
                                    خصم {product.discount}% | وفر {Math.round(product.originalPrice! - product.price)} ر.س
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Price */}
                    <View style={styles.priceContainer}>
                        <Text
                            style={[styles.price, { fontSize: getSize(24, 28, 32, 36, 42) }]}
                        >
                            {product.price} ر.س
                        </Text>
                        {product.originalPrice && (
                            <Text
                                style={[styles.originalPrice, { fontSize: getSize(14, 15, 16, 18, 20) }]}
                            >
                                {product.originalPrice} ر.س
                            </Text>
                        )}
                    </View>

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                        <View style={styles.sectionContainer}>
                            <SectionHeader title="اللون" />
                            <View style={styles.colorsContainer}>
                                {product.colors.map((color, idx) => (
                                    <TouchableOpacity
                                        key={color.id}
                                        onPress={() => setSelectedColor(idx)}
                                        style={[
                                            {
                                                width: getSize(40, 44, 48, 56, 64),
                                                height: getSize(40, 44, 48, 56, 64),
                                            },
                                            selectedColor === idx ? styles.colorButtonSelected : styles.colorButtonUnselected,
                                            styles.colorButton
                                        ]}
                                    >
                                        <View
                                            style={[
                                                {
                                                    backgroundColor: color.code,
                                                    width: getSize(28, 32, 36, 44, 52),
                                                    height: getSize(28, 32, 36, 44, 52),
                                                },
                                                styles.colorCircle
                                            ]}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                        <View style={styles.sectionContainer}>
                            <SectionHeader title="المقاس" />
                            <View style={styles.sizesContainer}>
                                {product.sizes.map((size, idx) => (
                                    <TouchableOpacity
                                        key={size.id}
                                        onPress={() => size.available && setSelectedSize(idx)}
                                        disabled={!size.available}
                                        style={[
                                            {
                                                paddingHorizontal: getSize(16, 20, 24, 28, 32),
                                                paddingVertical: getSize(10, 12, 14, 16, 18),
                                            },
                                            selectedSize === idx
                                                ? styles.sizeButtonSelected
                                                : size.available
                                                    ? styles.sizeButtonAvailable
                                                    : styles.sizeButtonUnavailable,
                                            styles.sizeButton
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.sizeText,
                                                selectedSize === idx
                                                    ? styles.sizeTextSelected
                                                    : size.available
                                                        ? styles.sizeTextAvailable
                                                        : styles.sizeTextUnavailable,
                                                { fontSize: getSize(13, 14, 15, 16, 18) }
                                            ]}
                                        >
                                            {size.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Quantity */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="الكمية" />
                        <View style={styles.quantityContainer}>
                            <View style={styles.quantityControls}>
                                <TouchableOpacity
                                    onPress={() => setQuantity(q => Math.max(1, q - 1))}
                                    style={[
                                        {
                                            width: getSize(40, 44, 48, 52, 56),
                                            height: getSize(40, 44, 48, 52, 56),
                                        },
                                        styles.quantityButton
                                    ]}
                                >
                                    <Feather name="minus" size={getSize(16, 18, 20, 22, 24)} color={COLORS.text} />
                                </TouchableOpacity>
                                <Text
                                    style={[styles.quantityText, { fontSize: getSize(16, 18, 20, 22, 24) }]}
                                >
                                    {quantity}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setQuantity(q => q + 1)}
                                    style={[
                                        {
                                            width: getSize(40, 44, 48, 52, 56),
                                            height: getSize(40, 44, 48, 52, 56),
                                        },
                                        styles.quantityButton
                                    ]}
                                >
                                    <Feather name="plus" size={getSize(16, 18, 20, 22, 24)} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={[styles.stockText, { fontSize: getSize(12, 13, 14, 15, 16) }]}
                            >
                                {product.stock} متوفر
                            </Text>
                        </View>
                    </View>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <View style={[styles.featuresContainer, { marginBottom: 24 }]}>
                            {product.features.map((feature, idx) => (
                                <View
                                    key={idx}
                                    style={styles.featureBadge}
                                >
                                    <Ionicons name={feature.icon as any} size={getSize(18, 20, 22, 24, 26)} color={feature.color} />
                                    <Text
                                        style={[styles.featureText, { fontSize: getSize(12, 13, 14, 15, 16) }]}
                                    >
                                        {feature.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Description */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="الوصف" />
                        <Text
                            style={[styles.descriptionText, { fontSize: getSize(13, 14, 15, 16, 18) }]}
                        >
                            {product.description}
                        </Text>
                    </View>

                    {/* Price Table */}
                    <View style={[styles.sectionContainer, { marginBottom: 32 }]}>
                        <SectionHeader title="ملخص الطلب" />
                        <PriceTable
                            items={[
                                { label: 'السعر', value: product.price * quantity },
                                ...(product.discount ? [{ label: 'الخصم', value: Math.round(product.price * quantity * (product.discount / 100)), isDiscount: true }] : []),
                                { label: 'الشحن', value: shipping, isFree: shipping === 0 },
                            ]}
                            total={total - (product.discount ? Math.round(product.price * quantity * (product.discount / 100)) : 0)}
                        />
                    </View>

                    {/* Reviews Section */}
                    <View style={[styles.sectionContainer, { marginBottom: 32 }]}>
                        <SectionHeader
                            title={`التقييمات (${reviews.length})`}
                            actionLabel="عرض الكل"
                            onAction={() => console.log('View all reviews')}
                        />
                        {reviews.slice(0, 2).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </View>

                    {/* Similar Products Section */}
                    <View style={styles.sectionContainer}>
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
                    style={styles.similarProductsScroll}
                >
                    {similarProducts.map((item) => (
                        <View key={item.id} style={styles.similarProductItem}>
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
