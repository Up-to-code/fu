// File: src/screens/product/StyleSheets/ImageViewerScreen.styles.ts
// Purpose: Styles for ImageViewerScreen component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (
    getSize: GetSizeFunction,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number },
    iconSize: { sm: number; md: number; lg: number; xl: number }
) => {
    return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(6, 7, 8, 10, 12),
    },
    closeButton: {
        width: getSize(36, 38, 40, 44, 48),
        height: getSize(36, 38, 40, 44, 48),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: getSize(18, 19, 20, 22, 24),
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCounter: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.base,
    },
    spacer: {
        width: getSize(36, 38, 40, 44, 48),
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnailsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    thumbnailsScroll: {
        flexDirection: 'row',
    },
    thumbnailsContent: {
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingBottom: getSize(12, 14, 16, 20, 24),
        gap: 8,
    },
    thumbnail: {
        width: getSize(56, 60, 64, 72, 80),
        height: getSize(56, 60, 64, 72, 80),
        borderRadius: getSize(10, 11, 12, 14, 16),
        overflow: 'hidden',
        borderWidth: 2,
    },
    thumbnailSelected: {
        borderColor: 'white',
    },
    thumbnailUnselected: {
        borderColor: 'transparent',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    zoomHint: {
        position: 'absolute',
        bottom: 128,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    zoomHintContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(6, 7, 8, 10, 12),
        borderRadius: getSize(18, 19, 20, 22, 24),
    },
    zoomHintText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: fontSize.xs,
        fontFamily: 'Cairo_500Medium',
    },
    });
};
