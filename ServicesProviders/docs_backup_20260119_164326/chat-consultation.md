# Chat Consultation (Customer ↔ Provider)

## Purpose

Chat is the primary channel for clarifying requirements, exchanging attachments, confirming milestones, and coordinating revisions during delivery.

## Current UI Reference

- Messages page: `app/(dashboard)/messages/page.tsx`

## User Journey in Chat

1. Booking starts or links to a conversation thread.
2. Customer shares requirements, files, and notes.
3. Provider confirms scope and asks clarifying questions.
4. Provider posts milestone updates (e.g., “First draft ready”).
5. Customer requests revisions or confirms progress.
6. Provider requests completion confirmation when ready.

## UI/UX Requirements

- Conversation list + thread view
- Clear unread indicator
- Full-screen on mobile (sidebar collapses)
- Simple attachments control with validations

## Technical Implementation Notes

- Ordering: stable ordering by `(createdAt, id)`
- Real-time: polling or websockets; must support reconnect
- Read receipts: at least “read/unread”
- Attachment security:
  - Validate size and file type
  - Use signed upload URLs
  - Never expose private storage URLs publicly

## Screenshot Placeholders

- `docs/images/chat-conversations.png`: Conversation list
- `docs/images/chat-thread.png`: Full-screen message thread

