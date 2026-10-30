# NokGridCore Blocks

Ready-made dashboard blocks built with [NokGridCore](https://www.nokgrid.com/): full sections like admin tables, KPI rows and chart panels, composed only from `@nokgridcore/ui` components and tokens, in light and dark.

- **Live demo:** [blocks.nokgrid.com](https://blocks.nokgrid.com)
- **Figma (free):** NokGridCore - Blocks on Figma Community
- **Design system:** [nokgrid.com](https://www.nokgrid.com/) · [github.com/nokgridcore/nokgrid](https://github.com/nokgridcore/nokgrid)

## Blocks

| # | Block | Figma | Status |
|---|---|---|---|
| 01 | [Users admin](https://blocks.nokgrid.com/blocks/users-admin) | [Frame](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=36-7279) | Live |
| 02 | AI resume builder | [Frame](https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=53-1702) | In design |

New blocks are added regularly.

## How the site is built

- **`/`** is the landing page. Its cards, filter chips, counts, the "NN blocks" meta line and the preview modal (`/?block=<slug>`) all come from `blocks/registry.ts`. It uses NokGridCore's default (orange) tokens.
- **`/blocks/<slug>`** is a block on its own, full screen, in the black theme (`themes/black.css`).
- The two have separate root layouts (`app/(site)` and `app/(blocks)`), so the black theme never loads on the landing page.
- `NOKGRID-GAPS.md` lists what NokGridCore couldn't express yet, and where each workaround lives.

## Adding a block

1. Add its folder in `blocks/<slug>/`: `index.tsx`, `data.ts` and `README.md`.
2. Add a registry entry in `blocks/registry.ts` (status `in-design` until it ships).
3. When it ships, set `status: 'live'` and add its loader in `blocks/loaders.ts`.
4. Put its 16:10 thumbnail in `public/blocks/<slug>/thumbnail.png`, plus `.avif`/`.webp`, and an optional `cover.webm`/`.mp4`.

## Using a block

Each block lives in `blocks/<slug>/`:

- `index.tsx`: the block. It imports only `react`, `@nokgridcore/ui/*`, `@nokgridcore/tokens` and `./data`.
- `data.ts`: placeholder data. Swap it for your own.
- `README.md`: what the block is and the components it uses.

Copy the folder into your app, then install the packages and set up the stylesheet and fonts as described in the [`@nokgridcore/ui` README](https://www.npmjs.com/package/@nokgridcore/ui). Block layout uses Tailwind v3 with `nokTailwindTheme` from `@nokgridcore/tokens/tailwind-theme`; add `blocks/**/*.tsx` to your Tailwind `content`. For the black look, import `themes/black.css` after the NokGridCore stylesheet.

Light and dark come from the token modes: set `data-theme="dark"` on any parent element.

## Developing

```sh
npm install
npm run dev                      # http://localhost:3000
npm run lint && npm run check-types && npm run build
npx playwright install chromium  # once, for screenshots
npm run shots -- <slug>          # light/dark at 390/1440/1920 into shots/
```

Each block is built on a `blocks/<slug>` branch and opened as a PR; Netlify posts a deploy preview on it.

Made by [Emmanuel Anthony](https://emmanuelanthony.site). MIT licensed.
