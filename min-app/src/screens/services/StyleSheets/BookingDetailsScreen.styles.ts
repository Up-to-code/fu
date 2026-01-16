// File: src/screens/services/StyleSheets/BookingDetailsScreen.styles.ts
// Purpose: Styles for BookingDetailsScreen component

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
        container: { flex: 1, backgroundColor: '#f8fafc' },
        safeArea: { flex: 1 },
        header: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: getSize(14, 15, 16, 20, 24),
            paddingVertical: getSize(10, 11, 12, 16, 20),
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        headerTitle: { fontFamily: 'Cairo_700Bold', fontSize: fontSize.base, color: '#1e293b' },
        scrollView: { flex: 1 },
        scrollContent: { padding: getSize(14, 15, 16, 20, 24) },
        statusCard: {
            borderRadius: getSize(10, 11, 12, 14, 16),
            padding: getSize(14, 15, 16, 20, 24),
            marginBottom: getSize(12, 14, 16, 20, 24),
        },
        statusHeader: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        currentStatusLabel: { fontFamily: 'Cairo_700Bold', fontSize: fontSize.lg },
        scheduledInfo: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.sm,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        section: {
            backgroundColor: 'white',
            borderRadius: getSize(10, 11, 12, 14, 16),
            padding: getSize(14, 15, 16, 20, 24),
            marginBottom: getSize(10, 11, 12, 16, 20),
            borderWidth: 1,
            borderColor: '#f1f5f9',
        },
        sectionContent: {
            // Wrapper for content if needed
        },
        sectionTitle: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: getSize(10, 11, 12, 16, 20),
        },
        providerCard: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        providerHeader: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 12,
            flex: 1,
        },
        providerAvatar: {
            width: getSize(46, 48, 50, 56, 64),
            height: getSize(46, 48, 50, 56, 64),
            borderRadius: getSize(23, 24, 25, 28, 32),
            backgroundColor: '#f1f5f9',
        },
        providerInfo: { flex: 1 },
        providerName: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: 4,
        },
        providerRating: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 4,
        },
        ratingText: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.sm,
            color: '#1e293b',
        },
        providerType: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.xs,
            color: '#64748b',
        },
        callButton: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 6,
            backgroundColor: COLORS.primary,
            paddingHorizontal: getSize(14, 15, 16, 20, 24),
            paddingVertical: getSize(8, 9, 10, 12, 14),
            borderRadius: getSize(6, 7, 8, 10, 12),
        },
        callButtonText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.sm,
            color: 'white',
        },
        serviceItem: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        serviceInfo: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 8,
            flex: 1,
        },
        serviceLabel: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.base,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        servicePrice: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.sm,
            color: COLORS.primary,
        },
        descriptionBox: {
            backgroundColor: '#f8fafc',
            padding: getSize(10, 11, 12, 16, 20),
            borderRadius: getSize(6, 7, 8, 10, 12),
            marginTop: getSize(10, 11, 12, 16, 20),
        },
        descriptionLabel: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.xs,
            color: '#64748b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: 4,
        },
        descriptionText: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            lineHeight: getSize(18, 19, 20, 24, 28),
        },
        infoRow: { marginBottom: getSize(10, 11, 12, 16, 20) },
        infoItem: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 8,
        },
        infoText: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            flex: 1,
        },
        priceRow: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'space-between',
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        priceLabel: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.base,
            color: '#64748b',
        },
        priceValue: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(18, 19, 20, 22, 24),
        },
        quoteNotes: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.xs,
            color: '#64748b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: getSize(6, 7, 8, 10, 12),
            lineHeight: getSize(16, 17, 18, 22, 26),
        },
        paymentMethod: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.xs,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        timelineItem: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            gap: 12,
        },
        timelineLeft: { alignItems: 'center' },
        timelineDot: { width: getSize(10, 11, 12, 14, 16), height: getSize(10, 11, 12, 14, 16), borderRadius: getSize(5, 5.5, 6, 7, 8) },
        timelineLine: {
            width: 2,
            flex: 1,
            backgroundColor: '#e2e8f0',
            marginVertical: 4,
        },
        timelineContent: { flex: 1 },
        timelineStatus: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: '#1e293b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: 4,
        },
        timelineNote: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#64748b',
            textAlign: (isRTL ? 'right' : 'left') as const,
            marginBottom: 4,
        },
        timelineDate: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.xs,
            color: '#94a3b8',
            textAlign: (isRTL ? 'right' : 'left') as const,
        },
        completeButton: {
            backgroundColor: '#10B981', // Green for success/completion
            borderRadius: getSize(10, 11, 12, 14, 16),
            paddingVertical: getSize(12, 13, 14, 16, 18),
            alignItems: 'center',
        },
        completeButtonContent: {
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            alignItems: 'center',
            gap: 8,
        },
        completeButtonText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: 'white',
        },
    });
};
