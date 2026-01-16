// File: src/screens/shared/components/OrderCard.tsx
// Purpose: Order/booking card component

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { OrderCardData, OrderCardProps } from '../types/card';
import { getStyles } from '../StyleSheets/OrderCard.styles';

const OrderCardComponent: React.FC<OrderCardProps> = ({
    order,
    onPress,
}) => {
    const { isRTL } = useRTL();
    const { getSize } = useResponsive();
    const styles = getStyles(isRTL, getSize);
    
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View style={styles.orderNumberSection}>
                    <Text style={styles.orderNumber}>{order.number}</Text>
                    <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: order.statusColors.bg }]}>
                    <Text style={[styles.statusText, { color: order.statusColors.color }]}>
                        {order.statusLabel}
                    </Text>
                </View>
            </View>

            {order.image && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: order.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    {order.itemsCount > 1 && (
                        <View style={styles.itemsCountBadge}>
                            <Text style={styles.itemsCountText}>+{order.itemsCount - 1}</Text>
                        </View>
                    )}
                </View>
            )}

            <View style={styles.footer}>
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>المجموع</Text>
                    <Text style={styles.totalAmount}>
                        {order.total.toLocaleString()} ر.س
                    </Text>
                </View>
                <Feather name="chevron-left" size={20} color="#94a3b8" />
            </View>
        </TouchableOpacity>
    );
};

// Memoize OrderCard to prevent unnecessary re-renders in lists
export const OrderCard = React.memo(OrderCardComponent, (prevProps, nextProps) => {
    return (
        prevProps.order.number === nextProps.order.number &&
        prevProps.order.statusLabel === nextProps.order.statusLabel &&
        prevProps.order.total === nextProps.order.total &&
        prevProps.order.date.getTime() === nextProps.order.date.getTime() &&
        prevProps.onPress === nextProps.onPress
    );
});
