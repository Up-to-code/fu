// File: src/components/icons/CustomIcons.tsx
// Purpose: Custom SVG icons for the app
// Dependencies: react-native-svg

import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../../constants/theme';

interface IconProps {
    size?: number;
    color?: string;
    focused?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary, focused = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth={focused ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <Path d="M9 22V12h6v10" stroke={focused ? "white" : color} strokeWidth={focused ? "2" : "2"} />
    </Svg>
);

export const CategoryIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary, focused = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth={focused ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 3h7v7H3z" />
        <Path d="M14 3h7v7h-7z" />
        <Path d="M14 14h7v7h-7z" />
        <Path d="M3 14h7v7H3z" />
    </Svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary, focused = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth={focused ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary, focused = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth={focused ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
    </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="11" cy="11" r="8" />
        <Path d="M21 21l-4.35-4.35" />
    </Svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M23 4v6h-6" />
        <Path d="M1 20v-6h6" />
        <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <Path d="M7 7h.01" />
    </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Path d="M12 8v8" />
        <Path d="M8 12h8" />
    </Svg>
);

export const GiftIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20 12v10H4V12" />
        <Path d="M2 7h20v5H2z" />
        <Path d="M12 22V7" />
        <Path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <Path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </Svg>
);

export const CartIcon: React.FC<IconProps> = ({ size = 24, color = COLORS.primary, focused = false }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={focused ? color : "none"} stroke={color} strokeWidth={focused ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="9" cy="21" r="1" />
        <Circle cx="20" cy="21" r="1" />
        <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </Svg>
);

