"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";

export function ContactSupportCard() {
    return (
        <div className="bg-[#242C5A] rounded-2xl p-8 text-center text-white">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-xl font-bold mb-2">لم تجد ما تبحث عنه؟</h2>
            <p className="text-white/70 mb-6">فريق الدعم جاهز لمساعدتك</p>
            <Button className="bg-white text-[#242C5A] hover:bg-gray-100 rounded-xl px-8">
                <MessageCircle className="h-4 w-4 ml-2" />
                تواصل معنا
            </Button>
        </div>
    );
}
