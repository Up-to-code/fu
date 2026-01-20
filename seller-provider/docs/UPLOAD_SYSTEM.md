# Upload System - Production Readiness

- Accepts JPEG/PNG images, MP4/MOV videos, and PDF files.
- Frontend enforces file type and size: images ≤ 5MB, video ≤ 100MB.
- Files are uploaded through secure endpoints and verified via VirusTotal hash lookup when `VIRUSTOTAL_API_KEY` is configured.
- Media records track `isVerified` before public use.
- Ownership checks enforced by Convex mutations; all actions are audited.

## Operations
- Cleanup orphan media: `security.cleanupOrphanMedia({ olderThanDays })`
- Delete mock data: `security.deleteMockData()`
- Storage usage: `security.getStorageUsage()`

## Environment
- Set `VIRUSTOTAL_API_KEY` in Convex environment for verification.

