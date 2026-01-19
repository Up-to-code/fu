"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccountProfile } from "../_hooks/useAccountProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(2, "الاسم قصير جداً").max(50, "الاسم طويل جداً").optional(),
  businessName: z.string().min(2, "اسم المنشأة مطلوب").max(100, "اسم المنشأة طويل جداً").optional(),
  phone: z.string().min(8, "رقم الجوال غير صحيح").max(20, "رقم الجوال طويل جداً").optional(),
  language: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AccountUpdatePage() {
  const { user, profile, update } = useAccountProfile();

  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profile?.name ?? "",
      businessName: (profile as any)?.businessName ?? "",
      phone: profile?.phone ?? "",
      language: profile?.language ?? "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile?.name ?? "",
        businessName: (profile as any)?.businessName ?? "",
        phone: profile?.phone ?? "",
        language: profile?.language ?? "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!user?.id) return;
    try {
      await update({
        userId: user.id,
        name: values.name,
        businessName: values.businessName,
        phone: values.phone,
        language: values.language,
      });
      toast.success("تم حفظ البيانات بنجاح");
    } catch (e: any) {
      toast.error("فشل حفظ البيانات", { description: e?.message || "حدث خطأ غير متوقع" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#242C5A] mb-4">تحديث بيانات الحساب</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>الاسم</Label>
          <Input placeholder="اسمك" {...register("name")} />
          {formState.errors.name && (
            <p className="text-red-600 text-sm">{formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>اسم المنشأة</Label>
          <Input placeholder="اسم منشأتك" {...register("businessName")} />
          {formState.errors.businessName && (
            <p className="text-red-600 text-sm">{formState.errors.businessName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>رقم الجوال</Label>
          <Input placeholder="05XXXXXXXX" {...register("phone")} />
          {formState.errors.phone && (
            <p className="text-red-600 text-sm">{formState.errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>اللغة</Label>
          <Input placeholder="ar أو en" {...register("language")} />
          {formState.errors.language && (
            <p className="text-red-600 text-sm">{formState.errors.language.message}</p>
          )}
        </div>
        <div className="flex gap-3">
          <Button type="submit" className="bg-[#242C5A] hover:bg-[#1a2144]" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
