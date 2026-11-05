'use client';

import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Icon } from '@nokgridcore/ui/icon';
import { MenuItem } from '@nokgridcore/ui/menu-item';
import { SearchInput } from '@nokgridcore/ui/search-input';
import { Sidebar } from '@nokgridcore/ui/sidebar';
import { SidebarContent } from '@nokgridcore/ui/sidebar-content';
import { SidebarGroup } from '@nokgridcore/ui/sidebar-group';
import { SidebarHeader } from '@nokgridcore/ui/sidebar-header';
import { Avatar } from '@nokgridcore/ui/avatar';
import { accountFooterNav, accountNav, app, chat, type Screen } from './data';
import { AppTopBar, CardMedia, fill, type Nav } from './parts';
import { Agent } from './screens/agent';
import { Chat } from './screens/chat';
import { Home } from './screens/home';
import { Integrations } from './screens/integrations';
import { text } from './text';

const SCREENS: Screen[] = ['home', 'chat', 'agent', 'integrations'];

// Content on brand/primary fills: the components draw it white, the black theme
// uses action/primary-text (see NOKGRID-GAPS.md).
const onBrand = '[--nok-color-icon-white:var(--nok-color-action-primary-text)]';

const toScreen = (segment?: string): Screen => (SCREENS.includes(segment as Screen) ? (segment as Screen) : 'home');

/** Enter activates a div-based control, the way it does a button. */
function activateOnEnter(event: KeyboardEvent<HTMLElement>) {
	if (event.key !== 'Enter') return;
	event.preventDefault();
	event.currentTarget.click();
}

const SIDEBAR_EXPANDED = { chat: 300, integrations: 240 };

/**
 * Updraft, an AI agents workspace: Home and an agent page sit under a top bar;
 * Chat and Integrations add a sidebar. Screens are client-side routes under
 * `basePath` (e.g. /blocks/updraft/integrations), so they can be linked and Back works.
 */
