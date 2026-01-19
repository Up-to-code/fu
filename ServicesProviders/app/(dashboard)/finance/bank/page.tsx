"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Save, Building2 } from "lucide-react";
import Link from "next/link";
import { bankAccountSchema } from "@/lib/validations";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function AddBankAccountPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        accountHolder: "",
        bankName: "",
        iban: "",
        swiftCode: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            bankAccountSchema.parse(formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push("/finance");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });
                setErrors(fieldErrors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto pb-20" dir="rtl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/finance">
                    <Button variant="ghost" size="icon" className="rounded-xl">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-[#242C5A]">إضافة حساب بنكي</h1>
                    <p className="text-gray-500">أدخل تفاصيل حسابك البنكي لاستلام الأرباح</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>اسم صاحب الحساب</Label>
                        <Input
                            value={formData.accountHolder}
                            onChange={(e) => updateField("accountHolder", e.target.value)}
                            placeholder="الاسم كما يظهر في البطاقة البنكية"
                            className="rounded-xl"
                        />
                        {errors.accountHolder && <p className="text-sm text-red-600">{errors.accountHolder}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>اسم البنك</Label>
                        <Input
                            value={formData.bankName}
                            onChange={(e) => updateField("bankName", e.target.value)}
                            placeholder="مثال: مصرف الراجحي"
                            className="rounded-xl"
                        />
                        {errors.bankName && <p className="text-sm text-red-600">{errors.bankName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>رقم الآيبان (IBAN)</Label>
                        <Input
                            value={formData.iban}
                            onChange={(e) => updateField("iban", e.target.value)}
                            placeholder="SA0000000000000000000000"
                            className="rounded-xl font-mono text-left"
                            dir="ltr"
                        />
                        {errors.iban && <p className="text-sm text-red-600">{errors.iban}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>رمز السويفت (Swift Code)</Label>
                        <Input
                            value={formData.swiftCode}
                            onChange={(e) => updateField("swiftCode", e.target.value)}
                            placeholder="BANKSARI"
                            className="rounded-xl font-mono text-left"
                            dir="ltr"
                        />
                        {errors.swiftCode && <p className="text-sm text-red-600">{errors.swiftCode}</p>}
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full bg-[#242C5A] hover:bg-[#1a2144] rounded-xl h-12 text-lg font-bold"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "جاري الحفظ..." : "حفظ الحساب البنكي"}
                </Button>
            </form>
        </div>
    );
}
