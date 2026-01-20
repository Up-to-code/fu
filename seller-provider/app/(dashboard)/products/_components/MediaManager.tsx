import { FileUpload, type FileMetadata } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, GripVertical, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type Media = { id: string; url: string; type: "image" | "video" | string; isMain?: boolean };

interface MediaManagerProps {
    media: Media[];
    maxItems?: number;
    onChange: (media: Media[]) => void;
    title?: string;
    subtitle?: string;
}

// Sortable Item Component
function SortableMediaItem({ 
    item, 
    index, 
    onRemove, 
    onSetMain 
}: { 
    item: Media; 
    index: number; 
    onRemove: (id: string) => void;
    onSetMain: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 group ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
        >
            {item.type === "video" ? (
                <video src={item.url} className="w-full h-full object-cover" />
            ) : (
                <img src={item.url} alt="" className="w-full h-full object-cover" />
            )}

            {index === 0 && (
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs z-10">الرئيسية</Badge>
            )}

            {/* Hover Controls */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20">
                <div className="flex gap-2">
                     {/* Drag Handle */}
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20 cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
                        <GripVertical className="h-4 w-4" />
                    </Button>
                    
                    {/* Set as Main (if not first) */}
                    {index !== 0 && (
                        <Button 
                            type="button"
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-white hover:bg-white/20"
                            onClick={() => onSetMain(item.id)}
                            title="تعيين كصورة رئيسية"
                        >
                            <Star className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Delete */}
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-red-500/80"
                        onClick={() => onRemove(item.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function MediaManager({
    media,
    maxItems = 6,
    onChange,
    title = "إدارة الوسائط",
    subtitle,
}: MediaManagerProps) {
    const [isUploading, setIsUploading] = useState(false);
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = media.findIndex((item) => item.id === active.id);
            const newIndex = media.findIndex((item) => item.id === over.id);
            onChange(arrayMove(media, oldIndex, newIndex));
        }
    };

    const handleRemove = (id: string) => {
        onChange(media.filter((item) => item.id !== id));
    };

    const handleSetMain = (id: string) => {
        const itemIndex = media.findIndex((item) => item.id === id);
        if (itemIndex > 0) {
            onChange(arrayMove(media, itemIndex, 0));
        }
    };

    const handleUploadStart = () => {
        setIsUploading(true);
    };

    const handleUploadComplete = (res: { url: string; metadata: FileMetadata }) => {
        setIsUploading(false);
        const videoCount = media.filter(m => m.type === "video").length;
        const imageCount = media.filter(m => m.type === "image").length;

        if (res.metadata.type === "video" && videoCount >= 1) {
             toast.error("يمكن رفع فيديو واحد كحد أقصى");
             return;
        }
        if (res.metadata.type === "image" && imageCount >= 5) {
            toast.error("يمكن رفع 5 صور كحد أقصى");
            return;
        }

        const newMedia: Media = {
            id: Date.now().toString(),
            url: res.url,
            type: res.metadata.type,
        };
        onChange([...media, newMedia]);
    };

    const handleUploadError = (error: Error) => {
        setIsUploading(false);
        console.error("Upload error:", error);
        toast.error("فشل رفع الملف");
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-primary">{title}</h2>
                    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
                    <p className="text-xs text-gray-400 mt-1">
                         (اسحب لإعادة الترتيب • العنصر الأول هو الرئيسي)
                    </p>
                </div>
                <span className="text-sm text-gray-400">{media.length}/{maxItems}</span>
            </div>

            <DndContext 
                sensors={sensors} 
                collisionDetection={closestCenter} 
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={media.map(m => m.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-4 gap-3">
                        {media.map((item, index) => (
                            <SortableMediaItem 
                                key={item.id} 
                                item={item} 
                                index={index} 
                                onRemove={handleRemove}
                                onSetMain={handleSetMain}
                            />
                        ))}
                        
                        {media.length < maxItems && !isUploading && (
                             <div className="col-span-full mt-4">
                                <FileUpload 
                                    onUploadComplete={handleUploadComplete} 
                                    onUploadError={handleUploadError}
                                    onUploadStart={handleUploadStart}
                                    className="w-full"
                                />
                             </div>
                        )}
                        
                        {isUploading && (
                             <div className="col-span-full mt-4 text-center text-sm text-gray-500">
                                 جاري الرفع...
                             </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
