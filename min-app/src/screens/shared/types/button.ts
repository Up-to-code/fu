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
    label: string;
}
