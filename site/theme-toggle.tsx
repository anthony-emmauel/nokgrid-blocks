'use client';

import { useSyncExternalStore } from 'react';
import { Button } from '@nokgridcore/ui/button';

const readTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function subscribeToTheme(onChange: () => void) {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
	return () => observer.disconnect();
}

/**
 * Light/dark switch for the landing page, as on nokgrid.com. Sets data-theme on <html> and saves
 * the choice under the same `theme` key the shell's script reads, so block previews (same origin)
 * open in the mode picked here. A `?theme=` link still wins on load.
 */
export function ThemeToggle() {
	const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => 'light');

	function toggle() {
		const next = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// Storage can be blocked; the switch still applies to this visit.
		}
	}

	return (
		<Button
			variant='tertiary'
			size='lg'
			icon={theme === 'dark' ? 'Sun' : 'Moon'}
			iconPosition='only'
			aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			// Icon-only md/lg padding leaves less room than the icon (NOKGRID-GAPS.md), so it's dropped here.
			className='border-transparent bg-transparent !p-0'
			onClick={toggle}
		/>
	);
}
