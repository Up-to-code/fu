// File: src/screens/home/_components/StyleSheets/AIDesignBanner.styles.ts
// Purpose: Styles for AIDesignBanner component

import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const BANNER_WIDTH = SCREEN_WIDTH - 40;

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 16,
    },
    scrollView: {
        transform: [{ scaleX: -1 }],
    },
    banner: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        width: BANNER_WIDTH,
        height: 160,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        transform: [{ scaleX: -1 }],
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transform: [{ scaleX: -1 }],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        paddingHorizontal: 20,
        transform: [{ scaleX: -1 }],
    },
    contentInner: {
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 22,
        lineHeight: 28,
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'right',
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        lineHeight: 22,
        color: '#FFFFFF',
        textAlign: 'right',
    },
});
