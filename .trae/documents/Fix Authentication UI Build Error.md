I will fix the build error and remove the Social Login (OAuth) buttons from the authentication pages as requested.

### Plan

1.  **Fix Register Page Build Error**:
    *   Add `'use client';` to the top of `seller-provider/app/(auth)/register/page.tsx`.

2.  **Remove Social Login UI**:
    *   **Register Page**: Remove the "Or" divider and the `<SocialLoginButtons />` component from `seller-provider/app/(auth)/register/page.tsx`.
    *   **Login Page**: Remove the "Or" divider and the `<SocialLoginButtons />` component from `seller-provider/app/(auth)/login/page.tsx`.

3.  **Verification**:
    *   Ensure the application builds without errors.
    *   Verify that the Login and Register pages no longer display Google/Apple login options.
