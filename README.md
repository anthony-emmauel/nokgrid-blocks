# NokGridCore Blocks

Ready-made dashboard blocks built with [NokGridCore](https://www.nokgrid.com/): full sections like admin tables, KPI rows and chart panels, composed only from `@nokgridcore/ui` components and tokens, in light and dark.

- **Live previews and code:** [nokgrid-blocks.netlify.app](https://nokgrid-blocks.netlify.app)
- **Figma (free):** NokGridCore - Blocks on Figma Community
- **Design system:** [nokgrid.com](https://www.nokgrid.com/) · [github.com/nokgridcore/nokgrid](https://github.com/nokgridcore/nokgrid)

## Blocks

| # | Block | Figma | Status |
|---|---|---|---|
| 01 | Users admin | | In progress |

New blocks are added regularly.

## Using a block

Each block lives in `blocks/<slug>/`:

- `index.tsx`: the block. It imports only `react`, `@nokgridcore/ui/*`, `@nokgridcore/tokens` and `./data`.
- `data.ts`: placeholder data. Swap it for your own.
- `README.md`: what the block is and the components it uses.

Copy the folder into your app, then install the packages and set up the stylesheet and fonts as described in the [`@nokgridcore/ui` README](https://www.npmjs.com/package/@nokgridcore/ui). Block layout uses Tailwind v3 with `nokTailwindTheme` from `@nokgridcore/tokens/tailwind-theme`; add `blocks/**/*.tsx` to your Tailwind `content`.

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
