import { useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { Icon, type IconName } from '@nokgridcore/ui/icon';
import { TopBar } from '@nokgridcore/ui/top-bar';
import { app, user, type LogoName, type Screen } from './data';
import { text } from './text';

export interface Nav {
	go: (screen: Screen) => void;
}

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

/**
 * Figma's medium chip with a logo or icon. Chip only takes a named icon and is always a button;
 * these are labels, so it's composed here from Chip's tokens (NOKGRID-GAPS.md).
 */
export function ToolChip({ logo, icon, label }: { logo?: LogoName; icon?: IconName; label: string }) {
	return (
		<span
			className='inline-flex h-8 shrink-0 items-center gap-component-xs whitespace-nowrap rounded-full border border-solid border-border-default px-component-md text-text-primary'
			style={text['label-lg']}>
			{logo && <Logo name={logo} size={16} />}
			{icon && <Icon name={icon} size='sm' color='default' />}
			{label}
		</span>
	);
}

/**
 * Avatar at Figma's larger sizes. Avatar stops at 40px, so the size and the 30% initials scale are
 * set here (NOKGRID-GAPS.md).
 */
export function Disc({ size, initials, icon }: { size: number; initials?: string; icon?: IconName }) {
	return (
		<Avatar
			type={icon ? 'icon' : 'initials'}
			icon={icon}
			initials={initials}
			className='[&>span]:![font-size:var(--disc-text)] [&>span]:![line-height:1.4] [&>svg]:!size-[var(--disc-icon)]'
			style={
				{
					width: size,
					height: size,
					'--disc-text': `${size * 0.3}px`,
					'--disc-icon': `${size / 2}px`,
				} as CSSProperties
			}
		/>
	);
}

/** Centres a logo, avatar or tile in Card's 48px media slot, as Figma does; Card aligns it top-left. */
export function CardMedia({ children }: { children: ReactNode }) {
	return <span className='flex h-full w-12 items-center justify-center'>{children}</span>;
}

/** The bordered surface the Home activity feed sits in. */
export function Panel({ children, className = '', ...props }: { children: ReactNode; className?: string; 'aria-label'?: string }) {
	return (
		<section className={`rounded-xl border border-solid border-border-default bg-background-surface ${className}`} {...props}>
			{children}
		</section>
	);
}

const readTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function subscribeToTheme(onChange: () => void) {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
	return () => observer.disconnect();
}

/** Switches the token mode (data-theme on <html>) and remembers the choice. */
function ThemeSwitch({ plain }: { plain?: boolean }) {
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
			className={plain ? plainButton : undefined}
			onClick={toggle}
		/>
	);
}

/**
 * The top bar. `showBrand` is for the screens without a sidebar, where it carries the product name.
 * The avatar opens the account area, the only place Integrations is reached from.
 */
export function AppTopBar({ nav, showBrand, plainSwitch }: { nav: Nav; showBrand?: boolean; plainSwitch?: boolean }) {
	return (
		<TopBar
			logo={app.logo}
			productName={app.name}
			showSidebarToggle={false}
			showLogo={Boolean(showBrand)}
			showProductName={Boolean(showBrand)}
			showSearch={false}
			showActions
			className='w-full shrink-0'
			actions={
				<div className='flex items-center gap-component-sm'>
					<ThemeSwitch plain={plainSwitch} />
					<button
						type='button'
						aria-label='Account'
						onClick={() => nav.go('integrations')}
						className='rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'>
						<Avatar type='initials' size='sm' initials={user.initials} />
					</button>
				</div>
			}
		/>
	);
}
