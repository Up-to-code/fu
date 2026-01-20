import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { getStyleById } from "@/data";
import type { Category } from "../_hooks";

interface CategoryCardProps {
    category: Category;
    onDelete: (id: string) => void;
}

export function CategoryCard({ category, onDelete }: CategoryCardProps) {
    const styleInfo = getStyleById(category.style || "modern");
    
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#242C5A]/20 transition-all group relative">
            <div className="relative h-36 bg-gray-100">
                <Image
                    src={category.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 right-4 text-3xl">{category.icon || "📦"}</div>
                <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-bold ${styleInfo.color}`}>
                    {styleInfo.name}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => onDelete(category.id)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-[#242C5A]">{category.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{category.products ?? 0} منتج</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{category.description || "منتجات متنوعة"}</p>
            </div>
        </div>
    );
}
