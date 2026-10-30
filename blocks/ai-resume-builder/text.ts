import type { CSSProperties } from 'react';
import { nokTailwindTheme } from '@nokgridcore/tokens/tailwind-theme';

// Token text styles, applied inline the way @nokgridcore/ui does. The package's
// textStyles cover body/label/caption only, so the heading and display styles
// are built from their typography variables. Weights are numbers: the weight
// tokens are keywords and CSS has no "semibold" (see NOKGRID-GAPS.md).
const brand = (name: string, weight: number): CSSProperties => ({
	fontFamily: `var(--nok-typography-${name}-font-family)`,
	fontSize: `var(--nok-typography-${name}-font-size)`,
	lineHeight: `var(--nok-typography-${name}-line-height)`,
	fontWeight: weight,
});

export const text = {
	...nokTailwindTheme.textStyles,
	'heading-sm': brand('heading-sm', 600),
	'heading-md': brand('heading-md', 600),
	'heading-lg': brand('heading-lg', 600),
	'display-sm': brand('display-sm', 600),
};
