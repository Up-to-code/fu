// File: src/components/shared/BottomBar.tsx
// Purpose: Bottom action bar with SafeAreaView

import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface BottomBarProps {
    children: React.ReactNode;
    maxWidth?: number;
    /** If true, positions the bar 85px from bottom (for tab screens) */
    inTabs?: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({
    children,
    maxWidth = isTablet ? 700 : undefined,
    inTabs = false,
}) => {
    const content = (
        <View
            className="flex-row items-center justify-between"
            style={{
                paddingHorizontal: isTablet ? 32 : 20,
                paddingVertical: isTablet ? 20 : 16,
                maxWidth: maxWidth,
                alignSelf: 'center',
                width: '100%',
            }}
        >
            {children}
        </View>
    );

    if (inTabs) {
        // For tab screens - position above tab bar
        return (
            <View
                className="absolute left-0 right-0 bg-white border-t border-slate-100"
                style={{ bottom: 85 }}
            >
                {content}
            </View>
        );
    }

    // For non-tab screens - use SafeAreaView at bottom
    return (
        <SafeAreaView edges={['bottom']} className="absolute left-0 right-0 bottom-0 bg-white border-t border-slate-100">
            {content}
        </SafeAreaView>
    );
};

export default BottomBar;
