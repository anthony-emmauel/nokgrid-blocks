import type { IconName } from '@nokgridcore/ui/icon';

// Placeholder data for the Users admin block. Swap any of it for your own.

export type UserType = 'Member' | 'Guest' | 'Admin';

export interface User {
	id: string;
	displayName: string;
	initials: string;
	userPrincipalName: string;
	userType: UserType;
	isAgent: boolean;
	onPremisesSync: boolean;
	companyName?: string;
	creationType?: string;
}

export const users: User[] = [
	{
		id: 'amara-nwosu',
		displayName: 'Amara Nwosu',
		initials: 'AN',
		userPrincipalName: 'amara.nwosu@kestrellabs.io',
		userType: 'Member',
		isAgent: false,
		onPremisesSync: false,
		companyName: 'Kestrel Labs',
	},
	{
		id: 'billing',
		displayName: 'billing',
		initials: 'B',
		userPrincipalName: 'billing@kestrellabs.io',
		userType: 'Member',
		isAgent: false,
		onPremisesSync: false,
	},
	{
		id: 'daniel-reyes',
		displayName: 'Daniel Reyes',
		initials: 'DR',
		userPrincipalName: 'daniel.reyes@kestrellabs.io',
		userType: 'Member',
		isAgent: false,
		onPremisesSync: false,
		companyName: 'Kestrel Labs',
	},
	{
		id: 'ingrid-solberg',
		displayName: 'Ingrid Solberg',
		initials: 'IS',
		userPrincipalName: 'ingrid.solberg@kestrellabs.io',
		userType: 'Member',
		isAgent: false,
		onPremisesSync: false,
		companyName: 'Kestrel Labs',
	},
	{
		id: 'kestrel-assistant',
		displayName: 'Kestrel Assistant',
		initials: 'KA',
		userPrincipalName: 'assistant@kestrellabs.io',
		userType: 'Member',
		isAgent: true,
		onPremisesSync: false,
		companyName: 'Kestrel Labs',
	},
	{
		id: 'mateo-ruiz',
		displayName: 'Mateo Ruiz',
		initials: 'MR',
		userPrincipalName: 'mateo.ruiz@harbourline.co',
		userType: 'Guest',
		isAgent: false,
		onPremisesSync: false,
		companyName: 'Harbourline',
		creationType: 'Invitation',
	},
	{
		id: 'priya-raman',
		displayName: 'Priya Raman',
		initials: 'PR',
		userPrincipalName: 'priya.raman@kestrellabs.io',
		userType: 'Member',
		isAgent: false,
		onPremisesSync: false,
		companyName: 'Kestrel Labs',
	},
	{
		id: 'support',
		displayName: 'support',
		initials: 'S',
		userPrincipalName: 'support@kestrellabs.io',
		userType: 'Member',
		isAgent: false,
		onPremisesSync: false,
	},
];

/** Values offered by the "Add filter" → User type dropdown. */
export const userTypes: UserType[] = ['Member', 'Guest', 'Admin'];

export const organisation = {
	product: 'Admin center',
	tenant: 'Kestrel Labs',
	notifications: 3,
};

export const currentUser = {
	name: 'Priya Raman',
	email: 'priya.raman@kestrellabs.io',
	photo: '/blocks/users-admin/priya-raman.jpg',
};

export interface NavItem {
	label: string;
	icon: IconName;
	/** Shows a trailing chevron, for items that expand. */
	expandable?: boolean;
	current?: boolean;
}

export const primaryNav: NavItem[] = [
	{ label: 'Home', icon: 'Home' },
	{ label: 'Favorites', icon: 'Star', expandable: true },
];

export const identityNav: NavItem[] = [
	{ label: 'Overview', icon: 'Info' },
	{ label: 'Users', icon: 'User', current: true },
	{ label: 'Groups', icon: 'Users' },
	{ label: 'Devices', icon: 'Monitor' },
	{ label: 'Agents', icon: 'Cpu' },
	{ label: 'Enterprise apps', icon: 'LayoutGrid' },
	{ label: 'App registrations', icon: 'Grid3X3' },
	{ label: 'Roles & admins', icon: 'Shield' },
	{ label: 'Delegated admin partners', icon: 'UserCheck' },
	{ label: 'Tenant governance', icon: 'Building2' },
	{ label: 'Domain services', icon: 'Globe' },
	{ label: 'Identity Secure Score', icon: 'Gauge' },
	{ label: 'Authentication methods', icon: 'KeyRound' },
	{ label: 'Account recovery', icon: 'RotateCcw' },
	{ label: 'Password reset', icon: 'Key' },
	{ label: 'Custom security attributes', icon: 'Tags' },
	{ label: 'Certificate authorities', icon: 'BadgeCheck' },
	{ label: 'External Identities', icon: 'UsersRound' },
	{ label: 'Cross-tenant synchronization', icon: 'Repeat' },
];

export const usersNav: NavItem[] = [
	{ label: 'All users', icon: 'User', current: true },
	{ label: 'Audit logs', icon: 'FileText' },
	{ label: 'Sign-in logs', icon: 'LogIn' },
	{ label: 'Diagnose and solve problems', icon: 'Activity' },
	{ label: 'Deleted users', icon: 'UserX' },
	{ label: 'Password reset', icon: 'Key' },
	{ label: 'User settings', icon: 'SlidersHorizontal' },
	{ label: 'Bulk operation results', icon: 'ListChecks' },
	{ label: 'Bulk operation results (Preview)', icon: 'ListChecks' },
	{ label: 'Support + Troubleshooting', icon: 'HelpCircle' },
];

export const breadcrumb = ['Home', 'Kestrel Labs | Overview', 'Identity', 'Users'];

export interface Command {
	label: string;
	icon: IconName;
	/** How many selected rows the command needs: "one", "some" (at least one) or none. */
	needsSelection?: 'one' | 'some';
}

export const commands: Command[] = [
	{ label: 'New user', icon: 'Plus' },
	{ label: 'Edit', icon: 'Pencil', needsSelection: 'one' },
	{ label: 'Delete', icon: 'Trash2', needsSelection: 'some' },
	{ label: 'Download users (Preview)', icon: 'Download' },
	{ label: 'Bulk operations', icon: 'Layers' },
	{ label: 'Refresh', icon: 'RefreshCw' },
	{ label: 'Manage view', icon: 'Settings' },
	{ label: 'Per-user MFA', icon: 'ShieldCheck' },
	{ label: 'Got feedback?', icon: 'MessageSquare' },
];
