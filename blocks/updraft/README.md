# Blocks 03 · Updraft

The Integrations page of Updraft, an AI agents workspace: a collapsible account sidebar, a top bar and an integrations library.

- Category chips filter the list.
- The search icon opens a search box that filters by name or description. Esc clears it.
- The sidebar collapses to an icon rail.
- Light and dark come from the token modes: set `data-theme="dark"` on a parent. The top bar's switch changes the mode and saves the choice.

Placeholder content (nav, integrations and their counts) lives in `data.ts`. The third-party logos are served from `/blocks/updraft/logos/`.

## Components used

`TopBar`, `Sidebar` (`SidebarHeader`, `SidebarContent`, `SidebarGroup`), `MenuItem`, `Avatar`, `Button`, `Card`, `Chip`, `SearchInput`, all from `@nokgridcore/ui`, with layout from `@nokgridcore/tokens`.

See `NOKGRID-GAPS.md` for the workarounds.

Figma: [Updraft — Integrations](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=127-500)
