"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricedOptionForm } from "../_hooks/useServiceForm";

interface CustomPricedOptionsProps {
    options: PricedOptionForm[];
    onChange: (options: PricedOptionForm[]) => void;
    error?: string;
}

export function CustomPricedOptions({ options, onChange, error }: CustomPricedOptionsProps) {
    const addOption = () => {
        onChange([
            ...options,
            { id: Date.now().toString(), label: "", price: "" },
        ]);
    };

    const removeOption = (id: string) => {
        onChange(options.filter((o) => o.id !== id));
    };

    const updateOption = (id: string, field: "label" | "price", value: string) => {
        onChange(
            options.map((o) => (o.id === id ? { ...o, [field]: value } : o))
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#242C5A]">خيارات الخدمة وأسعارها</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-gray-400 hover:text-[#242C5A]">
                                    <Info className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                                أضف باقات/خيارات مخصصة للخدمة مع سعر لكل خيار
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Button type="button" onClick={addOption} variant="outline" className="rounded-xl">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة خيار
                </Button>
            </div>

            {options.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                    <p className="text-gray-500 font-medium">لا توجد خيارات بعد</p>
                    <p className="text-sm text-gray-400 mt-1">ابدأ بإضافة أول خيار للخدمة</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {options.map((opt, index) => (
                        <div key={opt.id} className={cn("grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl border", error ? "border-gray-100" : "border-gray-100")}>
                            <div className="md:col-span-7 space-y-2">
                                <Label className="text-sm">اسم الخيار</Label>
                                <Input
                                    value={opt.label}
                                    onChange={(e) => updateOption(opt.id, "label", e.target.value)}
                                    placeholder={index === 0 ? "مثال: تصميم غرفة" : "مثال: تصميم مكتب"}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="md:col-span-4 space-y-2">
                                <Label className="text-sm">السعر (ر.س)</Label>
                                <Input
                                    value={opt.price}
                                    onChange={(e) => updateOption(opt.id, "price", e.target.value)}
                                    type="number"
                                    inputMode="decimal"
                                    placeholder="0"
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="md:col-span-1 flex items-end justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeOption(opt.id)}
                                    aria-label="حذف الخيار"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}

