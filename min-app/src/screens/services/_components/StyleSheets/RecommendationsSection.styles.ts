// File: src/screens/services/_components/StyleSheets/RecommendationsSection.styles.ts
// Purpose: Styles for RecommendationsSection component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    scrollView: {
        transform: [{ scaleX: -1 }],
    },
    scrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    providerCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        width: 192,
        transform: [{ scaleX: -1 }],
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
        marginBottom: 12,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 14,
        textAlign: 'right',
        marginBottom: 4,
    },
    providerCategory: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 12,
        textAlign: 'right',
        marginBottom: 8,
    },
    bottomRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 12,
    },
    priceText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 12,
        color: COLORS.primary,
    },
});
