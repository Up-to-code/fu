// File: src/screens/home/_components/StyleSheets/ProductListSection.styles.ts
// Purpose: Styles for ProductListSection component

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    viewAllButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    viewAllText: {
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
    },
    listContainer: {
        height: isTablet ? 280 : 240,
        transform: [{ scaleX: -1 }],
    },
    itemWrapper: {
        marginLeft: 12,
        transform: [{ scaleX: -1 }],
    },
});
