"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Award } from "lucide-react";

const goals = [
    {
        id: 1,
        title: "تحقيق 5000 ريال مبيعات",
        current: 3500,
        target: 5000,
        icon: TrendingUp,
        color: "text-green-600",
        bg: "bg-green-100",
    },
    {
        id: 2,
        title: "إكمال 10 طلبات خدمة",
        current: 7,
        target: 10,
        icon: Target,
        color: "text-blue-600",
        bg: "bg-blue-100",
    },
    {
        id: 3,
        title: "الحصول على 5 تقييمات ممتازة",
        current: 4,
        target: 5,
        icon: Award,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
    },
];

export function BookingGoals() {
    return (
        <Card className="border-gray-100 shadow-sm rounded-2xl h-full">
            <CardHeader>
                <CardTitle className="text-xl font-black text-[#242C5A]">أهدافك الحالية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${goal.bg}`}>
                                    <goal.icon className={`h-4 w-4 ${goal.color}`} />
                                </div>
                                <span className="font-bold text-gray-700 text-sm">{goal.title}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-500">
                                {Math.round((goal.current / goal.target) * 100)}%
                            </span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-1.5" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
