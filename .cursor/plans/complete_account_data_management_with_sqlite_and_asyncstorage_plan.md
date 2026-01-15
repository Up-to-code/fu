# Complete Account Data Management with SQLite and AsyncStorage

## Problem
Account screens need full data management with local persistence: profile image upload, phone updates, settings, address deletion, and simple modals. Need to use SQLite for structured data and AsyncStorage for simple preferences.

## Solution
1. Set up SQLite database for local storage (user profiles, addresses, settings)
2. Use AsyncStorage for simple preferences (language, notifications)
3. Implement profile image upload with base64 storage in SQLite
4. Remove old images when uploading new ones
5. Sync data between SQLite and Convex
6. Create simple custom modals (red text, minimal UI)
7. Implement address deletion
8. Navigation state management

## Implementation

### Files to Create/Modify

1. **`min-app/src/lib/database.ts`** (NEW)
   - SQLite database setup and initialization
   - Tables: user_profiles, addresses, settings
   - CRUD operations for each table
   - Functions: initDatabase, getUserProfile, updateUserProfile, saveAddress, deleteAddress, etc.

2. **`min-app/src/lib/storage.ts`** (NEW)
   - AsyncStorage helper functions
   - Simple preferences: language, notifications
   - Functions: getPreference, setPreference, clearPreferences

3. **`min-app/src/screens/account/_components/SimpleModal.tsx`** (NEW)
   - Simple modal with red text for destructive actions
   - Minimal UI: just text buttons, red for confirm
   - Props: visible, title, message, confirmText, cancelText, onConfirm, onCancel

4. **`convex/users.ts`**
   - Add `updateProfileImage` mutation
   - Add `deleteAddress` mutation
   - Update mutations to sync with local SQLite

5. **`min-app/src/screens/account/ProfileEditScreen.tsx`**
   - Add image picker using `expo-image-picker`
   - Convert image to base64
   - Save to SQLite (remove old image first)
   - Update phone number in SQLite and Convex
   - Sync with Convex on save

6. **`min-app/src/screens/account/SettingsScreen.tsx`**
   - Replace Alert.alert with SimpleModal
   - Load settings from SQLite
   - Save settings to SQLite
   - Use AsyncStorage for simple preferences

7. **`min-app/src/screens/account/LanguageScreen.tsx`**
   - Save language to AsyncStorage
   - Load on mount
   - Update UI immediately

8. **`min-app/src/screens/account/AddressesScreen.tsx`**
   - Load addresses from SQLite
   - Implement delete with SimpleModal
   - Sync delete with Convex
   - Refresh list after deletion

9. **`min-app/src/hooks/useLocalDatabase.ts`** (NEW)
   - Hook to interact with SQLite database
   - Returns: database instance, helper functions

10. **`min-app/src/hooks/useSettings.ts`** (NEW)
    - Hook for settings management
    - Combines SQLite and AsyncStorage
    - Returns: settings, updateSetting, isLoading

### Key Changes

1. **SQLite Database Schema**
   - user_profiles table: id, name, email, phone, image_base64, role, updated_at
   - addresses table: id, user_id, label, street, city, country, is_default, created_at
   - settings table: id, key, value, updated_at

2. **Profile Image Management**
   - Use expo-image-picker to select image
   - Convert to base64 (with compression)
   - Store in SQLite user_profiles.image_base64
   - Before saving: query old image, delete from SQLite, insert new
   - Sync image URL/base64 to Convex
   - Display from SQLite or Convex

3. **Phone Number Update**
   - Save to SQLite user_profiles.phone
   - Sync to Convex on save
   - Validate Saudi format

4. **Settings Management**
   - Complex settings in SQLite settings table
   - Simple preferences in AsyncStorage (language, notifications)
   - Load on app start
   - Sync with Convex if needed

5. **Address Deletion**
   - Delete from SQLite
   - Call Convex deleteAddress mutation
   - Refresh address list
   - Use SimpleModal for confirmation

6. **Simple Modal**
   - Overlay with semi-transparent background
   - White card with text
   - Red text for destructive actions
   - Simple text buttons (no fancy styling)
   - Cancel (gray) and Confirm (red) buttons

7. **Data Sync Strategy**
   - SQLite as primary local storage
   - Convex as cloud backup
   - Sync on save/update operations
   - Load from SQLite first, then sync with Convex

### Implementation Details

- Install expo-sqlite package
- Database initialization on app start
- Image compression before base64 conversion (max 1MB)
- Phone validation: Saudi format (05XXXXXXXX or +9665XXXXXXXX)
- Modal styling: red (#EF4444) for destructive, simple layout
- Error handling for all storage operations
- Navigation: use expo-router's navigation state

### Data Flow

```
ProfileEditScreen
  ├─ Image Picker → Base64 → SQLite (remove old) → Convex
  ├─ Phone → SQLite → Convex
  └─ Name/Email → SQLite → Convex

SettingsScreen
  ├─ Settings → SQLite
  ├─ Preferences → AsyncStorage
  └─ Logout/Delete → SimpleModal → Action

AddressesScreen
  ├─ Load from SQLite
  ├─ Delete → SQLite → Convex → Refresh
  └─ Add/Edit → SQLite → Convex

LanguageScreen
  ├─ Select → AsyncStorage → Update UI
  └─ Load from AsyncStorage on mount
```
