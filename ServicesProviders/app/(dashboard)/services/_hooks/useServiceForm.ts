import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useServiceActions } from "./useServices";
import { type Service } from "./useServiceStore";
import { serviceSchema } from "@/lib/validations";
import { z } from "zod";

export type PricedOptionForm = {
    id: string;
    label: string;
    price: string;
};

type ServiceFormData = {
    name: string;
    description: string;
    minPrice: string;
    maxPrice: string;
    options: PricedOptionForm[];
    duration: string;
    categoryId: string;
    style: string;
    status: "active" | "draft";
    image: string;
    images: string[];
};

const defaultFormData: ServiceFormData = {
    name: "",
    description: "",
    minPrice: "",
    maxPrice: "",
    options: [],
    duration: "",
    categoryId: "",
    style: "",
    status: "active",
    image: "",
    images: [],
};

export function useServiceForm(serviceId?: string, initialData?: Partial<Service>) {
    const router = useRouter();
    const { addService, updateService } = useServiceActions();
    const [formData, setFormData] = useState<ServiceFormData>(() => {
        if (initialData) {
            const options = Array.isArray((initialData as any).options)
                ? ((initialData as any).options as { label: string; price: number }[]).map((o, index) => ({
                    id: `${Date.now()}-${index}`,
                    label: o.label ?? "",
                    price: Number.isFinite(o.price) ? String(o.price) : "",
                }))
                : [];

            return {
                name: initialData.name || "",
                description: initialData.description || "",
                minPrice: ((initialData as any).minPrice ?? initialData.price)?.toString() || "",
                maxPrice: ((initialData as any).maxPrice ?? "")?.toString() || "",
                options,
                duration: initialData.duration?.toString() || "",
                categoryId: initialData.categoryId || "",
                style: initialData.style || "",
                status: (initialData.status === "active" || initialData.status === "draft" ? initialData.status : "active") as "active" | "draft",
                image: initialData.image || initialData.images?.[0] || "",
                images: initialData.images || [],
            };
        }
        return defaultFormData;
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const updateField = useCallback(<K extends keyof ServiceFormData>(field: K, value: ServiceFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value } as ServiceFormData));
        // Clear error for this field when user types
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);
    
    const validate = useCallback((): boolean => {
        try {
            const images = formData.image
                ? [formData.image, ...formData.images.filter(img => img !== formData.image)]
                : formData.images;

            const validationData = {
                name: formData.name,
                description: formData.description,
                categoryId: formData.categoryId || undefined,
                minPrice: parseFloat(formData.minPrice) || 0,
                maxPrice: formData.maxPrice ? parseFloat(formData.maxPrice) : undefined,
                options: formData.options.map((o) => ({
                    label: o.label,
                    price: parseFloat(o.price) || 0,
                })),
                duration: formData.duration ? parseInt(formData.duration) : undefined,
                images: images.length > 0 ? images : undefined,
            };
            
            serviceSchema.parse(validationData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    }, [formData]);
    
    const handleSubmit = useCallback(async (e?: FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        
        if (!validate()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Get category name from categoryId
            const { categories } = await import("@/data");
            const category = categories.find(c => c.id === formData.categoryId);

            const minPrice = parseFloat(formData.minPrice);
            const images = formData.image
                ? [formData.image, ...formData.images.filter(img => img !== formData.image)]
                : formData.images;
            const fallbackImage = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600";
            
            const serviceData: Service = {
                id: serviceId || Date.now().toString(),
                name: formData.name,
                nameEn: formData.name,
                description: formData.description,
                minPrice,
                maxPrice: formData.maxPrice ? parseFloat(formData.maxPrice) : undefined,
                options: formData.options.map((o) => ({ label: o.label, price: parseFloat(o.price) })),
                price: minPrice,
                comparePrice: undefined,
                duration: formData.duration ? parseInt(formData.duration) : 0,
                categoryId: formData.categoryId,
                category: category?.name || "",
                style: formData.style || "modern",
                status: formData.status,
                image: images[0] || fallbackImage,
                images: images.length > 0 ? images : [fallbackImage],
                sales: initialData?.sales || 0,
                views: initialData?.views || 0,
            };
            
            if (serviceId) {
                updateService(serviceId, serviceData);
            } else {
                addService(serviceData);
            }
            
            router.push(`/services/${serviceData.id}`);
        } catch (error) {
            console.error("Error saving service:", error);
            setErrors({ submit: "حدث خطأ أثناء حفظ الخدمة" });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, serviceId, validate, addService, updateService, router, initialData]);
    
    return {
        formData,
        updateField,
        errors,
        isSubmitting,
        handleSubmit,
        validate,
    };
}
