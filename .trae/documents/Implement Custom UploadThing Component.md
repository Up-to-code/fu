I will implement the custom file upload component using UploadThing as requested.

**Note:** This implementation requires you to sign up at [uploadthing.com](https://uploadthing.com), create a new app, and obtain your `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`. You will need to add these to your `.env.local` file for the upload to work.

### 1. Install Dependencies
I will install the necessary packages for UploadThing in the `seller-provider` project.
- `uploadthing`
- `@uploadthing/react`

### 2. Configure UploadThing Backend
I will set up the server-side configuration required to handle file uploads.
- Create **`seller-provider/app/api/uploadthing/core.ts`**: Define the file router with permission to upload images and videos.
- Create **`seller-provider/app/api/uploadthing/route.ts`**: Create the Next.js API route handler to expose the file router.

### 3. Configure UploadThing Client
I will create the helper hooks to use UploadThing in client components.
- Create **`seller-provider/lib/uploadthing.ts`**: Export the `useUploadThing` hook and `UploadButton` components.

### 4. Develop Custom File Upload Component
I will build the reusable UI component that handles the file selection and upload process.
- Create **`seller-provider/components/ui/file-upload.tsx`**:
    - **Interface**: Drag-and-drop zone and file selection button.
    - **Progress**: Visual progress bar using standard UI components.
    - **Metadata**: Logic to extract and display file size, type, dimensions (image), and duration (video).
    - **State**: Handling for idle, uploading, success, and error states.

### 5. Create Test Page
I will create a dedicated page to demonstrate and test the new component.
- Create **`seller-provider/app/upload-test/page.tsx`**:
    - A clean page embedding the `FileUpload` component.
    - Sections to test image and video uploads separately.
    - Display area for the returned file URL and metadata.

### 6. Verification
- I will verify the build process (`npm run build`) to ensure no type errors are introduced.
- **Runtime Verification**: I will ask you to add your API keys and verify the upload functionality manually, as I cannot generate valid API keys myself.
