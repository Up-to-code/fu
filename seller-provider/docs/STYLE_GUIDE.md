# Seller-Provider Style Guide

## Design Tokens
- Primary: #242C5A (HSL 230 43% 24%)
- Secondary: #1A2144
- Accent: #33A3FF
- Success: #22C55E
- Warning: #F59E0B
- Error: #EF4444
- Neutrals: Slate scale
- Spacing: 8px baseline grid (4, 8, 12, 16, 24, 32, 40, 64)
- Radii: 4, 8, 12, 16
- Elevation: shadow-sm/md/lg/xl
- Motion: 150–300ms, easing cubic-bezier(0.2, 0.8, 0.2, 1), reduced-motion support

## Typography
- Scale: 12, 14, 16, 18, 24, 32, 40, 56
- Headings: H1–H6 hierarchy
- Body: 16 base
- Caption: 12–14

## Components
- Buttons: sm/md/lg; variants primary/secondary/ghost/destructive; loading state
- Inputs: labeled, help text, inline error, clear focus ring
- Dialogs: sm/md/lg; focus trap; overlay dismissal; ESC
- Tables: sortable headers, pagination, skeletons, empty states
- Menus: keyboard navigation; ARIA roles

## Accessibility
- WCAG 2.1 AA contrast
- Keyboard navigation across dialogs, menus, tables
- Screen reader labels and alerts

## Responsive
- Breakpoints: 320, 768, 1024, 1440
- Mobile-first layout; stacked forms/tables

## Performance
- Lazy load non-critical components
- Virtualized lists for large data
- Optimized SVGs/images

## Testing
- Visual regression via Playwright screenshot assertions
- Unit tests for form validation and component logic

## Usage
- Tokens defined in `app/globals.css` via CSS variables and consumed by Tailwind theme.
