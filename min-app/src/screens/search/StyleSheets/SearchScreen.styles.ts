// File: src/screens/search/StyleSheets/SearchScreen.styles.ts
// Purpose: Styles for SearchScreen component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        gap: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    searchContainer: {
        flex: 1,
    },
    suggestionsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    suggestionItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    suggestionText: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        color: '#475569',
        textAlign: 'right',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    sectionHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    clearButton: {
        padding: 4,
    },
    clearText: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 12,
    },
    chipsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
    },
    categoriesGrid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: 96,
    },
    categoryOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: 16,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    searchButton: {
        backgroundColor: '#1E3A5F',
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    searchButtonText: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: 16,
    },
});
