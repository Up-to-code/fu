// File: src/screens/checkout/_hooks/useCheckout.ts
// Purpose: Checkout form state and submission

import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { CartItem } from '../../cart/_hooks';

interface CheckoutFormState {
    shippingAddress: string;
    paymentMethod: string;
    notes?: string;
}

interface UseCheckoutReturn {
    formState: CheckoutFormState;
    handleChange: (field: keyof CheckoutFormState) => (value: string) => void;
    handleSubmit: (cartItems: CartItem[], total: number) => Promise<void>;
    isLoading: boolean;
    errors: Record<string, string>;
}

export const useCheckout = (): UseCheckoutReturn => {
    const router = useRouter();
    const { user } = useAuth();
    const createOrder = useMutation(api.orders.createOrder);
    const [formState, setFormState] = useState<CheckoutFormState>({
        shippingAddress: '',
        paymentMethod: '',
        notes: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof CheckoutFormState) => (value: string) => {
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

        if (!formState.shippingAddress.trim()) {
            newErrors.shippingAddress = 'يرجى اختيار عنوان التوصيل';
        }
        if (!formState.paymentMethod) {
            newErrors.paymentMethod = 'يرجى اختيار طريقة الدفع';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (cartItems: CartItem[], total: number) => {
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
            await createOrder({
                userId: user.id,
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.discount ? item.price * (1 - item.discount / 100) : item.price,
                })),
                total,
                shippingAddress: {
                    street: formState.shippingAddress,
                    city: '',
                    country: 'السعودية',
                },
            });

            Alert.alert('نجح', 'تم إنشاء الطلب بنجاح', [
                { text: 'حسناً', onPress: () => router.replace('/(tabs)/orders') }
            ]);
        } catch (error: any) {
            console.error('Error creating order:', error);
            Alert.alert('خطأ', error?.message || 'حدث خطأ أثناء إنشاء الطلب');
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
    };
};
