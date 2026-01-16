// File: src/screens/account/_hooks/useAddressForm.ts
// Purpose: Manages address form state and submission with Convex + SQLite sync

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { initDB, saveAddress } from '../../../lib/database';

interface AddressFormState {
    label: string;
    addressType: string;
    street: string;
    city: string;
    district: string;
    details: string;
    isDefault: boolean;
}

interface UseAddressFormReturn {
    formState: AddressFormState;
    handleChange: (field: keyof AddressFormState) => (value: string | boolean) => void;
    handleSubmit: () => Promise<void>;
    isLoading: boolean;
    isLoadingData: boolean;
    errors: Record<string, string>;
}

export const useAddressForm = (addressId?: string): UseAddressFormReturn => {
    const router = useRouter();
    const { user } = useAuth();
    const isEditing = !!addressId && addressId !== 'new';

    const createAddressMutation = useMutation(api.users.createAddress);
    const updateAddressMutation = useMutation(api.users.updateAddress);
    const addressData = useQuery(
        api.users.getAddress,
        isEditing && addressId ? { addressId: addressId as any } : 'skip'
    );

    const [formState, setFormState] = useState<AddressFormState>({
        label: '',
        addressType: 'home',
        street: '',
        city: '',
        district: '',
        details: '',
        isDefault: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(isEditing);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load existing address data when editing
    useEffect(() => {
        if (isEditing && addressData) {
            setFormState({
                label: addressData.label || '',
                addressType: 'home', // Could be extracted from addressData if stored
                street: addressData.street || '',
                city: addressData.city || '',
                district: addressData.district || '',
                details: addressData.details || '',
                isDefault: addressData.isDefault || false,
            });
            setIsLoadingData(false);
        } else if (!isEditing) {
            setIsLoadingData(false);
        }
    }, [isEditing, addressData]);

    const handleChange = (field: keyof AddressFormState) => (value: string | boolean) => {
        setFormState(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user types
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formState.label.trim()) {
            newErrors.label = 'اسم العنوان مطلوب';
        }
        if (!formState.street.trim()) {
            newErrors.street = 'الشارع مطلوب';
        }
        if (!formState.city.trim()) {
            newErrors.city = 'المدينة مطلوبة';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('تنبيه', 'يرجى ملء الحقول المطلوبة (اسم العنوان، الشارع، المدينة)');
            return;
        }

        if (!user?.id) {
            Alert.alert('خطأ', 'لم يتم العثور على معلومات المستخدم');
            return;
        }

        setIsLoading(true);
        try {
            if (isEditing && addressId) {
                // Update existing address
                await updateAddressMutation({
                    addressId: addressId as any,
                    label: formState.label.trim(),
                    street: formState.street.trim(),
                    city: formState.city.trim(),
                    country: 'السعودية',
                    district: formState.district.trim() || undefined,
                    details: formState.details.trim() || undefined,
                    isDefault: formState.isDefault,
                });

                // Update SQLite if exists
                try {
                    await initDB();
                    await saveAddress(user.id, addressId, {
                        label: formState.label.trim(),
                        street: formState.street.trim(),
                        city: formState.city.trim(),
                        country: 'السعودية',
                        isDefault: formState.isDefault,
                        data: { district: formState.district.trim(), details: formState.details.trim() },
                    });
                } catch (sqliteError) {
                    console.error('Error saving to SQLite:', sqliteError);
                }

                Alert.alert('تم الحفظ', 'تم تحديث العنوان بنجاح', [
                    { text: 'حسناً', onPress: () => router.back() }
                ]);
            } else {
                // Create new address
                const result = await createAddressMutation({
                    userId: user.id,
                    label: formState.label.trim(),
                    street: formState.street.trim(),
                    city: formState.city.trim(),
                    country: 'السعودية',
                    district: formState.district.trim() || undefined,
                    details: formState.details.trim() || undefined,
                    isDefault: formState.isDefault,
                });

                // Save to SQLite as backup
                if (result.addressId) {
                    try {
                        await initDB();
                        await saveAddress(user.id, result.addressId, {
                            label: formState.label.trim(),
                            street: formState.street.trim(),
                            city: formState.city.trim(),
                            country: 'السعودية',
                            isDefault: formState.isDefault,
                            data: { district: formState.district.trim(), details: formState.details.trim() },
                        });
                    } catch (sqliteError) {
                        console.error('Error saving to SQLite:', sqliteError);
                    }
                }

                Alert.alert('تم الحفظ', 'تم إضافة العنوان بنجاح', [
                    { text: 'حسناً', onPress: () => router.back() }
                ]);
            }
        } catch (error: any) {
            console.error('Error saving address:', error);
            Alert.alert('خطأ', error?.message || 'حدث خطأ أثناء حفظ العنوان');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        handleChange,
        handleSubmit,
        isLoading,
        isLoadingData,
        errors,
    };
};
