"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { useAuth } from "@/lib/auth/hooks";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const updateUserProfile = useMutation(api.users.updateUserProfile);
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim()) {
      toast.error("يرجى إدخال اسم المنشأة ورقم الهاتف");
      return;
    }
    setIsSubmitting(true);
    try {
      if (!user?.id) throw new Error("غير مسجل الدخول");
      await updateUserProfile({
        userId: user.id,
        role: "vendor",
        businessName,
        phone,
        language,
      });
      toast.success("تم إكمال بيانات حساب البائع. سيتم تسجيل الخروج لتحديث الصلاحيات.");
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (e: any) {
      toast.error("فشل إكمال البيانات", { description: e?.message || "حدث خطأ غير متوقع" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">أكمل بيانات حساب البائع</h1>
          <p className="text-slate-600 mt-2">
            يتيح لك حساب البائع إدارة المنتجات والطلبات والمنشأة والوصول إلى لوحة التحكم.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">اسم المنشأة</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="اسم معرضك أو منشأتك"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XXXXXXXX"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">اللغة المفضلة (اختياري)</Label>
            <Input
              id="language"
              value={language ?? ""}
              onChange={(e) => setLanguage(e.target.value || undefined)}
              placeholder="ar أو en"
            />
          </div>
          <Button type="submit" className="w-full bg-[#242C5A] hover:bg-[#1a2144]" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإكمال..." : "إكمال البيانات"}
          </Button>
        </form>
      </div>
    </div>
  );
}
