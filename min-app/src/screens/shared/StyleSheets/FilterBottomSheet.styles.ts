// File: src/screens/shared/StyleSheets/FilterBottomSheet.styles.ts
// Purpose: Styles for FilterBottomSheet component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => {
    return StyleSheet.create({
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
        borderTopLeftRadius: getSize(20, 22, 24, 28, 32),
        borderTopRightRadius: getSize(20, 22, 24, 28, 32),
        maxHeight: '85%',
        width: '100%',
    },
    handle: {
        width: getSize(36, 38, 40, 44, 48),
        height: getSize(3, 3.5, 4, 5, 6),
        backgroundColor: '#e2e8f0',
        borderRadius: getSize(1.5, 1.75, 2, 2.5, 3),
        alignSelf: 'center',
        marginTop: getSize(10, 11, 12, 16, 20),
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 22, 24),
        color: '#1e293b',
    },
    closeButton: {
        padding: getSize(3, 3.5, 4, 5, 6),
    },
    scrollContent: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingTop: getSize(12, 14, 16, 20, 24),
    },
    section: {
        marginBottom: getSize(20, 22, 24, 32, 40),
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: getSize(10, 11, 12, 16, 20),
    },
    chipsContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 14, 16),
        borderRadius: getSize(14, 15, 16, 18, 20),
        backgroundColor: '#f1f5f9',
    },
    chipText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#475569',
    },
    spacer: {
        height: getSize(16, 18, 20, 24, 32),
    },
    footer: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        backgroundColor: 'white',
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: getSize(14, 15, 16, 18, 20),
        borderRadius: getSize(14, 15, 16, 18, 20),
        alignItems: 'center',
    },
    applyButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
        color: 'white',
    },
    });
};
