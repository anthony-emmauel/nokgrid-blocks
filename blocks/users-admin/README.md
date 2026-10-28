# Blocks 01 · Users admin

An admin-centre users screen: top bar, sidebar nav, breadcrumb, page header, secondary nav, a command bar and a users table.

- Search filters the table by display name or user principal name.
- **Add filter** opens a User type dropdown (Member / Guest / Admin). Choosing one adds a removable chip next to the search box and filters the rows.
- Rows can be selected one by one or all at once from the header checkbox. **Edit** turns on with exactly one selected row, **Delete** with one or more.
- Display name and user principal name are sortable.
- Light and dark come from the token modes: set `data-theme="dark"` on a parent.

Placeholder content (users, nav items, commands, the signed-in profile) lives in `data.ts`. The profile photo is served from `/blocks/users-admin/priya-raman.jpg`; point `currentUser.photo` at your own.

## Components used

`TopBar`, `Sidebar` (`SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarFooter`), `MenuItem`, `Breadcrumb`, `BreadcrumbItem`, `Avatar`, `BadgeCount`, `Button`, `SearchInput`, `Tab`, `Table` (`TableToolbar`, `TableHeaderCell`, `TableRow`, `TableCell`), `Checkbox`, `Popover`, `Option`, `Chip`, all from `@nokgridcore/ui`, with layout from `@nokgridcore/tokens`.

Figma: [Users — admin center](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=2-1969)
