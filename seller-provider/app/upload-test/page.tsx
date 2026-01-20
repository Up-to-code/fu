"use client";

import { useState } from "react";
import { FileUpload, type FileMetadata } from "@/components/ui/file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadTestPage() {
  const [uploadedData, setUploadedData] = useState<{ url: string; metadata: FileMetadata } | null>(null);

  const handleUploadComplete = (data: { url: string; metadata: FileMetadata }) => {
    setUploadedData(data);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
            </Button>
        </Link>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">UploadThing Test</h1>
            <p className="text-muted-foreground">
            Test the custom file upload component with images and videos.
            </p>
        </div>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>
              Select an image or video to upload. Metadata will be extracted automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload 
                onUploadComplete={handleUploadComplete} 
                onUploadError={(e) => console.error(e)}
            />
          </CardContent>
        </Card>

        {uploadedData && (
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">Upload Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="font-medium text-sm text-muted-foreground">File URL</div>
                <div className="p-3 bg-white border rounded-md font-mono text-xs break-all">
                  <a href={uploadedData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {uploadedData.url}
                  </a>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Original Name</div>
                  <div className="text-sm">{uploadedData.metadata.name}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Type</div>
                  <div className="text-sm capitalize">{uploadedData.metadata.type}</div>
                </div>
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Size</div>
                  <div className="text-sm">{(uploadedData.metadata.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                {uploadedData.metadata.width && (
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Dimensions</div>
                    <div className="text-sm">
                      {uploadedData.metadata.width} x {uploadedData.metadata.height} px
                    </div>
                  </div>
                )}
                {uploadedData.metadata.duration && (
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Duration</div>
                    <div className="text-sm">{uploadedData.metadata.duration.toFixed(1)} seconds</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
