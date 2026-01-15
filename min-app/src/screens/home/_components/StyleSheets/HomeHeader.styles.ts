// File: src/screens/home/_components/StyleSheets/HomeHeader.styles.ts
// Purpose: Styles for HomeHeader component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    searchButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchText: {
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Cairo_500Medium',
        color: '#9CA3AF',
        marginRight: 12,
        fontSize: 14,
    },
});
