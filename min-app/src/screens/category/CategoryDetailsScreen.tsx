// File: src/screens/category/CategoryDetailsScreen.tsx
// Purpose: Category Products Screen

import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { EmptyState } from '../../components/shared';
import { Header, ProductGrid, IProductCardProps, LoadingSpinner } from '../shared';
import { useCategoryProducts } from './_hooks';
import { CategoryDetailsScreenProps } from './types/category';
import { styles } from './StyleSheets/CategoryDetailsScreen.styles';

const MOCK_PRODUCTS: Record<string, IProductCardProps[]> = {
    '1': [ // كنب
        { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.8 },
        { id: '2', name: 'كنبة زاوية فاخرة', price: 3499, discount: 15, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.5 },
        { id: '3', name: 'صوفا جلد أصلي', price: 4299, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.9 },
    ],
    '2': [ // أسرة
        { id: '4', name: 'سرير ملكي خشب زان', price: 5999, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.7 },
        { id: '5', name: 'سرير مزدوج مودرن', price: 3999, discount: 10, image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80', rating: 4.6 },
    ],
    '3': [ // طاولات
        { id: '6', name: 'طاولة قهوة خشبية', price: 899, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.4 },
        { id: '7', name: 'طاولة طعام رخام', price: 2999, discount: 20, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.8 },
    ],
    '4': [ // كراسي
        { id: '8', name: 'كرسي مكتب مريح', price: 599, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.3 },
        { id: '9', name: 'كرسي جلد كلاسيكي', price: 1299, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.7 },
    ],
    '5': [ // إضاءة
        { id: '10', name: 'مصباح أرضي ذهبي', price: 450, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.5 },
        { id: '11', name: 'ثريا كريستال', price: 1999, discount: 10, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.9 },
    ],
    '6': [ // ديكور
        { id: '12', name: 'مرآة دائرية ذهبية', price: 399, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.2 },
        { id: '13', name: 'لوحة فنية مودرن', price: 299, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.4 },
    ],
};

export default function CategoryDetailsScreen({ id, name }: CategoryDetailsScreenProps) {
    const router = useRouter();
    const { products, isLoading } = useCategoryProducts(id);
    // Fallback to mock data if hook returns empty
    const displayProducts = products.length > 0 ? products : (MOCK_PRODUCTS[id] || []);

    return (
        <View style={styles.container}>
            <Header
                title={name || 'التصنيف'}
                rightAction={
                    <View>
                        <Text style={{ fontFamily: 'Cairo_500Medium', fontSize: 13, color: '#64748b' }}>
                            {displayProducts.length} منتج
                        </Text>
                    </View>
                }
                showBack
            />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
            >
                {isLoading ? (
                    <LoadingSpinner message="جاري التحميل..." />
                ) : displayProducts.length > 0 ? (
                    <ProductGrid
                        products={displayProducts}
                        onProductPress={(product) => router.push(`/product/${product.id}`)}
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
        </View>
    );
}
