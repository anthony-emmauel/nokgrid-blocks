'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { nokTailwindTheme } from '@nokgridcore/tokens/tailwind-theme';
import { Avatar } from '@nokgridcore/ui/avatar';
import { BadgeCount } from '@nokgridcore/ui/badge-count';
import { Breadcrumb } from '@nokgridcore/ui/breadcrumb';
import { BreadcrumbItem } from '@nokgridcore/ui/breadcrumb-item';
import { Button } from '@nokgridcore/ui/button';
import { Checkbox } from '@nokgridcore/ui/checkbox';
import { Chip } from '@nokgridcore/ui/chip';
import { MenuItem } from '@nokgridcore/ui/menu-item';
import { Option } from '@nokgridcore/ui/option';
import { Popover } from '@nokgridcore/ui/popover';
import { SearchInput } from '@nokgridcore/ui/search-input';
import { Sidebar } from '@nokgridcore/ui/sidebar';
import { SidebarContent } from '@nokgridcore/ui/sidebar-content';
import { SidebarFooter } from '@nokgridcore/ui/sidebar-footer';
import { SidebarGroup } from '@nokgridcore/ui/sidebar-group';
import { SidebarHeader } from '@nokgridcore/ui/sidebar-header';
import { Tab } from '@nokgridcore/ui/tab';
import { Table } from '@nokgridcore/ui/table';
import { TableCell } from '@nokgridcore/ui/table-cell';
import { TableHeaderCell } from '@nokgridcore/ui/table-header-cell';
import { TableRow } from '@nokgridcore/ui/table-row';
import { TableToolbar } from '@nokgridcore/ui/table-toolbar';
import { TopBar } from '@nokgridcore/ui/top-bar';
import {
	breadcrumb,
	commands,
	currentUser,
	identityNav,
	organisation,
	primaryNav,
	users,
	usersNav,
	userTypes,
	type NavItem,
	type User,
	type UserType,
} from './data';

const text = nokTailwindTheme.textStyles;

const pageTitle = {
	fontFamily: 'var(--nok-typography-display-md-font-family)',
	fontSize: 'var(--nok-typography-display-md-font-size)',
	// The token's value is the keyword "semibold", which CSS doesn't accept.
	fontWeight: 600,
	lineHeight: 'var(--nok-typography-display-md-line-height)',
};

type SortKey = 'displayName' | 'userPrincipalName';
type SortState = 'none' | 'ascending' | 'descending';

const columns: { key: keyof User; label: string; sortable?: boolean; wide?: boolean }[] = [
	{ key: 'displayName', label: 'Display name', sortable: true, wide: true },
	{ key: 'userPrincipalName', label: 'User principal name', sortable: true, wide: true },
	{ key: 'userType', label: 'User type' },
	{ key: 'isAgent', label: 'Is Agent' },
	{ key: 'onPremisesSync', label: 'On-premises sync' },
	{ key: 'id', label: 'Sign-in identifiers' },
	{ key: 'companyName', label: 'Company name' },
	{ key: 'creationType', label: 'Creation type' },
];

const ariaSort = { none: 'none', ascending: 'ascending', descending: 'descending' } as const;

// Columns share the row width equally; long values truncate with the full text on hover.
// Name and UPN keep at least the Figma column width (165px at 1920) when space runs short.
const columnStyle = { flex: '1 1 0', minWidth: 0, width: 'auto' };
const wideColumnStyle = { ...columnStyle, minWidth: '160px' };
const truncate = 'overflow-hidden [&_div]:min-w-0 [&_div]:max-w-full [&_span]:max-w-full [&_span]:truncate';
// Rows use the spacious density (56px, as in Figma); the header stays at 36px.
const headerPadding = {
	paddingTop: 'var(--nok-spacing-component-sm)',
	paddingBottom: 'var(--nok-spacing-component-sm)',
};
// Same width in the header and the rows: 16 + 16px checkbox + 16.
const checkboxColumn = 'flex shrink-0 items-center px-component-lg';

const yesNo = (value: boolean) => (value ? 'Yes' : 'No');

/** Enter activates a div-based control, the way it does a button. */
function activateOnEnter(event: KeyboardEvent<HTMLElement>) {
	if (event.key === 'Enter') event.currentTarget.click();
}

function NavMenuItem({ item, collapsed = false }: { item: NavItem; collapsed?: boolean }) {
	return (
		<MenuItem
			role='link'
			aria-current={item.current ? 'page' : undefined}
			aria-label={collapsed ? item.label : undefined}
			state={item.current ? 'active' : 'default'}
			showLeadingIcon
			icon={item.icon}
			showLabel={!collapsed}
			label={item.label}
			showTrailingIcon={item.expandable && !collapsed}
			trailingIcon='ChevronDown'
			onKeyDown={activateOnEnter}
			style={{ width: '100%' }}
		/>
	);
}

