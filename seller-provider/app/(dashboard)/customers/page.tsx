'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, MoreHorizontal, Phone, Mail } from "lucide-react";

const customers = [
    {
        id: 1,
        name: "عبدالله العتيبي",
        email: "abdullah@example.com",
        phone: "0501234567",
        status: "active",
        lastOrder: "2024-03-15",
        totalSpent: "4,500 ر.س",
        avatar: "",
        initial: "ع"
    },
    {
        id: 2,
        name: "سارة محمد",
        email: "sara@example.com",
        phone: "0559876543",
        status: "active",
        lastOrder: "2024-03-10",
        totalSpent: "12,350 ر.س",
        avatar: "",
        initial: "س"
    },
    {
        id: 3,
        name: "شركة الأفق للتطوير",
        email: "contact@alofuq.sa",
        phone: "0112345678",
        status: "vip",
        lastOrder: "2024-02-28",
        totalSpent: "45,000 ر.س",
        avatar: "",
        initial: "ش"
    },
    {
        id: 4,
        name: "عمر خالد",
        email: "omar@example.com",
        phone: "0543210987",
        status: "inactive",
        lastOrder: "2023-12-15",
        totalSpent: "850 ر.س",
        avatar: "",
        initial: "ع"
    },
];

export default function CustomersPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-slate-900">العملاء</h1>
                    <p className="text-slate-500">إدارة قاعدة بيانات عملائك والتواصل معهم</p>
                </div>
                <Button className="shrink-0">
                    إضافة عميل جديد
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder="بحث بالاسم أو رقم الهاتف..."
                        className="pr-12 bg-white"
                    />
                </div>
                <Button variant="outline" className="w-14 px-0 bg-white">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </div>

            {/* Customers List */}
            <div className="grid gap-4">
                {customers.map((customer) => (
                    <Card key={customer.id} className="bg-white border-slate-100 shadow-none hover:border-primary/20 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Avatar */}
                                <Avatar className="h-16 w-16 border-2 border-slate-50">
                                    <AvatarImage src={customer.avatar} />
                                    <AvatarFallback className="text-xl bg-slate-100 text-slate-700">
                                        {customer.initial}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Info */}
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-lg text-slate-900">{customer.name}</h3>
                                        <Badge variant="secondary" className={`
                                            ${customer.status === 'vip' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''}
                                            ${customer.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}
                                            ${customer.status === 'inactive' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : ''}
                                        `}>
                                            {customer.status === 'vip' ? 'VIP' : customer.status === 'active' ? 'نشط' : 'غير نشط'}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            {customer.email}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            <span dir="ltr">{customer.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="text-right md:pr-10 md:border-r border-slate-100 min-w-[120px]">
                                    <p className="text-sm text-slate-500">إجمالي المشتريات</p>
                                    <p className="font-bold text-slate-900 text-lg">{customer.totalSpent}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border-slate-200">
                                        <MessageCircle className="h-5 w-5" />
                                    </Button>
                                    <Button variant="default" className="flex-1 md:w-auto">
                                        عرض الملف
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
