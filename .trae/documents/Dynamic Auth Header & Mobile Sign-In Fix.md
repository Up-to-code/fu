I will enhance the Google authentication implementation by making the Landing Header dynamic and responsive, ensuring it correctly handles both authenticated ("sleeper") and unauthenticated states.

### Plan

1.  **Enhance `LandingHeader.tsx` (Client-Side Logic)**:
    *   Convert to a Client Component (`"use client"`).
    *   Integrate `useAuth` to detect the user's authentication state.
    *   **State: Authenticated ("Sleeper" / Active)**:
        *   Replace "Sign In" and "Join Us" buttons with a **"Dashboard"** button.
        *   This ensures logged-in users are immediately directed to their "normal/default interface" (the Dashboard) instead of being asked to sign in again.
    *   **State: Unauthenticated**:
        *   Ensure the **"Sign In"** button is visible on **all devices** (removing the `hidden sm:inline-block` restriction).
        *   The "Sign In" button will link to `/login`, which triggers the Google Auth flow.

2.  **Refine UI/UX**:
    *   Ensure smooth transitions (loading states) when checking auth status to avoid layout shift.
    *   Optimize mobile responsiveness to ensure buttons fit on small screens.

3.  **Verification**:
    *   Verify that the header dynamically updates based on login status.
    *   Confirm that mobile users can now see and use the "Sign In" button.
