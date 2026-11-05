// Placeholder content for the block. Swap these for your own data.
import type { IconName } from '@nokgridcore/ui/icon';

export type Screen = 'home' | 'chat' | 'agent' | 'integrations';

export type LogoName =
	| 'slack'
	| 'notion'
	| 'github'
	| 'gmail'
	| 'stripe'
	| 'google-drive'
	| 'jira'
	| 'confluence'
	| 'trello'
	| 'google-sheets'
	| 'canva'
	| 'airtable'
	| 'hubspot'
	| 'outlook'
	| 'mailchimp'
	| 'shopify'
	| 'zapier';

export const app = { name: 'Updraft', logo: 'Navigation2' as IconName };
export const workspace = 'Kestrel Labs';
export const user = { initials: 'SO', name: 'Sam Okafor' };

export const shortcuts: { label: string; icon?: IconName; initials?: string; badge?: string; screen?: Screen }[] = [
	{ label: 'New agent', icon: 'Plus' },
	{ label: 'Templates', icon: 'LayoutGrid' },
	{ label: 'Nova', initials: 'NV', badge: 'New', screen: 'chat' },
	{ label: 'All agents', icon: 'ArrowRight' },
];

export const nova = {
	name: 'Nova',
	initials: 'NV',
	time: '53 min ago',
	prompt: 'Add me to your channels',
	channels: [
		{ logo: 'slack', name: 'Slack', detail: 'Talk to Nova on Slack' },
		{ logo: 'gmail', name: 'Gmail', detail: 'Email Nova from Gmail' },
		{ logo: 'outlook', name: 'Outlook', detail: 'Email Nova from Outlook' },
	] as { logo: LogoName; name: string; detail: string }[],
	joined: {
		title: 'Nova joined your team',
		detail: `${workspace}’ agent · 53 min ago. Nova is ready: start a conversation to get going.`,
	},
};

export interface Expert {
	initials: string;
	title: string;
	pitch: string;
	tools: { logo: LogoName; name: string }[];
	moreTools?: number;
	isNew?: boolean;
	screen?: Screen;
}

export const experts: Expert[] = [
	{
		initials: 'MG',
		title: 'Marigold · Chief of Staff',
		pitch: 'I learn how you work, then run your week from your inbox.',
		tools: [
			{ logo: 'gmail', name: 'Gmail' },
			{ logo: 'google-drive', name: 'Google Drive' },
		],
		moreTools: 1,
		screen: 'agent',
	},
	{
		initials: 'BS',
		title: 'Basil · Engineer',
		pitch: 'I keep your code moving, from first commit to merge.',
		tools: [
			{ logo: 'github', name: 'GitHub' },
			{ logo: 'jira', name: 'Jira' },
		],
	},
	{
		initials: 'JN',
		title: 'Juniper · Motion Designer',
		pitch: 'Launch videos, product demos and brand promos in motion, cut to music.',
		tools: [
			{ logo: 'google-drive', name: 'Google Drive' },
			{ logo: 'canva', name: 'Canva' },
		],
		moreTools: 1,
		isNew: true,
	},
	{
		initials: 'PP',
		title: 'Pepper · Pull Request Reviewer',
		pitch: 'Reviews pull requests before your senior engineers open the diff.',
		tools: [{ logo: 'github', name: 'GitHub' }],
		isNew: true,
	},
];

export const welcome = {
	crew: [
		{ initials: 'MG', size: 56 },
		{ initials: 'BS', size: 68 },
		{ initials: 'NV', size: 80 },
		{ initials: 'JN', size: 72 },
		{ initials: 'PP', size: 60 },
		{ initials: 'OL', size: 76 },
		{ initials: 'RX', size: 64 },
		{ initials: 'TQ', size: 52 },
	],
	title: 'Welcome to Updraft',
	detail: 'Your agents can browse the web, write code and finish work for you. Add more to your team and see what they build.',
};

export const chat = {
	title: 'Meet Nova',
	agent: 'Nova',
	initials: 'NV',
	time: '54 min ago',
	channels: ['slack', 'gmail', 'outlook'] as LogoName[],
	messages: [
		'Hey Kestrel Labs, Nova here. Ready to fly?',
		'I’ve got my own computer: browser, files and a terminal. So I can actually get work done.',
		'Want to start simple? What do you actually spend your time on?',
	],
	promo: {
		title: 'Work with Nova in Slack and Gmail',
		actions: [
			{ logo: 'slack', label: 'Add to Slack' },
			{ logo: 'gmail', label: 'Add to Gmail' },
		] as { logo: LogoName; label: string }[],
	},
	model: 'Updraft Glide',
	nav: [
		{ label: 'New chat', icon: 'Pencil' },
		{ label: 'Templates', icon: 'LayoutGrid' },
		{ label: 'Archived', icon: 'Archive' },
	] as { label: string; icon: IconName }[],
	create: {
		crew: ['NV', 'BS', 'JN'],
		title: 'Create new agent',
		detail: 'Build an agent to handle tasks, answer questions and work across your tools.',
	},
};

