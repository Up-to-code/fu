// File: src/screens/shared/components/EmptyCartState.tsx
// Purpose: Specialized empty state for cart

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EmptyCartStateProps } from '../types/ui';
import { styles } from '../StyleSheets/EmptyCartState.styles';

export const EmptyCartState: React.FC<EmptyCartStateProps> = ({
    onBrowseProducts,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name="shopping-cart" size={64} color="#cbd5e1" />
            </View>
            <Text style={styles.title}>السلة فارغة</Text>
            <Text style={styles.description}>
                لم تقم بإضافة أي منتجات للسلة بعد
            </Text>
            {onBrowseProducts && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={onBrowseProducts}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>تصفح المنتجات</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
