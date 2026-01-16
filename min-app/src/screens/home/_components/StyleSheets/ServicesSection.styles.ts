// File: src/screens/home/_components/StyleSheets/ServicesSection.styles.ts
// Purpose: Styles for ServicesSection component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => {
    return StyleSheet.create({
    container: {
        marginBottom: getSize(24, 28, 32, 40, 48),
    },
    header: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        marginBottom: getSize(12, 14, 16, 20, 24),
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 22, 24),
        color: '#1e293b',
    },
    viewAllText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#1E3A5F',
    },
    listContainer: {
        height: getSize(120, 130, 140, 160, 180),
        transform: [{ scaleX: -1 }],
    },
    itemWrapper: {
        marginLeft: getSize(12, 14, 16, 20, 24),
        transform: [{ scaleX: -1 }],
    },
    serviceCard: {
        alignItems: 'center',
        width: getSize(88, 92, 96, 104, 112),
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: getSize(6, 7, 8, 10, 12),
    },
    avatar: {
        width: getSize(72, 76, 80, 88, 96),
        height: getSize(72, 76, 80, 88, 96),
        borderRadius: getSize(36, 38, 40, 44, 48),
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: getSize(10, 11, 12, 14, 16),
        paddingHorizontal: getSize(5, 5.5, 6, 7, 8),
        paddingVertical: getSize(2, 2.5, 3, 3.5, 4),
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(9, 9.5, 10, 11, 12),
        color: '#1e293b',
        ...(isRTL ? { marginLeft: 2 } : { marginRight: 2 }),
    },
    serviceName: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        textAlign: 'center',
        marginBottom: 2,
    },
    serviceCategory: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: getSize(9, 9.5, 10, 11, 12),
        textAlign: 'center',
    },
    });
};
