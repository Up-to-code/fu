// File: src/screens/shared/StyleSheets/StarRating.styles.ts
// Purpose: Styles for StarRating component

import { Dimensions, StyleSheet } from 'react-native';
import { getResponsiveValue, isSmallScreen } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const getStyles = (size: 'sm' | 'md' | 'lg') => {
    const starSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;
    const textSize = size === 'sm'
        ? getResponsiveValue(isSmallScreen ? 11 : 12, 14)
        : size === 'lg'
            ? getResponsiveValue(isSmallScreen ? 14 : 16, 18)
            : getResponsiveValue(isSmallScreen ? 12 : 14, 16);

    return StyleSheet.create({
        container: {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 4,
        },
        ratingText: {
            fontFamily: 'Cairo_700Bold',
            color: '#334155',
            fontSize: textSize,
            marginRight: 4,
        },
        reviewCount: {
            fontFamily: 'Cairo_500Medium',
            color: '#94a3b8',
            fontSize: textSize,
        },
        starSize,
    });
};
