"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Image as ImageIcon, Video, X } from "lucide-react";
import { CompactMediaUpload, Media } from "./MediaUpload";

export type Variant = {
    id: string;
    combination: Record<string, string>;
    price: string;
    stock: string;
    sku: string;
    media: Media[];
};

interface VariantsListProps {
    variants: Variant[];
    optionNames: string[];
    onVariantChange: (variantId: string, field: keyof Variant, value: string | Media[]) => void;
    onAddMedia: (variantId: string, type: "image" | "video") => void;
    onRemoveMedia: (variantId: string, mediaId: string) => void;
}

export function VariantsList({
    variants,
    optionNames,
    onVariantChange,
    onAddMedia,
    onRemoveMedia
}: VariantsListProps) {
    const [expandedVariant, setExpandedVariant] = useState<string | null>(null);

    const getVariantLabel = (combo: Record<string, string>) => Object.values(combo).join(' • ');

    if (variants.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#242C5A]">المتغيرات ({variants.length})</h2>
                <p className="text-xs text-gray-400">صور وأسعار لكل تركيبة</p>
            </div>
            <div className="space-y-3">
                {variants.map((variant) => (
                    <div key={variant.id} className="border border-gray-100 rounded-xl overflow-hidden">
                        {/* Variant Header */}
                        <div
                            className="flex items-center justify-between p-4 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50"
                            onClick={() => setExpandedVariant(expandedVariant === variant.id ? null : variant.id)}
                        >
                            <div className="flex items-center gap-3">
                                {variant.media.length > 0 ? (
                                    <img src={variant.media[0].url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                        <ImageIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        {Object.entries(variant.combination).map(([key, val]) => (
                                            <Badge key={key} variant="outline" className="text-xs">{val}</Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                        <span>{variant.price || '0'} ر.س</span>
                                        <span>{variant.stock || '0'} قطعة</span>
                                        <span className="font-mono text-xs">{variant.sku || 'SKU'}</span>
                                    </div>
                                </div>
                            </div>
                            {expandedVariant === variant.id
                                ? <ChevronUp className="h-5 w-5 text-gray-400" />
                                : <ChevronDown className="h-5 w-5 text-gray-400" />
                            }
                        </div>

                        {/* Expanded Content */}
                        {expandedVariant === variant.id && (
                            <div className="p-4 border-t border-gray-100 space-y-4">
                                {/* Variant Media */}
                                <CompactMediaUpload
                                    media={variant.media}
                                    maxItems={4}
                                    onAdd={(type) => onAddMedia(variant.id, type)}
                                    onRemove={(mediaId) => onRemoveMedia(variant.id, mediaId)}
                                    label={`صور ${getVariantLabel(variant.combination)}`}
                                />

                                {/* Variant Details */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs">السعر (ر.س)</Label>
                                        <Input
                                            value={variant.price}
                                            onChange={(e) => onVariantChange(variant.id, 'price', e.target.value)}
                                            className="h-9 rounded-lg"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">المخزون</Label>
                                        <Input
                                            value={variant.stock}
                                            onChange={(e) => onVariantChange(variant.id, 'stock', e.target.value)}
                                            type="number"
                                            className="h-9 rounded-lg"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">SKU</Label>
                                        <Input
                                            value={variant.sku}
                                            onChange={(e) => onVariantChange(variant.id, 'sku', e.target.value)}
                                            className="h-9 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
