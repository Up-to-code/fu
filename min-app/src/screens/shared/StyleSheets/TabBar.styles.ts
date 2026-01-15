// File: src/screens/shared/StyleSheets/TabBar.styles.ts
// Purpose: Styles for TabBar component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        gap: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: 'white',
    },
    tabText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#64748b',
    },
    activeTabText: {
        fontFamily: 'Cairo_700Bold',
        color: COLORS.primary,
    },
});
