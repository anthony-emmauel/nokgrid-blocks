import { useSyncExternalStore, type ReactNode } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { TopBar } from '@nokgridcore/ui/top-bar';
import { user, type LogoName } from './data';

// Card has a fixed width per size; blocks stretch it to their grid column (NOKGRID-GAPS.md).
export const fill = { width: '100%' };
// Primary buttons on the black theme take action/primary-text, not white (NOKGRID-GAPS.md).
export const primaryText = 'text-action-primary-text';
// Figma's "tertiary with fills cleared": NokGridCore has no ghost button.
export const plainButton = 'border-transparent bg-transparent';

const LOGO_ROOT = '/blocks/updraft/logos';

// Width of each artwork in its square, from the Figma logo frames. The rest are full-bleed squares.
const logoWidth: Partial<Record<LogoName, string>> = {
	jira: '96.7%',
	outlook: '96%',
	'google-sheets': '72.7%',
	// The Confluence export holds the mark and the wordmark; Figma crops to the mark.
	confluence: '800%',
};

/** A third-party logo from Figma, in a square `size` box. GitHub's mark is black, so dark mode inverts it. */
export function Logo({ name, size }: { name: LogoName; size: number }) {
	return (
		<span
			aria-hidden='true'
			className={`flex shrink-0 items-center overflow-hidden ${name === 'confluence' ? 'justify-start' : 'justify-center'}`}
			style={{ width: size, height: size }}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`${LOGO_ROOT}/${name}.svg`}
				alt=''
				className={`block h-auto max-w-none ${name === 'github' ? '[[data-theme=dark]_&]:invert' : ''}`}
				style={{ width: logoWidth[name] ?? '100%' }}
			/>
		</span>
	);
}

/** Centres a logo in Card's 48px media slot, as Figma does; Card aligns it top-left. */
export function CardMedia({ children }: { children: ReactNode }) {
	return <span className='flex h-full w-12 items-center justify-center'>{children}</span>;
}

const readTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function subscribeToTheme(onChange: () => void) {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
	return () => observer.disconnect();
}

/** Switches the token mode (data-theme on <html>) and remembers the choice. */
function ThemeSwitch() {
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
			size='sm'
			icon={theme === 'dark' ? 'Sun' : 'Moon'}
			iconPosition='only'
			aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			className={plainButton}
			onClick={toggle}
		/>
	);
}

/** The top bar: the sidebar carries the product name, so it holds only the theme switch and the avatar. */
export function AppTopBar() {
	return (
		<TopBar
			showSidebarToggle={false}
			showLogo={false}
			showProductName={false}
			showSearch={false}
			showActions
			className='w-full shrink-0'
			actions={
				<div className='flex items-center gap-component-sm'>
					<ThemeSwitch />
					<Avatar type='initials' size='sm' initials={user.initials} />
				</div>
			}
		/>
	);
}
