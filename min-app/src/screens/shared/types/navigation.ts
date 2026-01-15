// File: src/screens/shared/types/navigation.ts
// Purpose: Navigation component interfaces

import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface TypeOption {
    id: string;
    label: string;
    icon?: keyof typeof Feather.glyphMap;
}

export interface TypeSelectorProps {
    options: TypeOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    columns?: number;
}

export interface Tab {
    id: string;
    label: string;
    count?: number;
}

export interface TabBarProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export interface FilterChipProps extends TouchableOpacityProps {
    icon?: keyof typeof Feather.glyphMap;
    text: string;
    primary?: boolean;
}
