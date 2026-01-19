"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Plus, Building2 } from "lucide-react";
import Link from "next/link";

const transactions = [
    { id: "1", type: "income", description: "دفعة مقدمة - مشروع تصميم شعار", amount: "+500 ر.س", date: "اليوم، 10:30 ص", status: "completed" },
    { id: "2", type: "income", description: "تسليم نهائي - تطوير موقع", amount: "+1500 ر.س", date: "أمس، 04:15 م", status: "completed" },
    { id: "3", type: "withdrawal", description: "سحب إلى الحساب البنكي", amount: "-2000 ر.س", date: "15 يناير 2025", status: "processing" },
    { id: "4", type: "income", description: "استشارة تسويقية", amount: "+300 ر.س", date: "14 يناير 2025", status: "completed" },
];

export default function FinancePage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#242C5A]">المالية</h1>
                    <p className="text-gray-500">إدارة المحفظة والمعاملات المالية</p>
                </div>
                <Button variant="outline" className="rounded-xl">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير التقرير
                </Button>
            </div>

            {/* Wallet Overview */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Main Wallet Card */}
                <div className="bg-gradient-to-br from-[#242C5A] to-[#1a2144] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-medium text-white/80">المحفظة</span>
                        </div>
                        <div className="space-y-1 mb-8">
                            <p className="text-sm text-white/60">الرصيد المتاح للسحب</p>
                            <h2 className="text-4xl font-black tracking-tight">12,450.00 <span className="text-xl font-medium">ر.س</span></h2>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-white text-[#242C5A] hover:bg-white/90 rounded-xl font-bold flex-1">
                                <ArrowUpRight className="h-4 w-4 ml-2" />
                                سحب الرصيد
                            </Button>
                            <Link href="/finance/bank" className="flex-1">
                                <Button className="w-full bg-[#242C5A] border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold">
                                    <Building2 className="h-4 w-4 ml-2" />
                                    حساب بنكي
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                            <ArrowDownRight className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">أرباح هذا الشهر</p>
                            <p className="text-2xl font-black text-[#242C5A]">3,200 ر.س</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">رصيد معلق</p>
                            <p className="text-2xl font-black text-[#242C5A]">850 ر.س</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <Card className="rounded-2xl border-gray-100 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-bold text-[#242C5A]">سجل المعاملات</CardTitle>
                    <Button variant="ghost" className="text-sm text-[#242C5A]">عرض الكل</Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {tx.type === 'income' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{tx.description}</p>
                                        <p className="text-xs text-gray-500">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>{tx.amount}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {tx.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
