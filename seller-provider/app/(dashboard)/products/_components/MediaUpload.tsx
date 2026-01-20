import { FileUpload, type FileMetadata } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Video, X, GripVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type Media = { id: string; url: string; type: "image" | "video" | string };

interface MediaUploadProps {
    media: Media[];
    maxItems?: number;
    onAdd: (media: Media) => void;
    onRemove: (id: string) => void;
    title?: string;
    subtitle?: string;
    gridLayout?: "main" | "equal";
}

export function MediaUpload({
    media,
    maxItems = 6, // 5 images + 1 video
    onAdd,
    onRemove,
    title = "الوسائط",
    subtitle,
    gridLayout = "main"
}: MediaUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const videoCount = media.filter(m => m.type === "video").length;
    const imageCount = media.filter(m => m.type === "image").length;

    const handleUploadStart = () => {
        setIsUploading(true);
    };

    const handleUploadComplete = (res: { url: string; metadata: FileMetadata }) => {
        setIsUploading(false);
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
        onAdd(newMedia);
    };

    const handleUploadError = (error: Error) => {
        setIsUploading(false);
        console.error("Upload error:", error);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-[#242C5A]">{title}</h2>
                    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
                    <p className="text-xs text-gray-400 mt-1">
                         (الحد الأقصى: 5 صور + فيديو واحد)
                    </p>
                </div>
                <span className="text-sm text-gray-400">{media.length}/{maxItems}</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
                {media.map((item, index) => (
                    <div
                        key={item.id}
                        className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 group ${gridLayout === "main" && index === 0 ? 'col-span-2 row-span-2' : ''
                            }`}
                    >
                        {item.type === "video" ? (
                             <video src={item.url} className="w-full h-full object-cover" controls />
                        ) : (
                             <img src={item.url} alt="" className="w-full h-full object-cover" />
                        )}
                        
                        {index === 0 && gridLayout === "main" && (
                            <Badge className="absolute top-2 right-2 bg-[#242C5A] text-white text-xs">الرئيسية</Badge>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                                <GripVertical className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-white hover:bg-red-500/80"
                                onClick={() => onRemove(item.id)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
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
        </div>
    );
}

// Compact version for variant media
interface CompactMediaUploadProps {
    media: Media[];
    maxItems?: number;
    onAdd: (type: "image" | "video") => void;
    onRemove: (id: string) => void;
    label?: string;
}

export function CompactMediaUpload({ media, maxItems = 4, onAdd, onRemove, label }: CompactMediaUploadProps) {
    return (
        <div>
            {label && <p className="text-sm text-gray-600 mb-2">{label}</p>}
            <div className="flex gap-2 flex-wrap">
                {media.map((m) => (
                    <div key={m.id} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 group">
                        <img src={m.url} alt="" className="w-full h-full object-cover" />
                        {m.type === "video" && <Video className="absolute inset-0 m-auto h-6 w-6 text-white" />}
                        <button
                            onClick={() => onRemove(m.id)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>
                    </div>
                ))}
                {media.length < maxItems && (
                    <>
                        <button
                            onClick={() => onAdd("image")}
                            className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-[#242C5A]/40"
                        >
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                            <span className="text-[10px] text-gray-400">صورة</span>
                        </button>
                        <button
                            onClick={() => onAdd("video")}
                            className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-[#242C5A]/40"
                        >
                            <Video className="h-5 w-5 text-gray-400" />
                            <span className="text-[10px] text-gray-400">فيديو</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
