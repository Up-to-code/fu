// File: src/screens/shared/components/ServiceCard.tsx
// Purpose: Service provider card component

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { ServiceCardProps } from '../types/card';
import { getStyles } from '../StyleSheets/ServiceCard.styles';

const ServiceCardComponent: React.FC<ServiceCardProps> = ({
    provider,
    onPress,
    onFavorite,
    isFavorite = false,
}) => {
    const { isRTL } = useRTL();
    const { getSize } = useResponsive();
    const styles = getStyles(isRTL, getSize);
    
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.content}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: provider.avatar }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    {provider.verified && (
                        <View style={styles.verifiedBadge}>
                            <Feather name="check-circle" size={16} color="#3b82f6" />
                        </View>
                    )}
                </View>

                {/* Info */}
                <View style={styles.info}>
                    <View style={styles.header}>
                        <View style={styles.nameSection}>
                            <Text style={styles.name}>{provider.name}</Text>
                            <Text style={styles.category}>
                                {provider.category} • {provider.location}
                            </Text>
                        </View>
                        {onFavorite && (
                            <TouchableOpacity
                                onPress={onFavorite}
                                style={styles.favoriteButton}
                            >
                                <Feather
                                    name="heart"
                                    size={18}
                                    color={isFavorite ? '#EF4444' : '#94a3b8'}
                                    fill={isFavorite ? '#EF4444' : 'none'}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.ratingRow}>
                            <Feather name="star" size={14} color="#F59E0B" fill="#F59E0B" />
                            <Text style={styles.ratingText}>{provider.rating}</Text>
                            <Text style={styles.reviewCount}>({provider.reviews})</Text>
                        </View>
                        <Text style={styles.price}>{provider.priceLabel}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Memoize ServiceCard to prevent unnecessary re-renders in lists
export const ServiceCard = React.memo(ServiceCardComponent, (prevProps, nextProps) => {
    return (
        prevProps.provider.id === nextProps.provider.id &&
        prevProps.provider.rating === nextProps.provider.rating &&
        prevProps.provider.reviews === nextProps.provider.reviews &&
        prevProps.isFavorite === nextProps.isFavorite &&
        prevProps.onPress === nextProps.onPress &&
        prevProps.onFavorite === nextProps.onFavorite
    );
});
