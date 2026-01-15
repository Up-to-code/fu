// File: src/screens/product/StyleSheets/ImageViewerScreen.styles.ts
// Purpose: Styles for ImageViewerScreen component

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    closeButton: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCounter: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
    spacer: {
        width: 40,
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
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 8,
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 12,
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    zoomHintText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        fontFamily: 'Cairo_500Medium',
    },
});
