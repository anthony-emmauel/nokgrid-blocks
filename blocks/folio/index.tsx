'use client';

import { useCallback, useEffect, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { Breadcrumb } from '@nokgridcore/ui/breadcrumb';
import { BreadcrumbItem } from '@nokgridcore/ui/breadcrumb-item';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import type { IconName } from '@nokgridcore/ui/icon';
import { MenuItem } from '@nokgridcore/ui/menu-item';
import { SearchInput } from '@nokgridcore/ui/search-input';
import { Sidebar } from '@nokgridcore/ui/sidebar';
import { SidebarContent } from '@nokgridcore/ui/sidebar-content';
import { SidebarGroup } from '@nokgridcore/ui/sidebar-group';
import { TopBar } from '@nokgridcore/ui/top-bar';
import { app, docs, linkedApps, mainNav, me, page, promo, space, spaceApps, type Screen } from './data';
import { Page } from './page';
import { Face, FolioMark, Logo, plainButton } from './parts';
import { Space } from './space';
import { text } from './text';

const PAGE_SLUG = docs.find((d) => d.opens)!.slug;
const toScreen = (segment?: string): Screen => (segment === PAGE_SLUG ? 'page' : 'space');

// Content on brand/primary fills: the components draw it white, the black theme
// uses action/primary-text (see NOKGRID-GAPS.md).
const onBrand = '[--nok-color-icon-white:var(--nok-color-action-primary-text)]';

/** Enter activates a div-based control, the way it does a button. */
function activateOnEnter(event: KeyboardEvent<HTMLElement>) {
	if (event.key !== 'Enter') return;
	event.preventDefault();
	event.currentTarget.click();
}

const readTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
function subscribeToTheme(onChange: () => void) {
	const observer = new MutationObserver(onChange);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
	return () => observer.disconnect();
}

/**
 * Folio, a team workspace: a space overview and one of its pages. The page is a
 * client-side route under `basePath` (/blocks/folio/picker-app-usability-study),
 * so it can be linked and Back works.
 */
export default function Folio({ screen: segments = [], basePath = '/blocks/folio' }: { screen?: string[]; basePath?: string }) {
	const [screen, setScreen] = useState<Screen>(() => toScreen(segments[0]));
	const [collapsed, setCollapsed] = useState(false);
	// The space's page tree: closed on the overview, open on a page (as in Figma).
	const [treeOpen, setTreeOpen] = useState(() => toScreen(segments[0]) === 'page');
	const [query, setQuery] = useState('');
	const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => 'light');

	const go = useCallback(
		(next: Screen) => {
			setScreen(next);
			if (next === 'page') setTreeOpen(true);
			window.history.pushState(null, '', next === 'space' ? basePath : `${basePath}/${PAGE_SLUG}`);
			document.getElementById('folio-main')?.scrollTo({ top: 0 });
		},
		[basePath],
	);

	useEffect(() => {
		const sync = () => setScreen(toScreen(window.location.pathname.slice(basePath.length + 1).split('/')[0]));
		window.addEventListener('popstate', sync);
		return () => window.removeEventListener('popstate', sync);
	}, [basePath]);

	function toggleTheme() {
		const next = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// Storage can be blocked; the switch still applies to this visit.
		}
	}

	const item = (
		label: string,
		icon: IconName,
		options: { trailing?: IconName; active?: boolean; onClick?: () => void; expanded?: boolean } = {},
	) => (
		<MenuItem
			key={label}
			role={options.onClick ? 'link' : 'button'}
			aria-label={label}
			aria-current={options.active ? 'page' : undefined}
			aria-expanded={options.expanded}
			title={collapsed ? label : undefined}
			state={options.active ? 'active' : 'default'}
			showLeadingIcon
			icon={icon}
			showLabel
			label={label}
			showTrailingIcon={Boolean(options.trailing)}
			trailingIcon={options.trailing}
			onClick={options.onClick}
			onKeyDown={options.onClick ? activateOnEnter : undefined}
		/>
	);

	const q = query.trim().toLowerCase();
	const treeDocs = docs.filter((d) => !q || d.title.toLowerCase().includes(q));

	return (
		<div className={`flex h-screen flex-col bg-background-canvas ${onBrand}`}>
			<TopBar
				showSidebarToggle
				onSidebarToggle={() => setCollapsed((value) => !value)}
				showLogo={false}
				showProductName={false}
				showLeading
				leading={
					<span className='flex items-center gap-component-sm text-text-primary' style={text['label-md']}>
						<span className='flex size-6 items-center justify-center'>
							<FolioMark />
						</span>
						{app.name}
					</span>
				}
				showAdditional
				additional={
					<div className='flex w-full justify-center'>
						<div className='w-[591px] max-w-full'>
							<SearchInput size='sm' placeholder={app.search} aria-label={app.search} />
						</div>
					</div>
				}
				showSearch={false}
				showActions
				actions={
					<div className='flex items-center gap-component-xs'>
						<Button variant='tertiary' size='sm' icon='Bell' iconPosition='only' aria-label='Notifications' className={plainButton} />
						<Button variant='tertiary' size='sm' icon='HelpCircle' iconPosition='only' aria-label='Help' className={plainButton} />
						<Button
							variant='tertiary'
							size='sm'
							icon={theme === 'dark' ? 'Sun' : 'Moon'}
							iconPosition='only'
							aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
							className={plainButton}
							onClick={toggleTheme}
						/>
						<Face person={me} />
					</div>
				}
				className='w-full shrink-0'
			/>

			<div className='flex min-h-0 flex-1'>
				<Sidebar
					role='navigation'
					aria-label={app.name}
					collapsed={collapsed}
					onCollapsedChange={setCollapsed}
					showBorder={false}
					showFooter={false}
					className='relative z-10 shrink-0'
					style={{
						height: '100%',
						borderRight: '1px solid var(--nok-color-border-default)',
						...(collapsed ? undefined : { width: 260 }),
					}}>
					<SidebarContent style={{ gap: 'var(--nok-spacing-component-md)', height: '100%', overflowY: 'auto' }}>
						<SidebarGroup showLabel={false} showDivider>
							{mainNav.map((n) => item(n.label, n.icon, { trailing: n.more ? 'ChevronRight' : undefined }))}
						</SidebarGroup>
						<SidebarGroup label='Space'>{[item(space.name, 'Target', { trailing: 'Ellipsis' })]}</SidebarGroup>
						<SidebarGroup label='Content'>
							{!collapsed && (
								<div className='px-component-md py-component-xs'>
									<SearchInput
										size='sm'
										placeholder='Search by title'
										aria-label='Search pages by title'
										value={query}
										onChange={(event) => {
											setQuery(event.target.value);
											if (event.target.value) setTreeOpen(true);
										}}
										showClear={query.length > 0}
										onClear={() => setQuery('')}
									/>
								</div>
							)}
							{item(space.project, treeOpen ? 'FolderOpen' : 'Folder', {
								trailing: treeOpen ? 'ChevronDown' : 'ChevronRight',
								active: screen === 'space',
								expanded: treeOpen,
								onClick: () => {
									if (screen === 'space') setTreeOpen((value) => !value);
									else go('space');
								},
							})}
							{!collapsed && treeOpen && (
								// Figma's sidebar.subgroup: the space's pages, indented. Expanded sidebar only.
								<div role='group' aria-label={`${space.project} pages`} className='flex flex-col gap-component-xs pl-component-lg'>
									{treeDocs.map((d) =>
										item(d.title, d.icon, {
											active: d.opens && screen === 'page',
											onClick: d.opens ? () => go('page') : undefined,
										}),
									)}
									{treeDocs.length === 0 && (
										<p className='m-0 px-component-md py-component-xs text-text-secondary' style={text['body-sm']}>
											No pages match.
										</p>
									)}
								</div>
							)}
							{item('Create', 'Plus')}
						</SidebarGroup>
						<SidebarGroup label='Space apps'>{spaceApps.map((n) => item(n.label, n.icon))}</SidebarGroup>
						<SidebarGroup label='Linked apps'>{linkedApps.map((n) => item(n.label, n.icon, { trailing: 'ExternalLink' }))}</SidebarGroup>
						{!collapsed && (
							<div className='mt-auto px-component-sm pb-component-sm'>
								<Card
									style={{ width: '100%', background: 'var(--nok-color-background-info)' }}
									showMedia={false}
									leadingIcon
									icon={
										<span className='flex' aria-hidden='true'>
											{[<FolioMark key='folio' size={20} />, <Logo key='drive' name='google-drive' size={18} />].map((mark, i) => (
												<span
													key={i}
													className={`flex size-8 items-center justify-center rounded-lg border-2 border-solid border-background-info bg-background-surface ${i ? '' : '-mr-1.5'}`}>
													{mark}
												</span>
											))}
										</span>
									}
									title={promo.title}
									description={promo.detail}
									actions={
										<a
											href='#extension'
											onClick={(event) => event.preventDefault()}
											className='text-text-link no-underline hover:underline'
											style={text['label-md']}>
											{promo.link}
										</a>
									}
								/>
							</div>
						)}
					</SidebarContent>
				</Sidebar>

				<main id='folio-main' className='relative min-w-0 flex-1 overflow-y-auto bg-background-surface'>
					<div className='sticky top-0 z-10 flex h-14 items-center justify-between border-0 border-b border-solid border-border-default bg-background-surface px-component-lg'>
						<div>
							{screen === 'page' && (
								<Breadcrumb aria-label='Breadcrumb'>
									<BreadcrumbItem label={space.name} showSeparator={false} />
									<BreadcrumbItem label={space.project} onClick={() => go('space')} />
									<BreadcrumbItem label={page.title} state='current' aria-current='page' />
								</Breadcrumb>
							)}
						</div>
						<div className='flex items-center gap-component-sm'>
							{screen === 'page' && (
								<span className='text-text-secondary' style={text['body-sm']}>
									{page.published}
								</span>
							)}
							<Button variant='tertiary' size='sm' icon='Lock'>
								Share
							</Button>
							<Button variant='tertiary' size='sm' icon='Ellipsis' iconPosition='only' aria-label='More actions' className={plainButton} />
						</div>
					</div>
					{screen === 'space' ?
						<Space open={() => go('page')} />
					:	<Page />}
				</main>
			</div>

			{screen === 'space' && (
				<div className='fixed bottom-6 right-6 z-20 flex flex-col gap-component-md'>
					{/* Icon-only md squeezes its icon (NOKGRID-GAPS.md), so the padding is set back to Figma's 8px. */}
					<Button variant='secondary' size='md' icon='Info' iconPosition='only' aria-label='About this space' className='!p-component-sm' />
					<Button
						variant='primary'
						size='md'
						icon='Zap'
						iconPosition='only'
						aria-label='Ask Folio AI'
						// Figma's blue call to action uses background/info-strong, not the primary fill.
						className='!bg-background-info-strong !p-component-sm text-text-white [--nok-color-icon-white:var(--nok-color-text-white)]'
					/>
				</div>
			)}
		</div>
	);
}
