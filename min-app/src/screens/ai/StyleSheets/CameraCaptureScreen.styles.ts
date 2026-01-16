// File: src/screens/ai/StyleSheets/CameraCaptureScreen.styles.ts
// Purpose: Styles for CameraCaptureScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
    },
    permissionIcon: {
        width: getSize(72, 76, 80, 88, 96),
        height: getSize(72, 76, 80, 88, 96),
        borderRadius: getSize(36, 38, 40, 44, 48),
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getSize(24, 28, 32, 40, 48),
    },
    permissionTitle: {
        color: 'white',
        fontSize: getSize(18, 19, 20, 22, 24),
        fontFamily: 'Cairo_700Bold',
        textAlign: 'center',
        marginBottom: getSize(12, 14, 16, 20, 24),
    },
    permissionDescription: {
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: getSize(32, 36, 40, 48, 56),
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(14, 15, 16, 18, 20),
        lineHeight: getSize(20, 22, 24, 28, 32),
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
    },
    permissionButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: getSize(32, 36, 40, 48, 56),
        paddingVertical: getSize(14, 15, 16, 18, 20),
        borderRadius: getSize(14, 15, 16, 18, 20),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    permissionButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    topBarContent: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        width: getSize(44, 46, 48, 52, 56),
        height: getSize(44, 46, 48, 52, 56),
        borderRadius: getSize(22, 23, 24, 26, 28),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        width: getSize(44, 46, 48, 52, 56),
        height: getSize(44, 46, 48, 52, 56),
        borderRadius: getSize(22, 23, 24, 26, 28),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(8, 9, 10, 12, 14),
        borderRadius: getSize(14, 15, 16, 18, 20),
    },
    titleText: {
        color: 'white',
        fontSize: getSize(12, 13, 14, 15, 16),
        fontFamily: 'Cairo_700Bold',
    },
    spacer: {
        width: getSize(44, 46, 48, 52, 56),
    },
    guideFrame: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideFrameBorder: {
        width: '85%',
        height: '55%',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 24,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomContent: {
        paddingBottom: getSize(20, 22, 24, 32, 40),
        paddingTop: getSize(20, 22, 24, 32, 40),
    },
    hintText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: getSize(12, 13, 14, 15, 16),
        fontFamily: 'Cairo_500Medium',
        textAlign: 'center',
        marginBottom: getSize(24, 28, 32, 40, 48),
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: getSize(24, 28, 32, 40, 48),
    },
    galleryButton: {
        width: getSize(52, 54, 56, 60, 64),
        height: getSize(52, 54, 56, 60, 64),
        borderRadius: getSize(26, 27, 28, 30, 32),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureButton: {
        width: getSize(72, 76, 80, 88, 96),
        height: getSize(72, 76, 80, 88, 96),
        borderRadius: getSize(36, 38, 40, 44, 48),
        borderWidth: 4,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: getSize(24, 28, 32, 40, 48),
    },
    captureButtonInner: {
        width: getSize(56, 60, 64, 72, 80),
        height: getSize(56, 60, 64, 72, 80),
        borderRadius: getSize(28, 30, 32, 36, 40),
        backgroundColor: COLORS.primary,
    },
    flashButton: {
        width: getSize(52, 54, 56, 60, 64),
        height: getSize(52, 54, 56, 60, 64),
        borderRadius: getSize(26, 27, 28, 30, 32),
        alignItems: 'center',
        justifyContent: 'center',
    },
    flashButtonOn: {
        backgroundColor: '#eab308',
    },
    flashButtonOff: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    flashOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 9999,
    },
});
