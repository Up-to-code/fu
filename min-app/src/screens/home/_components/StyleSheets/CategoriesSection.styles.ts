// File: src/screens/home/_components/StyleSheets/CategoriesSection.styles.ts
// Purpose: Styles for CategoriesSection component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        marginBottom: getSize(24, 28, 32, 40, 48),
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 22, 24),
        color: '#1e293b',
        marginBottom: getSize(12, 14, 16, 20, 24),
        textAlign: (isRTL ? 'right' : 'left') as const,
    },
    grid: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: getSize(16, 18, 20, 24, 28),
    },
    categoryCard: {
        alignItems: 'center',
    },
    categoryImage: {
        width: getSize(72, 76, 80, 88, 96),
        height: getSize(72, 76, 80, 88, 96),
        borderRadius: getSize(36, 38, 40, 44, 48),
        overflow: 'hidden',
        marginBottom: getSize(6, 7, 8, 10, 12),
        backgroundColor: '#f1f5f9',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    categoryImageContent: {
        width: '100%',
        height: '100%',
    },
    categoryName: {
        fontFamily: 'Cairo_500Medium',
        color: '#475569',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        textAlign: 'center',
        width: getSize(72, 76, 80, 88, 96),
    },
});
