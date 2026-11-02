import type { Config } from 'tailwindcss';
import { nokTailwindTheme } from '@nokgridcore/tokens/tailwind-theme';

// Same setup as packages/ui in NokGridCore, so blocks move into the docs as-is.
// Preflight is off: @nokgridcore/ui/styles.css already ships it.
export default {
	content: ['./app/**/*.{ts,tsx}', './blocks/**/*.{ts,tsx}', './site/**/*.{ts,tsx}'],
	theme: { extend: nokTailwindTheme },
	corePlugins: { preflight: false },
} satisfies Config;
