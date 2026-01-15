// File: src/screens/home/_components/StyleSheets/ServicesSection.styles.ts
// Purpose: Styles for ServicesSection component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
    },
    viewAllText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1E3A5F',
    },
    listContainer: {
        height: 140,
        transform: [{ scaleX: -1 }],
    },
    itemWrapper: {
        marginLeft: 16,
        transform: [{ scaleX: -1 }],
    },
    serviceCard: {
        alignItems: 'center',
        width: 96,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 10,
        color: '#1e293b',
        marginLeft: 2,
    },
    serviceName: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 2,
    },
    serviceCategory: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 10,
        textAlign: 'center',
    },
});
