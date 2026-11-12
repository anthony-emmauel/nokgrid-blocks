# Blocks 04 · Folio

Folio, a team workspace: a space overview and one of its pages, under a top bar and a collapsible sidebar.

- **Space overview** (`/blocks/folio`): the space's banner (creator, collaborators, connected apps) and its pages in a table.
- **Page** (`/picker-app-usability-study`): a document with its meta row and sections, and a breadcrumb back to the space.

Open the page from its table row or from the sidebar's page tree. "Northstar Overhaul" in the sidebar opens and closes the tree, and "Search by title" filters it. The top bar's panel icon collapses the sidebar. Screens are client-side routes under the block's base path (`basePath` prop), so Back and Forward work.

Light and dark come from the token modes: set `data-theme="dark"` on a parent. The top bar's switch changes the mode and saves the choice.

Placeholder content (people, pages, the space and the document) lives in `data.ts`. Images are served from `/blocks/folio/`: the banner, the avatar photos (`people/`) and third-party logos (`logos/`). Logos belong to their owners and aren't covered by the MIT licence.

## Components used

`TopBar`, `Sidebar` (`SidebarContent`, `SidebarGroup`), `MenuItem`, `SearchInput`, `Breadcrumb`, `BreadcrumbItem`, `Avatar`, `Button`, `Card`, all from `@nokgridcore/ui`, with layout from `@nokgridcore/tokens`. The table's file icon uses `IconTile` (`blocks/_shared/icon-tile.tsx`).

See `NOKGRID-GAPS.md` for the workarounds.

Figma: [Folio](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=155-47)
