// Placeholder content for the block. Swap these for your own data.
import type { IconName } from '@nokgridcore/ui/icon';

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
export const user = { initials: 'SO', name: 'Sam Okafor' };

export const accountNav: { label: string; icon: IconName; current?: boolean }[] = [
	{ label: 'Agents', icon: 'User' },
	{ label: 'Integrations', icon: 'LayoutGrid', current: true },
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
