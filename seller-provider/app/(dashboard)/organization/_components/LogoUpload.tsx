"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
    logo?: string;
    onLogoChange?: (logo: string) => void;
    disabled?: boolean;
}

export function LogoUpload({ logo, onLogoChange, disabled = false }: LogoUploadProps) {
    const [preview, setPreview] = useState<string | null>(logo || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
                onLogoChange?.(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onLogoChange?.("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">شعار المنشأة</label>
            <div className="flex items-start gap-4">
                {preview ? (
                    <div className="relative group">
                        <div className="h-24 w-24 rounded-xl border-2 border-gray-200 overflow-hidden bg-gray-50">
                            <img
                                src={preview}
                                alt="Logo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {!disabled && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="h-24 w-24 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                )}
                <div className="flex-1 space-y-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={disabled}
                    />
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleUploadClick}
                            disabled={disabled}
                            className="rounded-xl"
                        >
                            <Upload className="h-4 w-4 ml-2" />
                            {preview ? "تغيير الشعار" : "رفع شعار"}
                        </Button>
                        {preview && !disabled && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemove}
                                className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <X className="h-4 w-4 ml-2" />
                                إزالة
                            </Button>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">
                        PNG, JPG أو GIF. الحد الأقصى 2MB
                    </p>
                </div>
            </div>
        </div>
    );
}
