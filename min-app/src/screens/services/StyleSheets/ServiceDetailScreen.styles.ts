// File: src/screens/services/StyleSheets/ServiceDetailScreen.styles.ts
// Purpose: Styles for ServiceDetailScreen component

import { StyleSheet } from 'react-native';

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
            backgroundColor: 'white',
        },
        scrollView: {
            flex: 1,
        },
        heroSection: {
            position: 'relative',
            height: getSize(300, 320, 340, 400, 460),
        },
        heroImage: {
            width: '100%',
            height: '100%',
        },
        headerActions: {
            position: 'absolute',
            top: 0,
            width: '100%',
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'space-between',
            paddingHorizontal: getSize(14, 15, 16, 20, 24),
            paddingTop: getSize(6, 7, 8, 10, 12),
        },
        headerButton: {
            width: getSize(36, 38, 40, 44, 48),
            height: getSize(36, 38, 40, 44, 48),
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: getSize(18, 19, 20, 22, 24),
            alignItems: 'center',
            justifyContent: 'center',
        },
        heroOverlay: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingHorizontal: getSize(14, 15, 16, 20, 24),
            paddingBottom: getSize(20, 22, 24, 32, 40),
        },
        heroContent: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
        },
        heroTextContainer: {
            flex: 1,
            paddingRight: isRTL ? 16 : 0,
            paddingLeft: isRTL ? 0 : 16,
        },
        heroTitle: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(20, 21, 22, 24, 28),
            color: 'white',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        badgesRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'flex-start',
            gap: 8,
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        premiumBadge: {
            backgroundColor: '#F59E0B',
            paddingHorizontal: getSize(10, 11, 12, 16, 20),
            paddingVertical: getSize(3, 3.5, 4, 5, 6),
            borderRadius: getSize(10, 11, 12, 14, 16),
        },
        premiumBadgeText: {
            fontFamily: 'Cairo_600SemiBold',
            color: 'white',
            fontSize: fontSize.xs,
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        typeBadge: {
            backgroundColor: 'rgba(255,255,255,0.25)',
            paddingHorizontal: getSize(10, 11, 12, 16, 20),
            paddingVertical: getSize(3, 3.5, 4, 5, 6),
            borderRadius: getSize(10, 11, 12, 14, 16),
        },
        typeBadgeText: {
            fontFamily: 'Cairo_600SemiBold',
            color: 'white',
            fontSize: fontSize.xs,
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        heroCategoryLocation: {
            fontFamily: 'Cairo_500Medium',
            color: 'rgba(255,255,255,0.9)',
            fontSize: fontSize.sm,
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        avatarContainer: {
            position: 'relative',
        },
        avatar: {
            width: getSize(72, 76, 80, 96, 112),
            height: getSize(72, 76, 80, 96, 112),
            borderRadius: getSize(14, 15, 16, 20, 24),
            backgroundColor: '#3b82f6',
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: 'white',
        },
        avatarImage: {
            width: '100%',
            height: '100%',
        },
        verifiedBadge: {
            position: 'absolute',
            bottom: -4,
            right: isRTL ? -4 : undefined,
            left: isRTL ? undefined : -4,
            width: getSize(24, 25, 26, 30, 34),
            height: getSize(24, 25, 26, 30, 34),
            backgroundColor: '#3b82f6',
            borderRadius: getSize(12, 12.5, 13, 15, 17),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'white',
        },
        statsRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            backgroundColor: 'white',
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingVertical: getSize(20, 22, 24, 32, 40),
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        statItem: {
            alignItems: 'center',
        },
        statNumber: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(20, 22, 24, 28, 32),
            color: '#1e293b',
            marginBottom: 4,
        },
        statLabel: {
            fontFamily: 'Cairo_500Medium',
            color: '#64748b',
            fontSize: fontSize.xs,
        },
        ratingValue: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 6,
            marginBottom: 4,
        },
        statDivider: {
            width: 1,
            height: getSize(44, 47, 50, 60, 70),
            backgroundColor: '#f1f5f9',
        },
        quickInfo: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingVertical: getSize(12, 14, 16, 20, 24),
            gap: getSize(20, 22, 24, 32, 40),
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        quickInfoItem: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 8,
        },
        quickInfoText: {
            fontFamily: 'Cairo_500Medium',
            color: '#64748b',
            fontSize: fontSize.base,
        },
        section: {
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingVertical: getSize(20, 22, 24, 32, 40),
        },
        sectionTitle: {
            fontFamily: 'Cairo_700Bold',
            color: '#1e293b',
            fontSize: fontSize.lg,
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: getSize(10, 11, 12, 16, 20),
        },
        description: {
            fontFamily: 'Cairo_500Medium',
            color: '#64748b',
            fontSize: fontSize.base,
            lineHeight: getSize(20, 22, 24, 28, 32),
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        ctaContainer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f1f5f9',
        },
        ctaContent: {
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingVertical: getSize(12, 14, 16, 20, 24),
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: getSize(12, 14, 16, 20, 24),
        },
        priceContainer: {
            flex: 1,
        },
        priceLabel: {
            fontFamily: 'Cairo_500Medium',
            color: '#94a3b8',
            fontSize: fontSize.xs,
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        priceValue: {
            fontFamily: 'Cairo_700Bold',
            color: '#1e293b',
            fontSize: fontSize.base,
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        bookButton: {
            flex: 2,
            paddingVertical: getSize(12, 13, 14, 16, 18),
            borderRadius: getSize(10, 11, 12, 14, 16),
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        bookButtonText: {
            fontFamily: 'Cairo_700Bold',
            color: 'white',
            fontSize: fontSize.base,
        },
    });
};
