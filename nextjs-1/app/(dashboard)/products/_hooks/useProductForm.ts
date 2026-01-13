import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProductActions } from "./useProducts";
import { type Product } from "./useProductStore";
import { productSchema } from "@/lib/validations";
import { z } from "zod";

type ProductFormData = {
    name: string;
    nameEn: string;
    description: string;
    price: string;
    comparePrice: string;
    stock: string;
    sku: string;
    categoryId: string;
    style: string;
    status: "active" | "draft";
    image: string;
    images: string[];
};

const defaultFormData: ProductFormData = {
    name: "",
    nameEn: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "",
    sku: "",
    categoryId: "",
    style: "",
    status: "active",
    image: "",
    images: [],
};

export function useProductForm(productId?: string, initialData?: Partial<Product>) {
    const router = useRouter();
    const { addProduct, updateProduct } = useProductActions();
    const [formData, setFormData] = useState<ProductFormData>(() => {
        if (initialData) {
            return {
                name: initialData.name || "",
                nameEn: initialData.nameEn || "",
                description: initialData.description || "",
                price: initialData.price?.toString() || "",
                comparePrice: initialData.comparePrice?.toString() || "",
                stock: initialData.stock?.toString() || "",
                sku: initialData.sku || "",
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
    
    const updateField = useCallback((field: keyof ProductFormData, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
            const validationData = {
                name: formData.name,
                nameEn: formData.nameEn,
                description: formData.description,
                categoryId: formData.categoryId,
                price: parseFloat(formData.price) || 0,
                originalPrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
                stock: parseInt(formData.stock) || 0,
                sku: formData.sku,
                images: formData.image ? [formData.image, ...formData.images.filter(img => img !== formData.image)] : formData.images,
            };
            
            productSchema.parse(validationData);
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
    
    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
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
            
            const productData: Product = {
                id: productId || Date.now().toString(),
                name: formData.name,
                nameEn: formData.nameEn,
                description: formData.description,
                price: parseFloat(formData.price),
                comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
                stock: parseInt(formData.stock) || 0,
                sku: formData.sku,
                categoryId: formData.categoryId,
                category: category?.name || "",
                style: formData.style || "modern",
                status: formData.status,
                image: formData.image || formData.images[0] || "",
                images: formData.images.length > 0 ? formData.images : (formData.image ? [formData.image] : []),
                sales: initialData?.sales || 0,
                views: initialData?.views || 0,
            };
            
            if (productId) {
                updateProduct(productId, productData);
            } else {
                addProduct(productData);
            }
            
            router.push(`/products/${productData.id}`);
        } catch (error) {
            console.error("Error saving product:", error);
            setErrors({ submit: "حدث خطأ أثناء حفظ المنتج" });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, productId, validate, addProduct, updateProduct, router, initialData]);
    
    return {
        formData,
        updateField,
        errors,
        isSubmitting,
        handleSubmit,
        validate,
    };
}
