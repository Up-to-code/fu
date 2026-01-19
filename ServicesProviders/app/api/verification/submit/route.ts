import { NextResponse } from "next/server";
import { individualVerificationSchema, organizationVerificationSchema } from "@/lib/validations";

const maxFileBytes = 10 * 1024 * 1024;
const allowedMimeTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

function validateFile(file: File, fieldLabel: string) {
  if (file.size <= 0) return `${fieldLabel}: الملف فارغ`;
  if (file.size > maxFileBytes) return `${fieldLabel}: حجم الملف يتجاوز 10MB`;
  if (!allowedMimeTypes.has(file.type)) return `${fieldLabel}: نوع الملف غير مدعوم (PDF / JPG / PNG فقط)`;
  return null;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const type = formData.get("type");

  if (type !== "individual" && type !== "organization") {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_TYPE", message: "نوع التحقق غير صالح" } },
      { status: 400 }
    );
  }

  const textEntries: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") textEntries[key] = value;
  }

  const parsed =
    type === "individual"
      ? individualVerificationSchema.safeParse(textEntries)
      : organizationVerificationSchema.safeParse(textEntries);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "الرجاء تصحيح الحقول المطلوبة",
          details: parsed.error.flatten(),
        },
      },
      { status: 422 }
    );
  }

  const fileErrors: string[] = [];

  if (type === "individual") {
    const idDocument = formData.get("idDocument");
    if (!isFile(idDocument)) fileErrors.push("مستند الهوية/الإقامة مطلوب");
    else {
      const err = validateFile(idDocument, "مستند الهوية/الإقامة");
      if (err) fileErrors.push(err);
    }
  } else {
    const crDocument = formData.get("crDocument");
    if (!isFile(crDocument)) fileErrors.push("مستند السجل التجاري مطلوب");
    else {
      const err = validateFile(crDocument, "مستند السجل التجاري");
      if (err) fileErrors.push(err);
    }

    const vatCertificate = formData.get("vatCertificate");
    if (isFile(vatCertificate)) {
      const err = validateFile(vatCertificate, "شهادة ضريبة القيمة المضافة");
      if (err) fileErrors.push(err);
    }

    const authorizationLetter = formData.get("authorizationLetter");
    if (!isFile(authorizationLetter)) fileErrors.push("خطاب التفويض/التوكيل مطلوب");
    else {
      const err = validateFile(authorizationLetter, "خطاب التفويض/التوكيل");
      if (err) fileErrors.push(err);
    }
  }

  if (fileErrors.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "FILE_VALIDATION_ERROR",
          message: "الرجاء تصحيح المستندات المرفوعة",
          details: { files: fileErrors },
        },
      },
      { status: 422 }
    );
  }

  const res = NextResponse.json({
    success: true,
    data: { status: "pending" as const },
  });

  const secure = process.env.NODE_ENV === "production";
  const now = new Date().toISOString();

  res.cookies.set("sp_verification_status", "pending", {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
  });
  res.cookies.set("sp_verification_type", type, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
  });
  res.cookies.set("sp_verification_submitted_at", now, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
  });

  return res;
}

