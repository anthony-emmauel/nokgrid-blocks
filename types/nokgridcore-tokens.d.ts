// @nokgridcore/tokens ships tailwind-theme.js without type declarations.
declare module '@nokgridcore/tokens/tailwind-theme' {
	import type { CSSProperties } from 'react';

	type TextStyleName =
		| 'body-lg'
		| 'body-md'
		| 'body-sm'
		| 'label-lg'
		| 'label-md'
		| 'label-sm'
		| 'caption-md'
		| 'caption-sm';

	export const nokTailwindTheme: {
		colors: Record<string, string>;
		spacing: Record<string, string>;
		borderRadius: Record<string, string>;
		fontFamily: Record<string, string>;
		textStyles: Record<TextStyleName, CSSProperties>;
	};
}
