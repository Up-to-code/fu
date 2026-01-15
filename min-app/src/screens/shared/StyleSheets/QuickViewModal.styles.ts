// File: src/screens/shared/StyleSheets/QuickViewModal.styles.ts
// Purpose: Styles for QuickViewModal component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    providerInfo: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarWrapper: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 24,
        height: 24,
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    providerDetails: {
        flex: 1,
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    providerCategory: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'right',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
    },
    ratingContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
    },
    priceContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    priceLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    priceSubtext: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'right',
    },
    actions: {
        gap: 12,
        paddingBottom: 16,
    },
    viewDetailsButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    viewDetailsText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
    bookButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    bookText: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
});
