// File: src/screens/shared/types/form.ts
// Purpose: Form component interfaces

import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface FormInputProps extends TextInputProps {
    label: string;
    error?: string;
    required?: boolean;
    icon?: keyof typeof Feather.glyphMap;
    disabled?: boolean;
}

export interface FormTextAreaProps extends TextInputProps {
    label: string;
    required?: boolean;
    error?: string;
    rows?: number;
}

export interface FormToggleProps {
    label: string;
    description?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export interface PasswordInputProps extends TextInputProps {
    label?: string;
    error?: string;
    required?: boolean;
}