export default function Updraft({
	screen: segments = [],
	basePath = '/blocks/updraft',
}: {
	screen?: string[];
	basePath?: string;
}) {
	const [screen, setScreen] = useState<Screen>(() => toScreen(segments[0]));
	const [collapsed, setCollapsed] = useState(false);
	const [chatQuery, setChatQuery] = useState('');

	const go = useCallback(
		(next: Screen) => {
			setScreen(next);
			setCollapsed(false);
			window.history.pushState(null, '', next === 'home' ? basePath : `${basePath}/${next}`);
			document.getElementById('updraft-main')?.scrollTo({ top: 0 });
		},
		[basePath],
	);

	useEffect(() => {
		const sync = () => setScreen(toScreen(window.location.pathname.slice(basePath.length + 1).split('/')[0]));
		window.addEventListener('popstate', sync);
		return () => window.removeEventListener('popstate', sync);
	}, [basePath]);

	const nav: Nav = { go };

	if (screen === 'home' || screen === 'agent') {
		return (
			<div className={`relative flex h-screen flex-col bg-background-canvas ${onBrand}`}>
				<AppTopBar nav={nav} showBrand />
				<main id='updraft-main' className='min-h-0 flex-1 overflow-y-auto'>
					{screen === 'home' ?
						<Home nav={nav} />
					:	<Agent nav={nav} />}
				</main>
				{screen === 'home' && (
					<Button variant='secondary' size='md' icon='MessageCircle' className='absolute bottom-5 left-5 shadow-md' onClick={() => go('chat')}>
						<span className='flex items-center gap-component-xs'>
							Message your agents
							<Icon name='ArrowRight' size='md' />
						</span>
					</Button>
				)}
			</div>
		);
	}

	const item = (label: string, icon: Parameters<typeof MenuItem>[0]['icon'], onClick?: () => void, active?: boolean) => (
		<MenuItem
			key={label}
			role={onClick ? 'link' : 'button'}
			aria-label={label}
			aria-current={active ? 'page' : undefined}
			title={collapsed ? label : undefined}
			state={active ? 'active' : 'default'}
			showLeadingIcon
			icon={icon}
			showLabel
			label={label}
			onClick={onClick}
			onKeyDown={activateOnEnter}
		/>
	);

	const chats = [chat].filter((c) => c.title.toLowerCase().includes(chatQuery.trim().toLowerCase()));

	return (
		<div className={`flex h-screen ${screen === 'chat' ? 'bg-background-canvas' : 'bg-background-surface'} ${onBrand}`}>
			<Sidebar
				role='navigation'
				aria-label={app.name}
				collapsed={collapsed}
				onCollapsedChange={setCollapsed}
				showBorder={false}
				showFooter={false}
				// The collapsed rail's expand button floats past the sidebar's edge; keep it above <main>.
				className='relative z-10 shrink-0'
				style={{
					height: '100%',
					borderRight: '1px solid var(--nok-color-border-default)',
					...(collapsed ? undefined : { width: SIDEBAR_EXPANDED[screen] }),
				}}>
				<SidebarHeader logo={app.logo} title={app.name} showSubtext={false} />
				{screen === 'chat' ?
					<SidebarContent style={{ gap: 'var(--nok-spacing-component-md)', height: '100%' }}>
						{!collapsed && (
							<div className='px-component-md pb-[37px] pt-component-sm'>
								<SearchInput
									size='md'
									placeholder='Search chats'
									aria-label='Search chats'
									value={chatQuery}
									onChange={(event) => setChatQuery(event.target.value)}
									showClear={chatQuery.length > 0}
									onClear={() => setChatQuery('')}
								/>
							</div>
						)}
						<SidebarGroup showLabel={false}>{chat.nav.map((n) => item(n.label, n.icon))}</SidebarGroup>
						{!collapsed && (
							<>
								<ul className='m-0 flex list-none flex-col gap-component-sm px-component-md pt-component-sm'>
									{chats.map((c) => (
										<li key={c.title}>
											<Card
												orientation='horizontal'
												style={fill}
												media={
													<CardMedia>
														<Avatar type='initials' size='md' initials={c.initials} />
													</CardMedia>
												}
												title={c.title}
												description={c.agent}
												actions={
													<span className='whitespace-nowrap text-text-tertiary' style={text['body-sm']}>
														{c.time}
													</span>
												}
											/>
										</li>
									))}
								</ul>
								<div className='mt-auto px-component-lg pb-component-lg'>
									<Card
										style={fill}
										media={
											<div className='flex h-full w-full items-center justify-center' aria-hidden='true'>
												{chat.create.crew.map((initials, i) => (
													<Avatar key={initials} type='initials' size='md' initials={initials} className={i ? '-ml-2' : undefined} />
												))}
											</div>
										}
										title={chat.create.title}
										description={chat.create.detail}
										actions={
											<Button variant='secondary' size='sm' icon='Plus'>
												New agent
											</Button>
										}
									/>
								</div>
							</>
						)}
					</SidebarContent>
				:	<SidebarContent style={{ gap: 'var(--nok-spacing-component-md)', height: '100%' }}>
						<SidebarGroup showLabel={false}>{[item('Back', 'ArrowLeft', () => go('home'))]}</SidebarGroup>
						<SidebarGroup showLabel={false}>
							{accountNav.map((n) => item(n.label, n.icon, n.screen ? () => go(n.screen!) : undefined, n.screen === screen))}
						</SidebarGroup>
						<div className='mt-auto'>
							<SidebarGroup showLabel={false}>{accountFooterNav.map((n) => item(n.label, n.icon))}</SidebarGroup>
						</div>
					</SidebarContent>
				}
			</Sidebar>

			<div className='flex min-w-0 flex-1 flex-col'>
				<AppTopBar nav={nav} plainSwitch={screen === 'integrations'} />
				{screen === 'chat' ?
					<main id='updraft-main' className='flex min-h-0 flex-1 flex-col'>
						<Chat />
					</main>
				:	<main id='updraft-main' className='min-h-0 flex-1 overflow-y-auto'>
						<Integrations />
					</main>
				}
			</div>
		</div>
	);
}
