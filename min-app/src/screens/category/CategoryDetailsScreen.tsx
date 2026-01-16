// File: src/screens/category/CategoryDetailsScreen.tsx
// Purpose: Category Products Screen

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../shared';
import { FloatingHeader, ProductGrid, IProductCardProps, LoadingSpinner } from '../shared';
import { useResponsive } from '../../hooks/useResponsive';
import { useCategoryProducts } from './_hooks';
import { CategoryDetailsScreenProps } from './types/category';
import { getStyles } from './StyleSheets/CategoryDetailsScreen.styles';

const MOCK_PRODUCTS: Record<string, IProductCardProps[]> = {
    '1': [ // كنب
        { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.8 },
        { id: '2', name: 'كنبة زاوية فاخرة', price: 3499, discount: 15, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.5 },
        { id: '3', name: 'صوفا جلد أصلي', price: 4299, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.9 },
        { id: '14', name: 'أريكة كنب كبيرة', price: 4999, discount: 12, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80', rating: 4.7 },
        { id: '15', name: 'صوفا قماش فاخر', price: 3299, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.6 },
        { id: '16', name: 'كنبة استرخاء', price: 2799, discount: 8, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.4 },
    ],
    '2': [ // أسرة
        { id: '4', name: 'سرير ملكي خشب زان', price: 5999, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.7 },
        { id: '5', name: 'سرير مزدوج مودرن', price: 3999, discount: 10, image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80', rating: 4.6 },
        { id: '17', name: 'سرير مفرد كلاسيكي', price: 2499, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.5 },
        { id: '18', name: 'سرير أطفال', price: 1899, discount: 15, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.8 },
        { id: '19', name: 'سرير مودرن بدرج', price: 4499, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.9 },
    ],
    '3': [ // طاولات
        { id: '6', name: 'طاولة قهوة خشبية', price: 899, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.4 },
        { id: '7', name: 'طاولة طعام رخام', price: 2999, discount: 20, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.8 },
        { id: '20', name: 'طاولة جانبية ذهبية', price: 599, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.3 },
        { id: '21', name: 'طاولة مكتب زجاجية', price: 1299, discount: 10, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.6 },
        { id: '22', name: 'طاولة طعام مستديرة', price: 3499, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.7 },
    ],
    '4': [ // كراسي
        { id: '8', name: 'كرسي مكتب مريح', price: 599, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.3 },
        { id: '9', name: 'كرسي جلد كلاسيكي', price: 1299, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.7 },
        { id: '23', name: 'كرسي استرخاء', price: 899, discount: 12, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.5 },
        { id: '24', name: 'كرسي طعام خشبي', price: 449, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.4 },
        { id: '25', name: 'كرسي مكتب إرجونوميك', price: 1499, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.8 },
    ],
    '5': [ // إضاءة
        { id: '10', name: 'مصباح أرضي ذهبي', price: 450, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.5 },
        { id: '11', name: 'ثريا كريستال', price: 1999, discount: 10, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.9 },
        { id: '26', name: 'مصباح طاولة LED', price: 299, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.3 },
        { id: '27', name: 'إضاءة جدارية مودرن', price: 599, discount: 15, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.6 },
        { id: '28', name: 'مصباح سقفي ذكي', price: 1299, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.7 },
    ],
    '6': [ // ديكور
        { id: '12', name: 'مرآة دائرية ذهبية', price: 399, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.2 },
        { id: '13', name: 'لوحة فنية مودرن', price: 299, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.4 },
        { id: '29', name: 'ساعة حائط كلاسيكية', price: 499, discount: 10, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.5 },
        { id: '30', name: 'مزهرية زجاجية', price: 199, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.3 },
        { id: '31', name: 'سجادة صوف فاخرة', price: 1299, discount: 12, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80', rating: 4.6 },
    ],
};

export default function CategoryDetailsScreen({ id, name, fromSearch, searchQuery }: CategoryDetailsScreenProps) {
    const router = useRouter();
    const { products, isLoading } = useCategoryProducts(id);
    const { getSize } = useResponsive();
    const styles = getStyles(getSize);
    // Fallback to mock data if hook returns empty
    const displayProducts = products.length > 0 ? products : (MOCK_PRODUCTS[id] || []);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleProductPress = (product: IProductCardProps) => {
        const queryParams: Record<string, string> = {};
        if (fromSearch === 'true') {
            queryParams.fromSearch = 'true';
            if (searchQuery) {
                queryParams.searchQuery = searchQuery;
            }
        }
        router.push({
            pathname: `/product/${product.id}`,
            params: queryParams
        });
    };

    const handleBack = () => {
        if (fromSearch === 'true' && searchQuery) {
            router.push({
                pathname: '/search/results',
                params: { q: searchQuery }
            });
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {isLoading ? (
                    <LoadingSpinner message="جاري التحميل..." />
                ) : displayProducts.length > 0 ? (
                    <ProductGrid
                        products={displayProducts}
                        onProductPress={handleProductPress}
                    />
                ) : (
                    <EmptyState
                        icon="package"
                        title="لا توجد منتجات"
                        description="لم يتم إضافة منتجات لهذا التصنيف بعد"
                        actionLabel="تصفح التصنيفات"
                        onAction={() => router.push('/(tabs)/categories')}
                    />
                )}
            </ScrollView>

            {/* Floating Header */}
            <FloatingHeader
                showBack
                showFavorite
                onBack={handleBack}
                onFavorite={() => setIsFavorite(!isFavorite)}
                isFavorite={isFavorite}
            />
        </SafeAreaView>
    );
}
