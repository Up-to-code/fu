// File: src/screens/services/_hooks/useServiceBooking.ts
// Purpose: Service booking form state and submission

import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../hooks/useAuth';
import { BookingLocation } from '../types/services';

interface BookingFormState {
    selectedServices: string[];
    selectedDate: string;
    selectedTime: string;
    location: BookingLocation;
    address: string;
    phone: string;
    description: string;
}

interface UseServiceBookingReturn {
    formState: BookingFormState;
    handleChange: (field: keyof BookingFormState) => (value: any) => void;
    handleSubmit: () => Promise<void>;
    isLoading: boolean;
    errors: Record<string, string>;
    dateOptions: Array<{ value: string; day: string; date: number; month: string }>;
    timeSlots: string[];
}

export const useServiceBooking = (providerId: string): UseServiceBookingReturn => {
    const router = useRouter();
    const { user } = useAuth();
    const [formState, setFormState] = useState<BookingFormState>({
        selectedServices: [],
        selectedDate: '',
        selectedTime: '',
        location: 'home',
        address: '',
        phone: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const dateOptions = useMemo(() => {
        const options = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            options.push({
                value: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('ar-SA', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('ar-SA', { month: 'short' }),
            });
        }
        return options;
    }, []);

    const timeSlots = useMemo(() => {
        const slots = [];
        for (let hour = 8; hour < 20; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        return slots;
    }, []);

    const handleChange = (field: keyof BookingFormState) => (value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
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

        if (formState.selectedServices.length === 0) {
            newErrors.selectedServices = 'يرجى اختيار خدمة واحدة على الأقل';
        }
        if (!formState.selectedDate) {
            newErrors.selectedDate = 'يرجى اختيار التاريخ';
        }
        if (!formState.selectedTime) {
            newErrors.selectedTime = 'يرجى اختيار الوقت';
        }
        if (formState.location === 'home' && !formState.address.trim()) {
            newErrors.address = 'يرجى إدخال العنوان';
        }
        if (!formState.phone.trim()) {
            newErrors.phone = 'يرجى إدخال رقم الجوال';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('تنبيه', 'يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        if (!user?.id) {
            Alert.alert('خطأ', 'لم يتم العثور على معلومات المستخدم');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Implement actual booking creation with Convex
            Alert.alert('نجح', 'تم حجز الخدمة بنجاح', [
                { text: 'حسناً', onPress: () => router.back() }
            ]);
        } catch (error: any) {
            console.error('Error creating booking:', error);
            Alert.alert('خطأ', error?.message || 'حدث خطأ أثناء حجز الخدمة');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        handleChange,
        handleSubmit,
        isLoading,
        errors,
        dateOptions,
        timeSlots,
    };
};
