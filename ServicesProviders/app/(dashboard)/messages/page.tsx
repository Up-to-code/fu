"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Mock Data
const conversations = [
    {
        id: "1",
        user: { name: "سارة أحمد", image: "", status: "online" },
        lastMessage: "شكراً لك، سأقوم بمراجعة الملف",
        time: "10:30 ص",
        unread: 2,
    },
    {
        id: "2",
        user: { name: "شركة الأفق", image: "", status: "offline" },
        lastMessage: "متى يمكننا استلام المشروع؟",
        time: "أمس",
        unread: 0,
    },
    {
        id: "3",
        user: { name: "محمد علي", image: "", status: "online" },
        lastMessage: "تم تحويل الدفعة المقدمة",
        time: "أمس",
        unread: 0,
    },
];

const messages = [
    {
        id: "1",
        senderId: "user",
        text: "مرحباً، هل يمكننا تعديل التصميم قليلاً؟",
        time: "10:00 ص",
    },
    {
        id: "2",
        senderId: "me",
        text: "أهلاً سارة، بالتأكيد. ما هي التعديلات المطلوبة؟",
        time: "10:05 ص",
    },
    {
        id: "3",
        senderId: "user",
        text: "أريد تغيير الألوان لتكون أكثر حيوية، وإضافة الشعار في الزاوية.",
        time: "10:15 ص",
    },
    {
        id: "4",
        senderId: "me",
        text: "تمام، سأقوم بذلك وأرسل لك النسخة المعدلة خلال ساعة.",
        time: "10:20 ص",
    },
    {
        id: "5",
        senderId: "user",
        text: "شكراً لك، سأقوم بمراجعة الملف",
        time: "10:30 ص",
    },
];

export default function MessagesPage() {
    const [selectedId, setSelectedId] = useState("1");
    const [messageInput, setMessageInput] = useState("");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const selectedConversation = conversations.find(c => c.id === selectedId);

    const ConversationList = () => (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#242C5A] mb-4">الرسائل</h2>
                <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        placeholder="بحث في المحادثات..." 
                        className="pr-10 bg-white rounded-xl border-gray-200"
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {conversations.map((conv) => (
                        <button
                            key={conv.id}
                            onClick={() => {
                                setSelectedId(conv.id);
                                setIsMobileOpen(false);
                            }}
                            className={cn(
                                "w-full p-3 flex items-start gap-3 rounded-xl transition-all text-right",
                                selectedId === conv.id ? "bg-white shadow-sm" : "hover:bg-white/50"
                            )}
                        >
                            <div className="relative">
                                <Avatar>
                                    <AvatarImage src={conv.user.image} />
                                    <AvatarFallback className="bg-[#242C5A] text-white">
                                        {conv.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                {conv.user.status === "online" && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-gray-900">{conv.user.name}</span>
                                    <span className="text-xs text-gray-400">{conv.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                                <span className="min-w-[20px] h-5 flex items-center justify-center bg-[#242C5A] text-white text-[10px] rounded-full px-1">
                                    {conv.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <div className="flex h-[calc(100vh-6rem)] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm" dir="rtl">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-80 border-l border-gray-100 flex-col bg-gray-50/50">
                <ConversationList />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white min-w-0">
                {/* Chat Header */}
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="md:hidden">
                            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="p-0 w-80">
                                    <ConversationList />
                                </SheetContent>
                            </Sheet>
                        </div>
                        <Avatar>
                            <AvatarImage src={selectedConversation?.user.image} />
                            <AvatarFallback className="bg-[#242C5A] text-white">
                                {selectedConversation?.user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-gray-900">{selectedConversation?.user.name}</h3>
                            <p className="text-xs text-green-600 font-medium">متصل الآن</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#242C5A]">
                            <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#242C5A]">
                            <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#242C5A]">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Messages List */}
                <ScrollArea className="flex-1 p-4 bg-[#f8f9fc]">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex gap-3 max-w-[85%]",
                                    msg.senderId === "me" ? "mr-auto flex-row-reverse" : ""
                                )}
                            >
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarFallback className={cn(
                                        "text-xs",
                                        msg.senderId === "me" ? "bg-gray-200 text-gray-600" : "bg-[#242C5A] text-white"
                                    )}>
                                        {msg.senderId === "me" ? "أنا" : selectedConversation?.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className={cn(
                                        "p-3 px-4 rounded-2xl text-sm shadow-sm",
                                        msg.senderId === "me" 
                                            ? "bg-[#242C5A] text-white rounded-tl-none" 
                                            : "bg-white text-gray-800 rounded-tr-none border border-gray-100"
                                    )}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 block px-1">
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#242C5A] shrink-0">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input 
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="اكتب رسالتك هنا..." 
                            className="border-none bg-transparent shadow-none focus-visible:ring-0 px-2 h-auto py-2"
                        />
                        <Button 
                            size="icon" 
                            className="bg-[#242C5A] hover:bg-[#1a2144] rounded-xl w-10 h-10 shrink-0 shadow-sm"
                            disabled={!messageInput.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
