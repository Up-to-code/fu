"use client";

import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { UploadCloud, X, FileIcon, Video } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface FileUploadProps {
  onUploadComplete?: (res: { url: string; metadata: FileMetadata }) => void;
  onUploadError?: (error: Error) => void;
  onUploadStart?: () => void;
  className?: string;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: "image" | "video";
  width?: number;
  height?: number;
  duration?: number;
  url?: string;
}

export function FileUpload({ onUploadComplete, onUploadError, onUploadStart, className }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Partial<FileMetadata>>({});
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("mediaUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      if (res && res[0]) {
        const finalMetadata = {
            ...metadata,
            url: res[0].url,
            name: file?.name || "",
            size: file?.size || 0,
            type: file?.type.startsWith("image") ? "image" : "video",
        } as FileMetadata;
        
        onUploadComplete?.({
          url: res[0].url,
          metadata: finalMetadata,
        });
        toast.success("Upload completed successfully");
      }
    },
    onUploadError: (error) => {
      setIsUploading(false);
      setProgress(0);
      onUploadError?.(error);
      toast.error(`Upload failed: ${error.message}`);
    },
    onUploadProgress: (p) => {
      setProgress(p);
    },
  });

  const extractMetadata = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (file.type.startsWith("image")) {
      const img = new window.Image();
      img.onload = () => {
        setMetadata({
          type: "image",
          width: img.width,
          height: img.height,
          name: file.name,
          size: file.size,
        });
      };
      img.src = objectUrl;
    } else if (file.type.startsWith("video")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        setMetadata({
          type: "video",
          duration: video.duration,
          name: file.name,
          size: file.size,
        });
      };
      video.src = objectUrl;
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setProgress(0);
      extractMetadata(selectedFile);
    }
  }, []);

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    const error = rejectedFiles[0]?.errors[0];
    if (error) {
        toast.error(`File rejected: ${error.message}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxFiles: 1,
    multiple: false,
    disabled: isUploading,
  });

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setMetadata({});
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    onUploadStart?.();
    await startUpload([file]);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`w-full max-w-md mx-auto space-y-4 ${className}`}>
      {!file ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 bg-gray-50 rounded-full">
              <UploadCloud className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {isDragActive ? "Drop the file here" : "Click or drag to upload"}
            </p>
            <p className="text-xs text-gray-500">
              Images (up to 4MB) or Videos (up to 16MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-4 bg-white shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border">
                {metadata.type === "image" && preview ? (
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                ) : metadata.type === "video" ? (
                   <div className="flex items-center justify-center h-full w-full">
                     <Video className="h-8 w-8 text-gray-400" />
                   </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <FileIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatSize(file.size)}</span>
                  {metadata.width && (
                    <>
                      <span>•</span>
                      <span>{metadata.width}x{metadata.height}</span>
                    </>
                  )}
                  {metadata.duration && (
                    <>
                      <span>•</span>
                      <span>{formatDuration(metadata.duration)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {!isUploading && (
                <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="text-gray-400 hover:text-red-500"
                >
                <X className="h-4 w-4" />
                </Button>
            )}
          </div>

          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {!isUploading && (
             <Button onClick={handleUpload} className="w-full" disabled={isUploading}>
                Upload File
             </Button>
          )}
        </div>
      )}
    </div>
  );
}
