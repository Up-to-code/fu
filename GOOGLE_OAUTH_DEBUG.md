# Google OAuth Debugging Guide

## الخطأ الحالي
"حدث خطأ أثناء الاتصال بخدمة Google. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."

## خطوات التحقق

### 1. التحقق من المتغيرات البيئية في Convex

```bash
# في مجلد المشروع الرئيسي
npx convex env ls
```

يجب أن ترى:
- `GOOGLE_CLIENT_ID` أو `AUTH_GOOGLE_ID`
- `GOOGLE_CLIENT_SECRET` أو `AUTH_GOOGLE_SECRET`

إذا لم تكن موجودة، قم بإضافتها:
```bash
npx convex env set GOOGLE_CLIENT_ID=your-client-id
npx convex env set GOOGLE_CLIENT_SECRET=your-client-secret
```

### 2. التحقق من إعدادات Google Cloud Console

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. اختر مشروعك
3. اذهب إلى **APIs & Services** → **Credentials**
4. افتح OAuth 2.0 Client ID الخاص بك
5. تأكد من أن **Authorized redirect URIs** يحتوي على:
   - للتطوير المحلي: `http://localhost:3000/api/auth/callback/google`
   - للإنتاج: `https://your-deployment.convex.site/api/auth/callback/google`

### 3. التحقق من سجلات الأخطاء

افتح Developer Console في المتصفح (F12) وتحقق من:
- أخطاء في Console
- طلبات Network (Network tab)
- تحقق من طلبات `/api/auth/social/sign-in`

### 4. التحقق من إعدادات Next.js

في ملف `.env.local`:
```env
NEXT_PUBLIC_BETTER_AUTH_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
```

### 5. اختبار API مباشرة

افتح Terminal وجرب:
```bash
curl -X POST http://localhost:3000/api/auth/social/sign-in \
  -H "Content-Type: application/json" \
  -d '{"provider":"google","callbackURL":"/dashboard"}'
```

يجب أن تحصل على استجابة (ليس 404).

## الحلول الشائعة

1. **404 Error**: تأكد من أن `convex/http.ts` يسجل المسارات بشكل صحيح
2. **Invalid Redirect URI**: تأكد من تطابق Redirect URI في Google Console مع المسار الفعلي
3. **Missing Credentials**: تأكد من تعيين المتغيرات البيئية في Convex
4. **CORS Issues**: تأكد من أن `baseURL` في `authClient` صحيح

## التحقق من السجلات

بعد إضافة التسجيل (logging)، تحقق من:
- Console logs في المتصفح
- Server logs في Terminal
- Convex logs في Dashboard
