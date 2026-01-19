"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VerificationType = "individual" | "organization";
type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

function acceptString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function fileLabelFromType(type: VerificationType) {
  if (type === "individual") {
    return [
      { name: "idDocument", label: "مستند الهوية الوطنية/الإقامة (PDF/JPG/PNG)" },
    ] as const;
  }
  return [
    { name: "crDocument", label: "مستند السجل التجاري (PDF/JPG/PNG)" },
    { name: "vatCertificate", label: "شهادة ضريبة القيمة المضافة (اختياري)" },
    { name: "authorizationLetter", label: "خطاب التفويض/التوكيل (PDF/JPG/PNG)" },
  ] as const;
}

export default function VerificationClient({
  initialStatus,
  initialType,
}: {
  initialStatus: VerificationStatus;
  initialType?: VerificationType;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") ?? "/dashboard";

  const [status, setStatus] = useState<VerificationStatus>(initialStatus);
  const [type, setType] = useState<VerificationType>(initialType ?? "individual");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const initialFields = () => ({
    fullName: "",
    nationalId: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    organizationName: "",
    commercialRegistrationNumber: "",
    vatNumber: "",
    nationalAddress: "",
    authorizedPersonName: "",
    authorizedPersonNationalId: "",
    phone: "",
  });

  const [fields, setFields] = useState<Record<string, string>>(initialFields);

  const requiredFileFields = useMemo(() => fileLabelFromType(type), [type]);

  const instructions = useMemo(() => {
    if (type === "individual") {
      return [
        "ارفع صورة واضحة لكامل مستند الهوية/الإقامة (بدون قص).",
        "تأكد أن البيانات المدخلة تطابق المستند حرفياً.",
        "رقم الهوية/الإقامة: 10 أرقام ويبدأ بـ 1 (هوية) أو 2 (إقامة).",
        "صيغة الملفات المقبولة: PDF / JPG / PNG، وبحد أقصى 10MB لكل ملف.",
      ];
    }
    return [
      "ارفع مستند السجل التجاري بصيغة واضحة وحديثة.",
      "الرقم الضريبي (VAT): 15 رقم ويبدأ بـ 3 وينتهي بـ 3.",
      "ارفع خطاب التفويض/التوكيل لإثبات صلاحية المفوض.",
      "صيغة الملفات المقبولة: PDF / JPG / PNG، وبحد أقصى 10MB لكل ملف.",
    ];
  }, [type]);

  const onChangeField = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeFile = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const validateClientSide = () => {
    const localErrors: string[] = [];

    if (type === "individual") {
      if (!fields.fullName.trim()) localErrors.push("الاسم الكامل مطلوب");
      if (!/^[12][0-9]{9}$/.test(fields.nationalId.trim())) localErrors.push("رقم الهوية/الإقامة غير صحيح");
      if (!fields.dateOfBirth.trim()) localErrors.push("تاريخ الميلاد مطلوب");
      if (!fields.nationality.trim()) localErrors.push("الجنسية مطلوبة");
      if (!fields.address.trim()) localErrors.push("العنوان مطلوب");
      if (!/^(05|5)([0-9]{8})$/.test(fields.phone.trim())) localErrors.push("رقم الجوال غير صحيح");
    } else {
      if (!fields.organizationName.trim()) localErrors.push("اسم المنشأة مطلوب");
      if (!/^[0-9]{10}$/.test(fields.commercialRegistrationNumber.trim())) localErrors.push("رقم السجل التجاري غير صحيح");
      if (!/^3[0-9]{13}3$/.test(fields.vatNumber.trim())) localErrors.push("الرقم الضريبي غير صحيح");
      if (!fields.nationalAddress.trim()) localErrors.push("العنوان الوطني مطلوب");
      if (!fields.authorizedPersonName.trim()) localErrors.push("اسم المفوض مطلوب");
      if (!/^[12][0-9]{9}$/.test(fields.authorizedPersonNationalId.trim())) localErrors.push("رقم هوية/إقامة المفوض غير صحيح");
      if (!/^(05|5)([0-9]{8})$/.test(fields.phone.trim())) localErrors.push("رقم الجوال غير صحيح");
    }

    for (const f of requiredFileFields) {
      const file = files[f.name];
      if (f.name === "vatCertificate") continue;
      if (!file) localErrors.push(`${f.label}: الملف مطلوب`);
    }

    return localErrors;
  };

  const submit = async () => {
    setErrors([]);
    const localErrors = validateClientSide();
    if (localErrors.length > 0) {
      setErrors(localErrors);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("type", type);
      Object.entries(fields).forEach(([k, v]) => formData.set(k, v));
      requiredFileFields.forEach(({ name }) => {
        const file = files[name];
        if (file) formData.set(name, file);
      });

      const res = await fetch("/api/verification/submit", {
        method: "POST",
        body: formData,
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = acceptString(json?.error?.message) || "تعذر إرسال طلب التحقق";
        const fileMsgs = Array.isArray(json?.error?.details?.files) ? json.error.details.files : [];
        const fieldMsgs = json?.error?.details?.fieldErrors
          ? Object.values(json.error.details.fieldErrors).flat().filter((x: unknown) => typeof x === "string")
          : [];
        setErrors([msg, ...fileMsgs, ...fieldMsgs]);
        return;
      }

      setStatus("pending");
      setErrors([]);
    } finally {
      setSubmitting(false);
    }
  };

  const headerBadge =
    status === "verified"
      ? { text: "موثق", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
      : status === "pending"
      ? { text: "قيد المراجعة", className: "bg-amber-50 text-amber-700 border-amber-200" }
      : status === "rejected"
      ? { text: "مرفوض", className: "bg-rose-50 text-rose-700 border-rose-200" }
      : { text: "غير موثق", className: "bg-gray-50 text-gray-700 border-gray-200" };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-start justify-center py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl p-8 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#242C5A]">التحقق من الحساب</h1>
            <p className="text-gray-500 mt-2 leading-7">
              لإتاحة الميزات المقيدة، يلزم استكمال التحقق وفق متطلبات الامتثال في المملكة العربية السعودية.
            </p>
          </div>
          <div className={`shrink-0 border px-3 py-1 rounded-full text-sm font-bold ${headerBadge.className}`}>
            {headerBadge.text}
          </div>
        </div>

        {status === "verified" && (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
            تم توثيق حسابك. يمكنك الآن استخدام جميع الميزات.
            <div className="mt-4">
              <Button className="rounded-xl bg-[#242C5A] hover:bg-[#1a2144]" onClick={() => router.replace(next)}>
                متابعة
              </Button>
            </div>
          </div>
        )}

        {status === "pending" && (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
            تم استلام طلبك وهو قيد المراجعة. سنقوم بإشعارك عند تحديث الحالة.
            <div className="mt-4">
              <Button variant="outline" className="rounded-xl" onClick={() => router.replace("/dashboard")}>
                العودة إلى لوحة التحكم
              </Button>
            </div>
          </div>
        )}

        {status !== "verified" && status !== "pending" && (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                  type === "individual" ? "bg-[#242C5A] text-white border-[#242C5A]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  setType("individual");
                  setFields(initialFields());
                  setFiles({});
                  setErrors([]);
                }}
              >
                فرد
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                  type === "organization" ? "bg-[#242C5A] text-white border-[#242C5A]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  setType("organization");
                  setFields(initialFields());
                  setFiles({});
                  setErrors([]);
                }}
              >
                منشأة
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p className="font-black text-gray-900">متطلبات رفع المستندات</p>
              <ul className="mt-3 space-y-2 text-gray-700 text-sm leading-6">
                {instructions.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {errors.length > 0 && (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800">
                <p className="font-black">تعذر الإرسال</p>
                <ul className="mt-3 space-y-1 text-sm leading-6">
                  {errors.map((e, i) => (
                    <li key={`${e}-${i}`} className="flex gap-2">
                      <span className="text-rose-400">•</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {type === "individual" ? (
                <>
                  <div className="space-y-2">
                    <Label>الاسم الكامل</Label>
                    <Input className="rounded-xl" value={fields.fullName} onChange={(e) => onChangeField("fullName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الهوية/الإقامة</Label>
                    <Input className="rounded-xl" value={fields.nationalId} onChange={(e) => onChangeField("nationalId", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>تاريخ الميلاد</Label>
                    <Input className="rounded-xl" placeholder="YYYY-MM-DD" value={fields.dateOfBirth} onChange={(e) => onChangeField("dateOfBirth", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>الجنسية</Label>
                    <Input className="rounded-xl" value={fields.nationality} onChange={(e) => onChangeField("nationality", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>العنوان</Label>
                    <Input className="rounded-xl" value={fields.address} onChange={(e) => onChangeField("address", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الجوال</Label>
                    <Input className="rounded-xl" value={fields.phone} onChange={(e) => onChangeField("phone", e.target.value)} />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>اسم المنشأة</Label>
                    <Input className="rounded-xl" value={fields.organizationName} onChange={(e) => onChangeField("organizationName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم السجل التجاري</Label>
                    <Input className="rounded-xl" value={fields.commercialRegistrationNumber} onChange={(e) => onChangeField("commercialRegistrationNumber", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>الرقم الضريبي (VAT)</Label>
                    <Input className="rounded-xl" value={fields.vatNumber} onChange={(e) => onChangeField("vatNumber", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الجوال</Label>
                    <Input className="rounded-xl" value={fields.phone} onChange={(e) => onChangeField("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>العنوان الوطني</Label>
                    <Input className="rounded-xl" value={fields.nationalAddress} onChange={(e) => onChangeField("nationalAddress", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>اسم المفوض</Label>
                    <Input className="rounded-xl" value={fields.authorizedPersonName} onChange={(e) => onChangeField("authorizedPersonName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم هوية/إقامة المفوض</Label>
                    <Input className="rounded-xl" value={fields.authorizedPersonNationalId} onChange={(e) => onChangeField("authorizedPersonNationalId", e.target.value)} />
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 space-y-5">
              {requiredFileFields.map(({ name, label }) => (
                <div key={name} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    type="file"
                    accept="application/pdf,image/jpeg,image/png"
                    className="rounded-xl bg-white"
                    onChange={(e) => onChangeFile(name, e.target.files?.[0] ?? null)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                className="rounded-xl bg-[#242C5A] hover:bg-[#1a2144]"
                disabled={submitting}
                onClick={submit}
              >
                {submitting ? "جاري الإرسال..." : "إرسال طلب التحقق"}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => router.replace("/dashboard")}
                disabled={submitting}
              >
                لاحقاً
              </Button>
            </div>

            <p className="mt-6 text-xs text-gray-500 leading-6">
              يتم التعامل مع بياناتك لأغراض الامتثال والتحقق فقط. لا يوفّر هذا النموذج استشارة قانونية.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
