I will implement the comprehensive media management system as requested, following SOLID principles and ensuring transactional integrity.

### 1. Media Tagging & Storage Architecture
I will create a dedicated `productMedia` table to decouple media from the product schema, enabling rich metadata storage.
- **New Schema**: Create `productMedia` table with fields: `storageId`, `url`, `type` (image/video), `productId`, `providerId`, `metadata` (size, dimensions, etc.), and timestamps.
- **Migration**: Update `sellerProducts` to reference this table instead of storing raw arrays, or maintain a sync for backward compatibility.

### 2. Cascading Deletion Workflow
I will implement a robust deletion process that cleans up storage and related records.
- **Update `deleteSellerProduct`**:
    - **Step 1**: Fetch all linked `productMedia` records.
    - **Step 2**: Delete the actual files from Convex Storage.
    - **Step 3**: Delete the `productMedia` database records.
    - **Step 4**: Soft-delete the product record (as per current pattern) or hard-delete based on your preference (the request implies removal). *I will assume hard deletion for media/storage to save space, but soft deletion for the product record itself to maintain history, unless explicitly instructed otherwise.*

### 3. Category Management & Deletion System
I will enhance the category system with PRO features and a safe deletion workflow.
- **Schema Update**: Add `isSystem` (boolean) and `backgroundColor` fields to `sellerCategories`.
- **UI Update**: Update category creation form to support PRO features (color/image toggle).
- **Deletion Logic**:
    - Add `deleteProducts` checkbox to the category delete dialog.
    - Implement a new mutation `deleteCategoryAndProducts` that:
        1. Checks if `deleteProducts` is true.
        2. If true, finds all products in that category.
        3. Trigger the `deleteSellerProduct` logic (including media cleanup) for each product.
        4. Soft-deletes the category.

### 4. Media Customization UI
I will build a modern media manager component.
- **Component**: Create `MediaManager` replacing the simple `MediaUpload`.
- **Features**: Drag-and-drop reordering, custom icon selection for categories, and visual "set as main" controls.

### 5. Safety & Consistency
- **Audit Logging**: Create an `auditLogs` table to track deletions (who deleted what and when).
- **Transactions**: Ensure all multi-step operations (like deleting a category and its products) run within a single Convex mutation to guarantee data consistency.

### Plan of Execution
1.  **Schema Updates**: Define `productMedia` and `auditLogs`, update `sellerCategories`.
2.  **Backend Logic**: Implement the new media handling and cascading deletion mutations.
3.  **Frontend Integration**: Update the product form to use the new media architecture and build the advanced category deletion modal.
4.  **Verification**: Test the full flow—uploading media, linking to products, and verifying complete cleanup upon deletion.
