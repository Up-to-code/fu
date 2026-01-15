// File: src/screens/shared/StyleSheets/SwipeToConfirm.styles.ts
// Purpose: Styles for SwipeToConfirm component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 60,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    label: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
    thumb: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
});
