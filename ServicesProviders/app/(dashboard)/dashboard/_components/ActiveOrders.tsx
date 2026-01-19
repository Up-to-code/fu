"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const activeOrders = [
    {
        id: "ORD-001",
        service: "تصميم شعار احترافي",
        client: "أحمد محمد",
        dueDate: "2025-01-25",
        status: "in_progress", // pending, in_progress, review, completed
        progress: 2, // 0: Pending, 1: In Progress, 2: Review, 3: Completed
    },
    {
        id: "ORD-002",
        service: "تطوير موقع تعريفي",
        client: "شركة الأفق",
        dueDate: "2025-02-01",
        status: "pending",
        progress: 0,
    },
    {
        id: "ORD-003",
        service: "كتابة محتوى إبداعي",
        client: "سارة علي",
        dueDate: "2025-01-22",
        status: "review",
        progress: 3,
    },
];

const steps = ["قيد الانتظار", "جار التنفيذ", "المراجعة", "مكتمل"];

export function ActiveOrders() {
    return (
        <Card className="border-gray-100 shadow-sm rounded-2xl h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-black text-[#242C5A]">طلبات قيد التنفيذ</CardTitle>
                <Badge variant="secondary" className="bg-[#242C5A]/5 text-[#242C5A]">
                    {activeOrders.length} طلبات نشطة
                </Badge>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                    <div className="space-y-4">
                        {activeOrders.map((order) => (
                            <div key={order.id} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-[#242C5A]">{order.service}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span>{order.client}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>تسليم: {order.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">#{order.id}</span>
                                </div>
                                
                                <div className="relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                                    <div 
                                        className="absolute top-1/2 right-0 h-0.5 bg-[#242C5A] -translate-y-1/2 z-0 transition-all duration-500" 
                                        style={{ width: `${(order.progress / (steps.length - 1)) * 100}%` }}
                                    />
                                    <div className="relative z-10 flex justify-between">
                                        {steps.map((step, index) => {
                                            const isCompleted = index <= order.progress;
                                            const isCurrent = index === order.progress;
                                            return (
                                                <div key={step} className="flex flex-col items-center gap-1">
                                                    <div 
                                                        className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                                                            isCompleted 
                                                                ? "bg-[#242C5A] border-[#242C5A]" 
                                                                : "bg-white border-gray-300"
                                                        }`} 
                                                    />
                                                    {isCurrent && (
                                                        <span className="text-[10px] font-bold text-[#242C5A] absolute -bottom-5 w-max">
                                                            {step}
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="h-4" />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
