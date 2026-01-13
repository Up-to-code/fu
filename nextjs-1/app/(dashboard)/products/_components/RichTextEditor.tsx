import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, List, Link2 } from "lucide-react";

interface RichTextEditorProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    minHeight?: string;
}

export function RichTextEditor({
    value,
    defaultValue,
    onChange,
    placeholder = "اكتب هنا...",
    label,
    minHeight = "120px"
}: RichTextEditorProps) {
    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Italic className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-5 bg-gray-200 mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Link2 className="h-4 w-4" />
                    </Button>
                </div>
                <Textarea
                    value={value}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className="border-0 rounded-none resize-none focus-visible:ring-0"
                    style={{ minHeight }}
                />
            </div>
        </div>
    );
}
