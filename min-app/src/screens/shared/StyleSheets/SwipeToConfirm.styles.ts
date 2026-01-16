// File: src/screens/shared/StyleSheets/SwipeToConfirm.styles.ts
// Purpose: Styles for SwipeToConfirm component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: getSize(50, 55, 60, 60, 70),
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    label: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 16, 18),
    },
});
