'use client';

import { useState } from 'react';
import { MenuItem } from '@nokgridcore/ui/menu-item';
import { Sidebar } from '@nokgridcore/ui/sidebar';
import { SidebarContent } from '@nokgridcore/ui/sidebar-content';
import { SidebarGroup } from '@nokgridcore/ui/sidebar-group';
import { SidebarHeader } from '@nokgridcore/ui/sidebar-header';
import { accountFooterNav, accountNav, app } from './data';
import { Integrations } from './integrations';
import { AppTopBar } from './parts';

// Content on brand/primary fills: the components draw it white, the black theme
// uses action/primary-text (see NOKGRID-GAPS.md).
const onBrand = '[--nok-color-icon-white:var(--nok-color-action-primary-text)]';

/** Updraft's Integrations page: a collapsible account sidebar, a top bar and the integrations library. */
export default function Updraft() {
	const [collapsed, setCollapsed] = useState(false);

	const item = (label: string, icon: Parameters<typeof MenuItem>[0]['icon'], current?: boolean) => (
		<MenuItem
			key={label}
			role={current ? 'link' : 'button'}
			aria-label={label}
			aria-current={current ? 'page' : undefined}
			title={collapsed ? label : undefined}
			state={current ? 'active' : 'default'}
			showLeadingIcon
			icon={icon}
			showLabel
			label={label}
		/>
	);

	return (
		<div className={`flex h-screen bg-background-surface ${onBrand}`}>
			<Sidebar
				role='navigation'
				aria-label={app.name}
				collapsed={collapsed}
				onCollapsedChange={setCollapsed}
				showBorder={false}
				showFooter={false}
				// The collapsed rail's expand button floats past the sidebar's edge; keep it above <main>.
				className='relative z-10 shrink-0'
				style={{ height: '100%', borderRight: '1px solid var(--nok-color-border-default)' }}>
				<SidebarHeader logo={app.logo} title={app.name} showSubtext={false} />
				<SidebarContent style={{ gap: 'var(--nok-spacing-component-md)', height: '100%' }}>
					<SidebarGroup showLabel={false}>{[item('Back', 'ArrowLeft')]}</SidebarGroup>
					<SidebarGroup showLabel={false}>{accountNav.map((n) => item(n.label, n.icon, n.current))}</SidebarGroup>
					<div className='mt-auto'>
						<SidebarGroup showLabel={false}>{accountFooterNav.map((n) => item(n.label, n.icon))}</SidebarGroup>
					</div>
				</SidebarContent>
			</Sidebar>

			<div className='flex min-w-0 flex-1 flex-col'>
				<AppTopBar />
				<main className='min-h-0 flex-1 overflow-y-auto'>
					<Integrations />
				</main>
			</div>
		</div>
	);
}
