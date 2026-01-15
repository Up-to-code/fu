// File: src/screens/services/_components/StyleSheets/ServicesOfferedSection.styles.ts
// Purpose: Styles for ServicesOfferedSection component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    column: {
        flex: 1,
        gap: 12,
    },
    serviceItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    checkIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#D1FAE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
        flex: 1,
    },
});
