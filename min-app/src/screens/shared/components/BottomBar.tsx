// File: src/screens/shared/components/BottomBar.tsx
// Purpose: Bottom action bar with SafeAreaView

import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getResponsiveValue } from '../../../utils/responsive';
import { BottomBarProps } from '../types/ui';
import { getStyles } from '../StyleSheets/BottomBar.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const BottomBarComponent: React.FC<BottomBarProps> = ({
    children,
    maxWidth = isTablet ? 700 : undefined,
    inTabs = false,
}) => {
    const styles = getStyles(maxWidth);

    const content = (
        <View style={styles.content}>
            {children}
        </View>
    );

    if (inTabs) {
        // For tab screens - position above tab bar
        return (
            <View style={[styles.container, styles.tabsContainer]}>
                {content}
            </View>
        );
    }

    // For non-tab screens - use SafeAreaView at bottom
    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            {content}
        </SafeAreaView>
    );
};

// Memoize BottomBar to prevent unnecessary re-renders
export const BottomBar = React.memo(BottomBarComponent);

export default BottomBar;
