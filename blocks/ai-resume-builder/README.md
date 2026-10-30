# Blocks 02 · AI resume builder

Draftwell, an AI resume builder: a collapsible sidebar, six screens and an Upgrade to Pro modal.

- **My dashboard** (`/blocks/ai-resume-builder`): stats, a tools grid, recent resumes and resume progress.
- **Sample library** (`/sample-library`): All samples / Saved tabs, search by role, and category chips.
- **Job search** (`/job-search`): status tabs, title and location search, a job list and the selected job's details.
- **Project editor** (`/project-editor`): section tabs, a video guide, the resume score, projects with their checks, and the project form.
- **Review my resume** (`/review`): the resume, a score out of 100 with sub-scores, and issues filtered by type.
- **Settings** (`/settings`): language, promo code, email, billing and account deletion.

Screens are client-side routes under the block's base path (`basePath` prop), so Back and Forward work. Pro items, locked checks, "Fix", "Suggest bullet", "Tailor my resume", "Manage billing" and the Upgrade buttons open the Upgrade modal. It's a native `<dialog>`, so Esc, focus containment and focus return come from the browser.

Light and dark come from the token modes: set `data-theme="dark"` on a parent.

Placeholder content (the user, nav, stats, samples, jobs, projects, review issues, plans) lives in `data.ts`. The video guide still is served from `/blocks/ai-resume-builder/video-guide.jpg`.

## Components used

`Sidebar` (`SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarFooter`), `MenuItem`, `Avatar`, `Badge`, `Button`, `Card`, `Chip`, `Divider`, `Input`, `SearchInput`, `Select`, `Option`, `TextArea`, `Toggle`, `Radio`, `Progress`, `Tab`, `TabGroup`, `Modal` (`ModalHeader`, `ModalBody`, `ModalFooter`), all from `@nokgridcore/ui`, with layout from `@nokgridcore/tokens`.

Two pieces are composed in this repo:

- `IconTile` (`blocks/_shared/icon-tile.tsx`): Figma's icon tile, built to its spec until NokGridCore ships one. Copy it with the block.
- `ResumeSheet` (`resume-sheet.tsx`): the resume artwork, drawn from token rects, as a thumbnail or a full page.

See `NOKGRID-GAPS.md` for the workarounds.

Figma: [AI resume builder](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=53-1702)
