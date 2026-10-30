'use client';

import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { MenuItem } from '@nokgridcore/ui/menu-item';
import { Sidebar } from '@nokgridcore/ui/sidebar';
import { SidebarContent } from '@nokgridcore/ui/sidebar-content';
import { SidebarFooter } from '@nokgridcore/ui/sidebar-footer';
import { SidebarGroup } from '@nokgridcore/ui/sidebar-group';
import { SidebarHeader } from '@nokgridcore/ui/sidebar-header';
import { app, extrasNav, user, workspaceNav, type NavItem, type Screen } from './data';
import { Dashboard } from './screens/dashboard';
import { Editor } from './screens/editor';
import { Jobs } from './screens/jobs';
import { Review } from './screens/review';
import { Samples } from './screens/samples';
import { Settings } from './screens/settings';
import { text } from './text';
import { UpgradeModal } from './upgrade-modal';

const SCREENS: Screen[] = ['dashboard', 'sample-library', 'job-search', 'project-editor', 'review', 'settings'];

// Content on brand/primary fills: the components draw it white, the black theme
// uses action/primary-text (see NOKGRID-GAPS.md).
const onBrand = '[--nok-color-icon-white:var(--nok-color-action-primary-text)]';

const toScreen = (segment?: string): Screen => (SCREENS.includes(segment as Screen) ? (segment as Screen) : 'dashboard');

/** Enter activates a div-based control, the way it does a button. */
function activateOnEnter(event: KeyboardEvent<HTMLElement>) {
	if (event.key !== 'Enter') return;
	// Without this, an Enter that opens the Upgrade dialog also activates the close button it focuses.
	event.preventDefault();
	event.currentTarget.click();
}

export interface Nav {
	go: (screen: Screen) => void;
	upgrade: () => void;
}

/**
 * Draftwell, an AI resume builder: a sidebar shell around six screens and an
 * Upgrade to Pro modal. Screens are client-side routes under `basePath`
 * (e.g. /blocks/ai-resume-builder/settings), so they can be linked and Back works.
 */
export default function AiResumeBuilder({
	screen: segments = [],
	basePath = '/blocks/ai-resume-builder',
}: {
	screen?: string[];
	basePath?: string;
}) {
	const [screen, setScreen] = useState<Screen>(() => toScreen(segments[0]));
	const [collapsed, setCollapsed] = useState(false);
	const [upgradeOpen, setUpgradeOpen] = useState(false);

	const go = useCallback(
		(next: Screen) => {
			setScreen(next);
			window.history.pushState(null, '', next === 'dashboard' ? basePath : `${basePath}/${next}`);
			document.getElementById('draftwell-main')?.scrollTo({ top: 0 });
		},
		[basePath],
	);

	useEffect(() => {
		const sync = () => setScreen(toScreen(window.location.pathname.slice(basePath.length + 1).split('/')[0]));
		window.addEventListener('popstate', sync);
		return () => window.removeEventListener('popstate', sync);
	}, [basePath]);

	const nav: Nav = { go, upgrade: () => setUpgradeOpen(true) };

	const navItem = (item: NavItem) => (
		<MenuItem
			key={item.label}
			role='link'
			aria-label={item.pro ? `${item.label} (Pro)` : item.label}
			aria-current={item.screen === screen ? 'page' : undefined}
			title={collapsed ? item.label : undefined}
			state={item.screen === screen ? 'active' : 'default'}
			showLeadingIcon
			icon={item.icon}
			showLabel
			label={item.label}
			showBadge={item.pro}
			badgeVariant='info'
			badgeLabel='Pro'
			onClick={() => (item.screen ? go(item.screen) : nav.upgrade())}
			onKeyDown={activateOnEnter}
		/>
	);

	return (
		<div className='flex h-screen bg-background-canvas'>
			<Sidebar
				role='navigation'
				aria-label={app.name}
				collapsed={collapsed}
				onCollapsedChange={setCollapsed}
				showBorder={false}
				// The collapsed rail's expand button floats past the sidebar's edge; keep it above <main>.
				className={`relative z-10 shrink-0 ${onBrand}`}
				style={{ height: '100%', borderRight: '1px solid var(--nok-color-border-default)' }}>
				<SidebarHeader logo='FileText' title={app.name} subtext={app.tagline} />
				<SidebarContent style={{ gap: 'var(--nok-spacing-component-md)' }}>
					{collapsed ?
						// The rail swaps the button for an icon item, as in Figma.
						<SidebarGroup showLabel={false}>
							<MenuItem
								role='link'
								aria-label='Create new resume'
								title='Create new resume'
								showLeadingIcon
								icon='FilePlus'
								onClick={() => go('project-editor')}
								onKeyDown={activateOnEnter}
							/>
						</SidebarGroup>
					:	<div className='px-component-md py-component-sm'>
							<Button
								variant='primary'
								size='md'
								icon='FilePlus'
								className='w-full text-action-primary-text'
								onClick={() => go('project-editor')}>
								Create new resume
							</Button>
						</div>
					}
					<SidebarGroup label='Workspace'>{workspaceNav.map(navItem)}</SidebarGroup>
					<SidebarGroup label='Extras' showDivider>
						{extrasNav.map(navItem)}
					</SidebarGroup>
				</SidebarContent>
				{/* SidebarFooter's profile is image-only; the initials avatar goes in its content slot. */}
				<SidebarFooter
					showProfile={false}
					showContent
					content={
						<button
							type='button'
							onClick={() => go('settings')}
							aria-label={`${user.name}, ${user.plan}. Account settings`}
							className={`flex w-full items-center gap-component-sm rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)] ${collapsed ? 'justify-center' : ''}`}>
							<Avatar type='initials' size='sm' initials={user.initials} />
							{!collapsed && (
								<span className='flex min-w-0 flex-col'>
									<span className='truncate text-text-primary' style={text['label-md']}>
										{user.name}
									</span>
									<span className='truncate text-text-secondary' style={text['caption-md']}>
										{user.plan}
									</span>
								</span>
							)}
						</button>
					}
				/>
			</Sidebar>

			<main id='draftwell-main' className='min-w-0 flex-1 overflow-y-auto p-layout-section'>
				{screen === 'dashboard' && <Dashboard nav={nav} />}
				{screen === 'sample-library' && <Samples nav={nav} />}
				{screen === 'job-search' && <Jobs nav={nav} />}
				{screen === 'project-editor' && <Editor nav={nav} />}
				{screen === 'review' && <Review nav={nav} />}
				{screen === 'settings' && <Settings nav={nav} />}
			</main>

			{upgradeOpen && <UpgradeModal onClose={() => setUpgradeOpen(false)} />}
		</div>
	);
}
