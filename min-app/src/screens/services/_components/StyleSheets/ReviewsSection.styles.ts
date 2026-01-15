// File: src/screens/services/_components/StyleSheets/ReviewsSection.styles.ts
// Purpose: Styles for ReviewsSection component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    header: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    ratingContainer: {
        alignItems: 'center',
    },
    ratingValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 32,
        color: '#1e293b',
        marginBottom: 6,
    },
    starsContainer: {
        flexDirection: 'row-reverse',
        gap: 4,
        marginBottom: 8,
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
    },
    reviewsList: {
        gap: 8,
    },
});
