# Create "ServicesProviders" with Streamlined Dashboard

## 1. Project Initialization
- Create `ServicesProviders` directory.
- Copy `nextjs-1` contents (preserving `shadcn/ui` components, `tailwind` config, `RTL` support, and architecture).
- Update project identity in `package.json`.

## 2. Streamline Architecture & Navigation
- **Simplify Sidebar:** Reduce navigation to 5 core sections:
  1. **Overview (الرئيسية):** Key metrics and active tasks.
  2. **My Services (خدماتي):** Manage service offerings.
  3. **Messages (الرسائل):** Client communication hub.
  4. **Finance (المالية):** Earnings and invoices.
  5. **Settings (الإعدادات):** Profile and account.
- **Remove/Archive Unused Routes:** Remove `categories`, `orders` (replaced by booking flow in messages/dashboard), `blog`, `team` from the sidebar to reduce clutter.

## 3. Core Component Implementation

### A. Services Page (Modified `products`)
- **Route:** `app/(dashboard)/services`
- **Function:** List services and "Add Service" form.
- **Form Updates:**
  - Adapt `products/new` to `services/new`.
  - Focus fields: Title, Description, Portfolio Images, Price (Hourly/Fixed), Delivery Time.
  - Remove E-commerce fields: SKU, Stock, Shipping.

### B. Messages Hub (New Feature)
- **Route:** `app/(dashboard)/messages`
- **Design:** Two-pane layout (Conversation List + Chat Window).
- **Features:**
  - Real-time chat UI (using existing UI components).
  - "Quick Actions" for sending offers or booking confirmations within chat.

### C. Finance/Wallet (New Page)
- **Route:** `app/(dashboard)/finance`
- **Features:**
  - Simple chart showing Earnings (adapting `components/shared/DashboardCharts.tsx`).
  - List of recent transactions/payouts.

### D. Dashboard Overview
- **Route:** `app/(dashboard)/dashboard`
- **Layout:**
  - Top: 3 Key Cards (Active Jobs, Unread Messages, Total Earnings).
  - Middle: "Action Required" section (New inquiries, pending bookings).
  - Bottom: Performance graph.

## 4. Design System Consistency
- Strict adherence to existing Color Palette (`#242C5A` primary).
- Maintain RTL direction and Arabic language.
- Use existing `components/ui` (shadcn/ui) for all new elements to ensure visual consistency.