export default function UsersAdmin() {
	const [query, setQuery] = useState('');
	const [typeFilter, setTypeFilter] = useState<UserType | null>(null);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [sort, setSort] = useState<{ key: SortKey; state: SortState }>({
		key: 'displayName',
		state: 'ascending',
	});
	const [usersNavCollapsed, setUsersNavCollapsed] = useState(false);

	const rows = useMemo(() => {
		const q = query.trim().toLowerCase();
		const matches = users.filter(
			(user) =>
				(!typeFilter || user.userType === typeFilter) &&
				(!q ||
					user.displayName.toLowerCase().includes(q) ||
					user.userPrincipalName.toLowerCase().includes(q)),
		);
		if (sort.state === 'none') return matches;
		const direction = sort.state === 'ascending' ? 1 : -1;
		return [...matches].sort(
			(a, b) => a[sort.key].localeCompare(b[sort.key], undefined, { sensitivity: 'base' }) * direction,
		);
	}, [query, typeFilter, sort]);

	const selectedRows = rows.filter((user) => selectedIds.has(user.id));
	const allSelected = rows.length > 0 && selectedRows.length === rows.length;
	const someSelected = selectedRows.length > 0 && !allSelected;

	function toggleRow(id: string) {
		setSelectedIds((current) => {
			const next = new Set(current);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}

	function toggleAll() {
		setSelectedIds((current) => {
			const next = new Set(current);
			for (const user of rows) {
				if (allSelected) next.delete(user.id);
				else next.add(user.id);
			}
			return next;
		});
	}

	function sortBy(key: SortKey, state: SortState) {
		setSort({ key, state });
	}

	function isCommandDisabled(needs?: 'one' | 'some') {
		if (needs === 'one') return selectedRows.length !== 1;
		if (needs === 'some') return selectedRows.length === 0;
		return false;
	}

	const resultCount = `${rows.length} ${rows.length === 1 ? 'user' : 'users'} found`;

	const toolbar = (
		<div className='flex items-center border-0 border-b border-solid border-border-default pr-component-lg'>
			<TableToolbar
				layout='search-leading'
				showSearch
				search={
					<div className='flex items-center gap-component-md'>
						<SearchInput
							size='sm'
							className='w-[320px]'
							placeholder='Search users'
							aria-label='Search users'
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							showClear={query.length > 0}
							onClear={() => setQuery('')}
						/>
						{typeFilter && (
							<Chip
								label={`User type: ${typeFilter}`}
								removable
								aria-label={`Remove filter User type: ${typeFilter}`}
								onClick={() => setTypeFilter(null)}
							/>
						)}
					</div>
				}
				style={{ borderBottom: 'none', paddingBlock: 'var(--nok-spacing-component-md)' }}
			/>
			<div className='flex shrink-0 items-center gap-component-md'>
				<FilterMenu value={typeFilter} onChange={setTypeFilter} />
				<span className='text-text-secondary' style={text['caption-md']} aria-live='polite'>
					{resultCount}
				</span>
			</div>
		</div>
	);

	const header = (
		// Table wraps the header in an inline-block that grows to fit its content; containing
		// the row's inline size keeps its columns the same width as the body's.
		<div role='row' className='flex w-full items-center [contain:inline-size]'>
			<span role='columnheader' className={checkboxColumn} style={headerPadding}>
				<Checkbox
					size='sm'
					label='Select all users'
					hideLabel
					checked={allSelected}
					indeterminate={someSelected}
					onChange={toggleAll}
				/>
			</span>
			{columns.map((column) => {
				const sortKey = column.key as SortKey;
				const sortState = column.sortable && sort.key === sortKey ? sort.state : 'none';
				return (
					<TableHeaderCell
						key={column.key}
						role='columnheader'
						aria-sort={column.sortable ? ariaSort[sortState] : undefined}
						label={column.label}
						sortable={column.sortable}
						sortState={sortState}
						onSortStateChange={(state) => sortBy(sortKey, state)}
						onKeyDown={
							column.sortable ?
								(event) => {
									if (event.key !== 'Enter' && event.key !== ' ') return;
									event.preventDefault();
									event.currentTarget.click();
								}
							:	undefined
						}
						className='min-w-0 [&_span]:truncate'
						style={{ ...(column.wide ? wideColumnStyle : columnStyle), ...headerPadding }}
					/>
				);
			})}
		</div>
	);

	return (
		<div className='flex h-screen flex-col bg-background-surface'>
			<TopBar
				showSidebarToggle={false}
				logo='Grid3X3'
				productName={organisation.product}
				showSearch={false}
				showAdditional
				additional={
					<SearchInput
						size='sm'
						className='w-[280px]'
						placeholder='Search resources, services, and docs (G+/)'
						aria-label='Search resources, services, and docs'
					/>
				}
				actions={
					<div className='flex items-center gap-component-sm'>
						<Button
							variant='tertiary'
							size='sm'
							icon='HelpCircle'
							iconPosition='only'
							aria-label='Help'
							className='border-transparent bg-transparent'
						/>
						<span className='relative inline-flex'>
							<Button
								variant='tertiary'
								size='sm'
								icon='Bell'
								iconPosition='only'
								aria-label={`Notifications, ${organisation.notifications} unread`}
								className='border-transparent bg-transparent'
							/>
							<BadgeCount
								variant='primary'
								count={organisation.notifications}
								aria-hidden='true'
								className='pointer-events-none absolute right-0 top-0'
							/>
						</span>
						<Button
							variant='tertiary'
							size='sm'
							icon='Settings'
							iconPosition='only'
							aria-label='Settings'
							className='border-transparent bg-transparent'
						/>
					</div>
				}
			/>

			<div className='flex min-h-0 flex-1'>
				<Sidebar
					role='navigation'
					aria-label={organisation.product}
					showBorder={false}
					style={{ height: '100%', borderRight: '1px solid var(--nok-color-border-default)' }}>
					<SidebarHeader logo='Grid3X3' title={organisation.product} subtext={organisation.tenant} />
					<SidebarContent style={{ gap: 'var(--nok-spacing-component-md)' }}>
						<SidebarGroup showDivider>
							{primaryNav.map((item) => (
								<NavMenuItem key={item.label} item={item} />
							))}
						</SidebarGroup>
						<SidebarGroup label='Identity'>
							{identityNav.map((item) => (
								<NavMenuItem key={item.label} item={item} />
							))}
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter
						profileImage={currentUser.photo}
						profileName={currentUser.name}
						profileEmail={currentUser.email}
					/>
				</Sidebar>

				<main className='flex min-w-0 flex-1 flex-col gap-component-md overflow-y-auto px-layout-lg pb-layout-lg pt-component-lg'>
					<Breadcrumb>
						{breadcrumb.map((label) => (
							<BreadcrumbItem key={label} label={label} onClick={() => {}} />
						))}
					</Breadcrumb>

					<header className='flex items-center gap-component-md'>
						<Avatar type='icon' shape='square' size='lg' icon='User' aria-hidden='true' />
						<div className='flex flex-col'>
							<h1 className='m-0 text-text-primary' style={pageTitle}>
								Users
							</h1>
							<span className='text-text-secondary' style={text['body-sm']}>
								{organisation.tenant}
							</span>
						</div>
						<Button
							variant='tertiary'
							size='sm'
							icon='MoreHorizontal'
							iconPosition='only'
							aria-label='More actions for Users'
						/>
						<div className='flex-1' />
						<Button variant='tertiary' size='sm' icon='X' iconPosition='only' aria-label='Close' />
					</header>

					<div className='flex min-w-0 gap-layout-lg'>
						<nav
							aria-label='Users'
							className={`flex shrink-0 flex-col gap-[2px] ${usersNavCollapsed ? 'w-10' : 'w-sidebar-expanded'}`}>
							<div className='flex justify-end'>
								<Button
									variant='tertiary'
									size='xs'
									icon={usersNavCollapsed ? 'ChevronsRight' : 'ChevronsLeft'}
									iconPosition='only'
									aria-label={usersNavCollapsed ? 'Expand menu' : 'Collapse menu'}
									aria-expanded={!usersNavCollapsed}
									onClick={() => setUsersNavCollapsed((collapsed) => !collapsed)}
								/>
							</div>
							{usersNav.map((item) => (
								<NavMenuItem key={item.label} item={item} collapsed={usersNavCollapsed} />
							))}
						</nav>

						<section aria-label='All users' className='flex min-w-0 flex-1 flex-col gap-component-md'>
							<div className='flex gap-component-lg overflow-x-auto border-0 border-b border-solid border-border-default'>
								{commands.map((command) => (
									<Tab
										key={command.label}
										size='medium'
										label={command.label}
										leadingIcon={command.icon}
										state={isCommandDisabled(command.needsSelection) ? 'disabled' : 'default'}
										className='shrink-0 whitespace-nowrap'
									/>
								))}
							</div>

							<div className='overflow-x-auto'>
								{/* Fits the 1440 layout; narrower screens scroll the table sideways. */}
								<Table
									role='table'
									aria-label='Users'
									className='min-w-[880px]'
									density='spacious'
									showToolbar
									toolbar={toolbar}
									header={header}>
									{rows.length === 0 ?
										<TableRow role='row' tabIndex={-1}>
											<TableCell
												role='cell'
												value='No users match these filters.'
												style={{ flex: '1 1 auto', width: 'auto' }}
											/>
										</TableRow>
									:	rows.map((user) => {
											const checked = selectedIds.has(user.id);
											return (
												<TableRow
													key={user.id}
													role='row'
													aria-selected={checked}
													checked={checked}
													onKeyDown={(event) => {
														if (event.key !== ' ' || event.target !== event.currentTarget) return;
														event.preventDefault();
														toggleRow(user.id);
													}}>
													<span role='cell' className={checkboxColumn}>
														<Checkbox
															size='sm'
															label={`Select ${user.displayName}`}
															hideLabel
															checked={checked}
															onChange={() => toggleRow(user.id)}
														/>
													</span>
													<TableCell
														role='cell'
														columnType='person'
														avatarInitials={user.initials}
														value={user.displayName}
														title={user.displayName}
														className={truncate}
														style={wideColumnStyle}
													/>
													{[
														user.userPrincipalName,
														user.userType,
														yesNo(user.isAgent),
														yesNo(user.onPremisesSync),
														'View',
														user.companyName ?? '',
														user.creationType ?? '',
													].map((value, index) => (
														<TableCell
															key={index}
															role='cell'
															value={value}
															title={value || undefined}
															className={truncate}
															style={index === 0 ? wideColumnStyle : columnStyle}
														/>
													))}
												</TableRow>
											);
										})
									}
								</Table>
							</div>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}

/** "Add filter" → User type dropdown, built from Popover and Option. */
function FilterMenu({
	value,
	onChange,
}: {
	value: UserType | null;
	onChange: (value: UserType) => void;
}) {
	const [open, setOpen] = useState(false);
	const [focusIndex, setFocusIndex] = useState(0);
	const rootRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		if (!open) return;
		optionRefs.current[focusIndex]?.focus();
	}, [open, focusIndex]);

	useEffect(() => {
		if (!open) return;
		const closeOnOutsideClick = (event: MouseEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', closeOnOutsideClick);
		return () => document.removeEventListener('mousedown', closeOnOutsideClick);
	}, [open]);

	function openMenu() {
		setFocusIndex(Math.max(0, value ? userTypes.indexOf(value) : 0));
		setOpen(true);
	}

	function close() {
		setOpen(false);
		buttonRef.current?.focus();
	}

	function choose(type: UserType) {
		onChange(type);
		close();
	}

	function onListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		const last = userTypes.length - 1;
		if (event.key === 'ArrowDown') setFocusIndex((index) => (index === last ? 0 : index + 1));
		else if (event.key === 'ArrowUp') setFocusIndex((index) => (index === 0 ? last : index - 1));
		else if (event.key === 'Home') setFocusIndex(0);
		else if (event.key === 'End') setFocusIndex(last);
		else if (event.key === 'Enter' || event.key === ' ') choose(userTypes[focusIndex]);
		else if (event.key === 'Escape') close();
		else if (event.key === 'Tab') setOpen(false);
		else return;
		if (event.key !== 'Tab') event.preventDefault();
	}

	return (
		<div ref={rootRef} className='relative'>
			<Button
				ref={buttonRef}
				variant='primary'
				size='sm'
				icon='Filter'
				aria-haspopup='listbox'
				aria-expanded={open}
				aria-controls={open ? 'users-admin-filter' : undefined}
				onClick={() => (open ? setOpen(false) : openMenu())}>
				Add filter
			</Button>
			{open && (
				<Popover
					width='small'
					className='absolute right-0 top-full z-10 mt-component-xs'
					style={{ padding: 'var(--nok-spacing-component-xs)' }}>
					<span
						id='users-admin-filter-label'
						className='px-component-sm py-component-xs text-text-tertiary'
						style={text['caption-md']}>
						User type
					</span>
					<div
						id='users-admin-filter'
						role='listbox'
						aria-labelledby='users-admin-filter-label'
						className='flex w-full flex-col'
						onKeyDown={onListKeyDown}>
						{userTypes.map((type, index) => (
							<Option
								key={type}
								ref={(node) => {
									optionRefs.current[index] = node;
								}}
								label={type}
								state={value === type ? 'selected' : 'default'}
								tabIndex={index === focusIndex ? 0 : -1}
								onClick={() => choose(type)}
							/>
						))}
					</div>
				</Popover>
			)}
		</div>
	);
}