export const agent = {
	initials: 'MG',
	role: 'Chief of Staff',
	name: 'Marigold',
	by: 'By Updraft',
	skills: '1 skill',
	installs: '(4K installs)',
	about:
		'Your Chief of Staff starts by taking the load: it triages your inbox and calendar, flags what should never have been booked, and brings you only what needs you, each item with a recommendation and a weighted call.',
	tools: [
		{ logo: 'gmail', name: 'Gmail' },
		{ logo: 'google-drive', name: 'Google Drive' },
		{ logo: 'notion', name: 'Notion' },
	] as { logo: LogoName; name: string }[],
	skill: 'email-ops · 4K installs',
	benefits: [
		{
			title: 'Inbox zero, every morning',
			detail: 'Wake up to your inbox cleared and your replies pre-drafted. What reaches you comes with context, a recommendation and a judgement call.',
		},
		{
			title: 'A calendar that protects your time',
			detail: 'High-stakes work gets your best hours. Meetings that don’t need you get an answer, a doc or a polite no instead.',
		},
		{
			title: 'Commitments that close themselves',
			detail: 'Everything promised by you or to you gets an owner, a date and a follow-up, so nothing slips because nobody was watching.',
		},
	],
	cta: { title: 'Put Marigold to work', detail: 'I learn how you work, then run your week from your inbox.' },
};

export const accountNav: { label: string; icon: IconName; screen?: Screen }[] = [
	{ label: 'Agents', icon: 'User', screen: 'home' },
	{ label: 'Integrations', icon: 'LayoutGrid', screen: 'integrations' },
	{ label: 'Routines', icon: 'Clock' },
	{ label: 'Account', icon: 'Settings' },
	{ label: 'Workspace', icon: 'Users' },
	{ label: 'Usage & billing', icon: 'BarChart3' },
];

export const accountFooterNav: { label: string; icon: IconName }[] = [
	{ label: 'Upgrade plan', icon: 'Zap' },
	{ label: 'Download for Mac', icon: 'Download' },
	{ label: 'Log out', icon: 'LogOut' },
];

export type IntegrationCategory = 'Engineering' | 'Product' | 'Design' | 'Data' | 'Marketing';

export const integrationTotal = 386;
export const integrationFilters: { label: 'All' | IntegrationCategory; count: number }[] = [
	{ label: 'All', count: integrationTotal },
	{ label: 'Engineering', count: 99 },
	{ label: 'Product', count: 12 },
	{ label: 'Design', count: 11 },
	{ label: 'Data', count: 32 },
	{ label: 'Marketing', count: 24 },
];

export interface Integration {
	name: string;
	detail: string;
	logo?: LogoName;
	categories: IntegrationCategory[];
}

export const integrations: Integration[] = [
	{ logo: 'slack', name: 'Slack', detail: 'Team messaging and collaboration', categories: ['Product'] },
	{ logo: 'notion', name: 'Notion', detail: 'Docs, wikis and databases', categories: ['Product'] },
	{ logo: 'github', name: 'GitHub', detail: 'Repos, issues and pull requests', categories: ['Engineering'] },
	{ logo: 'gmail', name: 'Gmail', detail: 'Email inbox and messaging', categories: ['Marketing'] },
	{ logo: 'stripe', name: 'Stripe', detail: 'Payment processing platform', categories: ['Data'] },
	{ logo: 'google-drive', name: 'Google Drive', detail: 'Cloud file storage and sharing', categories: ['Data'] },
	{ logo: 'jira', name: 'Jira', detail: 'Issue tracking and agile projects', categories: ['Engineering', 'Product'] },
	{ logo: 'confluence', name: 'Confluence', detail: 'Team wikis and shared documentation', categories: ['Engineering', 'Product'] },
	{ logo: 'trello', name: 'Trello', detail: 'Boards for tasks and projects', categories: ['Product'] },
	{ logo: 'google-sheets', name: 'Google Sheets', detail: 'Online spreadsheets', categories: ['Data'] },
	{ logo: 'canva', name: 'Canva', detail: 'Online graphic design', categories: ['Design', 'Marketing'] },
	{ name: 'Updraft', detail: 'Build and manage AI agents', categories: ['Engineering'] },
	{ logo: 'airtable', name: 'Airtable', detail: 'Spreadsheet-database hybrid', categories: ['Data'] },
	{ logo: 'hubspot', name: 'HubSpot', detail: 'CRM for marketing and sales', categories: ['Marketing'] },
	{ logo: 'outlook', name: 'Outlook', detail: 'Email and calendar client', categories: ['Marketing'] },
	{ logo: 'mailchimp', name: 'Mailchimp', detail: 'Email marketing and automation', categories: ['Marketing'] },
	{ logo: 'shopify', name: 'Shopify', detail: 'Ecommerce storefront platform', categories: ['Marketing'] },
	{ logo: 'zapier', name: 'Zapier', detail: 'No-code workflow automation', categories: ['Engineering', 'Data'] },
];
