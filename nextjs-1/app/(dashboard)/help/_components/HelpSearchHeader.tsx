"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HelpSearchHeader() {
    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-[#242C5A]">كيف يمكننا مساعدتك؟</h1>
            <p className="text-gray-500 text-lg">ابحث في مركز المساعدة أو تصفح الأقسام</p>
            <div className="relative max-w-md mx-auto">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="ابحث عن سؤالك..." className="pr-12 h-12 rounded-2xl bg-white text-lg" />
            </div>
        </div>
    );
}
