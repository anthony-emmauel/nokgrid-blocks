'use client';

import { Button, type ButtonProps } from '@nokgridcore/ui/button';

/**
 * A NokGridCore Button that opens a URL in a new tab. Button only renders a
 * <button> (no href or asChild), so it gets role="link" and opens the URL
 * itself. Listed in NOKGRID-GAPS.md.
 */
export function LinkButton({ href, children, ...props }: ButtonProps & { href: string }) {
	return (
		<Button
			{...props}
			role='link'
			onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}>
			{children}
			<span className='sr-only'> (opens in a new tab)</span>
		</Button>
	);
}
