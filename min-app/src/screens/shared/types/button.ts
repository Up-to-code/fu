// File: src/screens/shared/types/button.ts
// Purpose: Button component interfaces

import { TouchableOpacityProps } from 'react-native';

export interface PrimaryButtonProps extends TouchableOpacityProps {
    label: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

export interface SocialButtonProps extends TouchableOpacityProps {
    provider: 'google' | 'apple';
    label?: string;
    onPress: () => void;
}



export interface ActionButtonProps extends TouchableOpacityProps {
    label: string;
    icon?: keyof typeof import('@expo/vector-icons').Feather.glyphMap;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    disabled?: boolean;
    fullWidth?: boolean;
}
