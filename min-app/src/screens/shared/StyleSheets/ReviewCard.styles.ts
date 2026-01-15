// File: src/screens/shared/StyleSheets/ReviewCard.styles.ts
// Purpose: Styles for ReviewCard component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarContainer: {
        marginLeft: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f1f5f9',
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: 'white',
    },
    info: {
        flex: 1,
    },
    name: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    date: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'right',
    },
    stars: {
        flexDirection: 'row-reverse',
        gap: 2,
    },
    comment: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
        textAlign: 'right',
    },
    helpful: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    helpfulText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
    },
});
