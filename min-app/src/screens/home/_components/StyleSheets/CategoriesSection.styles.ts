// File: src/screens/home/_components/StyleSheets/CategoriesSection.styles.ts
// Purpose: Styles for CategoriesSection component

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
        marginBottom: 16,
        textAlign: 'right',
    },
    grid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    categoryCard: {
        alignItems: 'center',
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginBottom: 8,
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
        fontSize: 12,
        textAlign: 'center',
        width: 80,
    },
});
