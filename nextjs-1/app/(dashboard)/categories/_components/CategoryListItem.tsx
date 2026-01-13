import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { getStyleById, type Category } from "@/data";

interface CategoryListItemProps {
    category: Category;
    onDelete: (id: string) => void;
}

export function CategoryListItem({ category, onDelete }: CategoryListItemProps) {
    const styleInfo = getStyleById(category.style);
    
    return (
        <div className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-gray-100">
                    <Image src={category.image} alt={category.name} fill className="object-cover" />
                </div>
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg">{category.icon}</span>
                        <h3 className="font-bold text-gray-900">{category.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${styleInfo.color}`}>{styleInfo.name}</span>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{category.products}</span>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => onDelete(category.id)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}
