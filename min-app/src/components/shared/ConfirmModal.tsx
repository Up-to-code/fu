// File: src/components/shared/ConfirmModal.tsx
// Purpose: Reusable confirmation modal for destructive actions

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface ConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    icon?: string;
    isLoading?: boolean;
}

export default function ConfirmModal({
    visible,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'تأكيد',
    cancelText = 'إلغاء',
    type = 'danger',
    icon = 'alert-circle',
    isLoading = false,
}: ConfirmModalProps) {
    const iconColor = type === 'danger' ? '#EF4444' : type === 'warning' ? '#F59E0B' : COLORS.primary;
    const confirmBgColor = type === 'danger' ? '#EF4444' : type === 'warning' ? '#F59E0B' : COLORS.primary;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Icon */}
                    <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
                        <Feather name={icon as any} size={32} color={iconColor} />
                    </View>

                    {/* Content */}
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    {/* Buttons */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                            disabled={isLoading}
                        >
                            <Text style={styles.cancelButtonText}>{cancelText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: confirmBgColor }]}
                            onPress={onConfirm}
                            disabled={isLoading}
                        >
                            <Text style={styles.confirmButtonText}>
                                {isLoading ? 'جاري...' : confirmText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 340,
        alignItems: 'center',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        gap: 12,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
    },
    cancelButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#64748b',
    },
    confirmButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: 'white',
    },
});
