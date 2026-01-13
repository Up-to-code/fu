import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewModeToggleProps {
    viewMode: "cards" | "list";
    onViewModeChange: (mode: "cards" | "list") => void;
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
    return (
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 rounded-lg ${viewMode === 'cards' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => onViewModeChange('cards')}
            >
                <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => onViewModeChange('list')}
            >
                <List className="h-4 w-4" />
            </Button>
        </div>
    );
}
