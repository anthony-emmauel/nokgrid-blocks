# Blocks 03 · Updraft

Updraft, an AI agents workspace: four screens, two of them with a collapsible sidebar.

- **Home** (`/blocks/updraft`): shortcuts, Nova's activity with channels to connect, experts to add, and a welcome card.
- **Chat** (`/chat`): a conversation with Nova, chat search, and a composer.
- **Agent** (`/agent`): Marigold, the Chief of Staff: what it does, its tools and skills, and what you get.
- **Integrations** (`/integrations`): an integrations library, with category chips and search.

Screens are client-side routes under the block's base path (`basePath` prop), so Back and Forward work.

Light and dark come from the token modes: set `data-theme="dark"` on a parent. The top bar's switch changes the mode and saves the choice.

Placeholder content (agents, chats, integrations and their counts) lives in `data.ts`. The third-party logos are served from `/blocks/updraft/logos/`.

## Components used

`TopBar`, `Sidebar` (`SidebarHeader`, `SidebarContent`, `SidebarGroup`), `MenuItem`, `Avatar`, `Badge`, `Button`, `Card`, `Chip`, `Divider`, `SearchInput`, `TextArea`, all from `@nokgridcore/ui`, with layout from `@nokgridcore/tokens`.

Composed in this repo:

- `IconTile` (`blocks/_shared/icon-tile.tsx`): Figma's icon tile, until NokGridCore ships one. Copy it with the block.
- `ToolChip` and `Disc` (`parts.tsx`): a chip with a logo, and an avatar above 40px.

See `NOKGRID-GAPS.md` for the workarounds.

Figma: [Updraft](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=127-500)
