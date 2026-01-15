// File: src/screens/shared/StyleSheets/RatingsBreakdown.styles.ts
// Purpose: Styles for RatingsBreakdown component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    header: {
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    overallRating: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 32,
        color: '#1e293b',
    },
    starsContainer: {
        flexDirection: 'row-reverse',
        gap: 4,
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
    },
    breakdown: {
        gap: 8,
    },
    starRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    starLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
        width: 40,
    },
    barContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#F59E0B',
        borderRadius: 4,
    },
    count: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        width: 30,
        textAlign: 'left',
    },
});
