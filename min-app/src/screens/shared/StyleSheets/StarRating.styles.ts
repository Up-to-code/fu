// File: src/screens/shared/StyleSheets/StarRating.styles.ts
// Purpose: Styles for StarRating component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (size: 'sm' | 'md' | 'lg', isRTL: boolean = true, getSize: GetSizeFunction) => {
    const starSize = size === 'sm' 
        ? getSize(12, 13, 14, 14, 16)
        : size === 'lg'
            ? getSize(18, 20, 22, 22, 24)
            : getSize(14, 16, 18, 18, 20);
    const textSize = size === 'sm'
        ? getSize(11, 12, 13, 14, 15)
        : size === 'lg'
            ? getSize(14, 15, 16, 18, 20)
            : getSize(12, 13, 14, 16, 18);

    return StyleSheet.create({
        container: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 4,
        },
        ratingText: {
            fontFamily: 'Cairo_700Bold',
            color: '#334155',
            fontSize: textSize,
            ...(isRTL ? { marginRight: 4 } : { marginLeft: 4 }),
        },
        reviewCount: {
            fontFamily: 'Cairo_500Medium',
            color: '#94a3b8',
            fontSize: textSize,
        },
        starSize,
    });
};
