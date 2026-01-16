// File: src/screens/services/StyleSheets/ServicesScreen.styles.ts
// Purpose: Styles for ServicesScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (
    isRTL: boolean,
    getSize: GetSizeFunction,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number },
    iconSize: { sm: number; md: number; lg: number; xl: number }
) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f8fafc',
        },
        safeArea: {
            flex: 1,
            backgroundColor: 'white',
        },
        header: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: getSize(14, 15, 16, 24, 32),
            paddingVertical: getSize(10, 11, 12, 16, 20),
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        headerTitle: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(16, 17, 18, 22, 26),
            color: '#1e293b',
        },
        searchContainer: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: getSize(8, 10, 12, 16, 20),
            paddingHorizontal: getSize(14, 15, 16, 24, 32),
            paddingTop: getSize(10, 11, 12, 16, 20),
            paddingBottom: getSize(10, 11, 12, 16, 20),
        },
        searchInputContainer: {
            flex: 1,
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            borderRadius: getSize(8, 10, 12, 14, 16),
            paddingHorizontal: getSize(12, 14, 16, 20, 24),
            paddingVertical: getSize(10, 12, 14, 16, 20),
        },
        searchInput: {
            flex: 1,
            textAlign: (isRTL ? 'right' : 'left') as const,
            fontFamily: 'Cairo_500Medium',
            color: '#1e293b',
            marginRight: isRTL ? getSize(8, 10, 12, 16, 20) : 0,
            marginLeft: isRTL ? 0 : getSize(8, 10, 12, 16, 20),
            fontSize: getSize(13, 14, 15, 16, 18),
        },
        filterButton: {
            width: getSize(40, 42, 44, 52, 60),
            height: getSize(40, 42, 44, 52, 60),
            backgroundColor: '#f8fafc',
            borderRadius: getSize(8, 10, 12, 14, 16),
            alignItems: 'center',
            justifyContent: 'center',
        },
        typeFiltersContainer: {
            marginBottom: getSize(6, 7, 8, 12, 16),
        },
        typeFilterChip: {
            paddingHorizontal: getSize(14, 15, 16, 20, 24),
            paddingVertical: getSize(6, 7, 8, 10, 12),
            borderRadius: getSize(8, 9, 10, 12, 14),
        },
        typeFilterText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(12, 13, 14, 15, 16),
        },
        listContainer: {
            flex: 1,
        },
        providerItem: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            paddingHorizontal: getSize(14, 15, 16, 24, 32),
            paddingVertical: getSize(12, 13, 14, 18, 22),
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
            backgroundColor: 'white',
        },
        avatarWrapper: {
            position: 'relative',
            marginLeft: isRTL ? getSize(10, 11, 12, 16, 20) : 0,
            marginRight: isRTL ? 0 : getSize(10, 11, 12, 16, 20),
        },
        profileAvatar: {
            width: getSize(50, 53, 56, 72, 88),
            height: getSize(50, 53, 56, 72, 88),
            borderRadius: getSize(25, 26.5, 28, 36, 44),
            backgroundColor: '#f1f5f9',
        },
        verifiedBadge: {
            position: 'absolute',
            bottom: -2,
            right: isRTL ? -2 : undefined,
            left: isRTL ? undefined : -2,
            width: getSize(16, 17, 18, 22, 26),
            height: getSize(16, 17, 18, 22, 26),
            borderRadius: getSize(8, 8.5, 9, 11, 13),
            backgroundColor: '#3b82f6',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'white',
        },
        providerDetails: {
            flex: 1,
        },
        nameRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: getSize(5, 5.5, 6, 8, 10),
        },
        nameContainer: {
            flex: 1,
        },
        providerName: {
            fontFamily: 'Cairo_700Bold',
            color: '#1e293b',
            fontSize: getSize(14, 15, 16, 18, 20),
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: 4,
        },
        categoryRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
        },
        providerCategory: {
            fontFamily: 'Cairo_500Medium',
            color: '#64748b',
            fontSize: getSize(12, 13, 14, 15, 16),
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        categorySeparator: {
            fontFamily: 'Cairo_500Medium',
            color: '#94a3b8',
            fontSize: getSize(12, 13, 14, 15, 16),
        },
        providerLocation: {
            fontFamily: 'Cairo_500Medium',
            color: '#64748b',
            fontSize: getSize(12, 13, 14, 15, 16),
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        bottomRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        ratingPriceRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: getSize(10, 11, 12, 16, 20),
            flex: 1,
        },
        ratingRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 4,
        },
        ratingText: {
            fontFamily: 'Cairo_700Bold',
            color: '#1e293b',
            fontSize: getSize(12, 13, 14, 16, 18),
        },
        reviewCount: {
            fontFamily: 'Cairo_500Medium',
            color: '#94a3b8',
            fontSize: getSize(10, 11, 12, 14, 16),
        },
        price: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(13, 14, 15, 17, 19),
            color: COLORS.primary,
        },
        saveButton: {
            padding: 4,
            marginTop: -2,
        },
        emptyState: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: getSize(60, 70, 80, 100, 120),
        },
        emptyTitle: {
            fontFamily: 'Cairo_700Bold',
            color: '#94a3b8',
            fontSize: fontSize.lg,
            marginTop: getSize(12, 14, 16, 20, 24),
        },
        emptySubtitle: {
            fontFamily: 'Cairo_500Medium',
            color: '#94a3b8',
            fontSize: fontSize.base,
            marginTop: getSize(6, 7, 8, 10, 12),
        },
    });
};
