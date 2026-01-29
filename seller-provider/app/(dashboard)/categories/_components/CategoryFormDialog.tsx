"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { styleTypes, emojiIcons } from "@/data";
import type { Category } from "../_hooks";
import { FileUpload } from "@/components/ui/file-upload";

interface CategoryFormDialogProps {
    onAdd: (category: Omit<Category, "id">) => void;
}

export function CategoryFormDialog({ onAdd }: CategoryFormDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [style, setStyle] = useState("modern");
    const [selectedIcon, setSelectedIcon] = useState("📦");
    const [nameError, setNameError] = useState<string | null>(null);
    const [backgroundMode, setBackgroundMode] = useState<"color" | "image">("color");
    const [backgroundColor, setBackgroundColor] = useState("#242C5A");
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    const handleSubmit = () => {
        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            setNameError("اسم التصنيف يجب أن يكون حرفين على الأقل");
            return;
        }
        if (trimmedName) {
            onAdd({
                name: trimmedName,
                nameEn: trimmedName,
                description: description.trim() || "منتجات متنوعة",
                products: 0,
                icon: selectedIcon,
                image: backgroundImage || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
                style: style,
                backgroundColor: backgroundMode === "color" ? backgroundColor : undefined,
            });
            setName("");
            setDescription("");
            setStyle("modern");
            setSelectedIcon("📦");
            setNameError(null);
            setBackgroundMode("color");
            setBackgroundColor("#242C5A");
            setBackgroundImage(null);
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة تصنيف
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-[#242C5A]">إضافة تصنيف جديد (PRO)</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>اختر أيقونة</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {emojiIcons.map((icon) => (
                                <button
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-xl transition-all ${selectedIcon === icon
                                        ? 'bg-[#242C5A]/10 border-2 border-[#242C5A]'
                                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                        }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Background Selection */}
                    <div className="space-y-2">
                        <Label>خلفية التصنيف</Label>
                        <div className="flex gap-2 mb-2">
                             <Button 
                                variant={backgroundMode === "color" ? "default" : "outline"} 
                                onClick={() => setBackgroundMode("color")}
                                size="sm"
                                className="flex-1"
                             >
                                لون
                             </Button>
                             <Button 
                                variant={backgroundMode === "image" ? "default" : "outline"} 
                                onClick={() => setBackgroundMode("image")}
                                size="sm"
                                className="flex-1"
                             >
                                صورة
                             </Button>
                        </div>

                        {backgroundMode === "color" ? (
                             <div className="flex items-center gap-2">
                                 <input 
                                    type="color" 
                                    value={backgroundColor} 
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    className="h-10 w-20 rounded cursor-pointer"
                                 />
                                 <span className="text-sm text-gray-500">{backgroundColor}</span>
                             </div>
                        ) : (
                             <div className="space-y-2">
                                 {backgroundImage ? (
                                     <div className="relative aspect-video rounded-lg overflow-hidden border">
                                         <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
                                         <Button 
                                            size="sm" 
                                            variant="destructive" 
                                            className="absolute top-2 right-2"
                                            onClick={() => setBackgroundImage(null)}
                                         >
                                            إزالة
                                         </Button>
                                     </div>
                                 ) : (
                                     <FileUpload 
                                        onUploadComplete={(res) => setBackgroundImage(res.url)}
                                        onUploadError={(e) => console.error(e)}
                                        className="w-full"
                                     />
                                 )}
                             </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>اسم التصنيف</Label>
                        <Input
                            placeholder="مثال: غرف نوم"
                            className="rounded-xl"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (nameError) setNameError(null);
                            }}
                        />
                        {nameError && <p className="text-sm text-red-600">{nameError}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>نوع الستايل</Label>
                        <Select value={style} onValueChange={setStyle}>
                            <SelectTrigger className="rounded-xl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {styleTypes.map((styleType) => (
                                    <SelectItem key={styleType.id} value={styleType.id}>
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${styleType.color} ml-2`}>{styleType.name}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>ماذا يشمل هذا التصنيف؟</Label>
                        <Textarea
                            placeholder="مثال: أسرّة، خزائن، كومودينو..."
                            className="rounded-xl min-h-[80px]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-[#242C5A] hover:bg-[#1a2144] rounded-xl"
                        disabled={name.trim().length < 2}
                    >
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
