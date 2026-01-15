// File: src/screens/shared/StyleSheets/FilterBottomSheet.styles.ts
// Purpose: Styles for FilterBottomSheet component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    sheetContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
        width: '100%',
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
    },
    chipsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
    },
    chipText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#475569',
    },
    spacer: {
        height: 20,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        backgroundColor: 'white',
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    applyButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: 'white',
    },
});
