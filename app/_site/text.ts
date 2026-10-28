import { nokTailwindTheme } from '@nokgridcore/tokens/tailwind-theme';

/** Token text styles, applied inline the same way @nokgridcore/ui does. */
export const text = nokTailwindTheme.textStyles;

export const display = {
	fontFamily: 'var(--nok-typography-display-md-font-family)',
	fontSize: 'var(--nok-typography-display-md-font-size)',
	// The token's value is the keyword "semibold", which CSS doesn't accept.
	fontWeight: 600,
	lineHeight: 'var(--nok-typography-display-md-line-height)',
} as const;
