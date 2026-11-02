# NokGridCore gaps

Things `@nokgridcore/ui` and `@nokgridcore/tokens` (0.2.x) couldn't express while building this site, and how the blocks work around them. Each entry names where the workaround lives, so it can be removed once NokGridCore is fixed.

## Components

### Card
Used by the landing page's block cards (`site/block-card.tsx`).
- **Fixed width per size** (280/320/360px). Overridden with `style={{ width: '100%' }}` so cards fill the grid column.
- **Fixed media height** (120/140/160px, inline style). Overridden with `[&>div:first-child]:!h-auto`, so the 16:10 thumbnail sets the height.
- **Title is a `<p>`.** It's given heading semantics after mount (`role="heading"`, `aria-level="3"`). Card should take a heading level or render a heading.
- **Can't be a link.** The card is wrapped in a Next `<Link>`. Card should support `href`/`asChild`, or a link variant with its own hover and focus states.
- **Border is an inline style,** so the hover border needs `group-hover:!border-[var(--nok-color-border-strong)]`.

### Modal (`modal`, `modal.header`, `modal.body`, `modal.footer`)
Used by the block preview (`site/preview-modal.tsx`).
- **No dialog behaviour:** no `role="dialog"`/`aria-modal`, no Esc, no focus trap, no focus return, and the page behind isn't inert. The preview hosts `Modal` inside a native `<dialog>` (`showModal()`), which supplies all of these.
- **Widths stop at 800px** (`small`/`medium`/`large`). The preview overrides with `style={{ width: 'min(1200px, …)', height: … }}`.
- **Overlay colour is hard-coded** (`#080708` at 50%). Figma uses `colour/background/inverse` at 50%, which is white in dark mode, so the dark scrim in code is darker than Figma.
- **ModalHeader pads 24px all round;** the preview frame uses 16px with 4px below. Overridden with `[&>div]:!px-component-lg …`.
- **ModalHeader's title is a `<span>`** with no id, so the dialog is labelled with `aria-label` rather than `aria-labelledby`.
- **ModalFooter renders primary before secondary.** Figma puts the secondary ("Figma design") first, so both buttons are passed in the primary slot in that order.
- **ModalBody padding** (24px) is overridden to 16px/8px.

### Chip
- **Selected appearance is the orange primary colour.** The landing filter chips use `colour/background/inverse` with a `colour/background/canvas` label via `!` class overrides (`site/block-library.tsx`). See the token note below for why the label can't use `colour/text/inverse`.
- **Removable chip's ✕ isn't its own button** (an `onClick` on the icon inside the chip's `<button>`), so it can't be focused or labelled. Blocks 01 makes the whole chip the "remove filter" button.

### Button
- **Can't be a link** (no `href`/`asChild`). Link buttons (`site/link-button.tsx`) are `Button`s with `role="link"` that open the URL in a new tab.
- **`md` labels are 16px** (`text-base`); Figma's medium button uses 14px (label/lg). Most visible on the landing hero, follow band and preview footer. The mobile preview footer uses `sm` so all three buttons fit on one row.
- **Primary text is `text-white`** (Tailwind's literal white), not `colour/action/primary-text`. Wrong on the black theme, where primary is near-white in dark mode. Blocks pass `text-action-primary-text`.

### Content drawn white on brand/primary fills
Checkbox ticks, the TopBar and SidebarHeader logo glyphs (`color='white'` → `--nok-color-icon-white`) and `BadgeCount` (`text-text-white`) are white on brand fills. On the black theme that's white on near-white in dark mode. Blocks set `--nok-color-icon-white` to `action-primary-text` locally (the `onBrand` class in `blocks/users-admin`) and pass `text-action-primary-text` to `BadgeCount`.

### Table (`table`, `table-row`, `table-cell`, `table-header-cell`, `table-toolbar`)
Used by Blocks 01.
- **No table semantics:** all `<div>`s, no roles. Blocks 01 passes `role="table"/"row"/"columnheader"/"cell"` and `aria-sort`.
- **TableToolbar has no flexible-area slot** (Figma does). Blocks 01 puts the toolbar and the "Add filter" area side by side in a wrapper.
- **TableCell can't hold custom content** such as a link, so "View" renders as plain text, not link-coloured.
- **TableRow's built-in checkbox has no label.** Blocks 01 renders its own labelled `Checkbox` instead.
- **Sortable header cells** are `role="button"` divs with no Enter/Space handling. Blocks 01 adds it.
- **Header width:** Table wraps the header row in an inline-block that grows to its content, so flexible columns drift from the body. Blocks 01 sets `contain: inline-size` on the header row.

### MenuItem, TabGroup, TopBar
- **MenuItem** is always `role="menuitem"` (wrong in a sidebar nav) and has no Enter handling. Blocks 01 passes `role="link"`, `aria-current` and an Enter handler.
- **TabGroup** sets no `tablist`/`tab` roles and has no arrow-key handling.
- **TopBar's built-in search** can't be labelled or sized. Blocks 01 hides it and puts a labelled `SearchInput` in the `additional` slot.

## Tokens
- **`colour/text/inverse` aliases `colour/background/inverse`,** so text in that token is invisible on an inverse fill. The selected filter chip uses `colour/background/canvas` for its label instead.
- **Display/heading font weights are keywords** (`bold`, `semibold`). CSS has no `semibold`, so styles using the weight token fall back to normal weight. The site uses numeric weights (`site/site.css`, `pageTitle` in Blocks 01).
- **`@nokgridcore/tokens/tailwind-theme` has no type declarations.** See `types/nokgridcore-tokens.d.ts`.
