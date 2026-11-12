// Placeholder content for the block. Swap these for your own data.
import type { IconName } from '@nokgridcore/ui/icon';

export type Screen = 'space' | 'page';
export type LogoName = 'notion' | 'slack' | 'jira' | 'google-drive' | 'google-sheets' | 'confluence' | 'github';

export interface Person {
	initials: string;
	name: string;
	photo: string;
}

const photo = (file: string) => `/blocks/folio/people/${file}.webp`;
export const people = {
	ab: { initials: 'AB', name: 'Ade Bello', photo: photo('ade-bello') },
	so: { initials: 'SO', name: 'Sam Okafor', photo: photo('sam-okafor') },
	dr: { initials: 'DR', name: 'Dami Reyes', photo: photo('dami-reyes') },
	gt: { initials: 'GT', name: 'Grace Tan', photo: photo('grace-tan') },
} satisfies Record<string, Person>;

export const me = people.so;
export const app = { name: 'Folio', search: 'Search Folio, tasks, designs and other apps' };

export const mainNav: { label: string; icon: IconName; more?: boolean }[] = [
	{ label: 'For you', icon: 'User' },
	{ label: 'Recent', icon: 'Clock', more: true },
	{ label: 'Starred', icon: 'Star', more: true },
	{ label: 'Spaces', icon: 'Compass', more: true },
	{ label: 'Apps', icon: 'LayoutGrid' },
];

export const space = {
	name: 'Northstar',
	project: 'Northstar Overhaul',
	createdBy: people.ab,
	updated: 'Updated 29 days ago',
	collaborators: [people.ab, people.so, people.dr, people.gt],
	apps: ['notion', 'github', 'google-drive', 'jira'] as LogoName[],
	appCount: 5,
	banner: '/blocks/folio/banner.webp',
};

export interface Doc {
	slug: string;
	title: string;
	icon: IconName;
	source?: LogoName;
	collaborators: Person[];
	edited: string;
	/** Only this page has its own screen in the block. */
	opens?: boolean;
}

export const docs: Doc[] = [
	{ slug: 'picking-flow', title: 'Picking flow requirements', icon: 'FileText', source: 'notion', collaborators: [people.ab], edited: '12 months ago' },
	{ slug: 'q3-roadmap', title: 'Q3 roadmap (shared draft)', icon: 'LayoutList', source: 'confluence', collaborators: [people.so, people.ab], edited: '12 months ago' },
	{ slug: 'picker-app-usability-study', title: 'Picker app usability study', icon: 'FileText', source: 'google-sheets', collaborators: [people.so], edited: '11 months ago', opens: true },
	{ slug: 'returns-automation', title: 'Returns automation brief', icon: 'FileText', source: 'jira', collaborators: [people.so], edited: '10 months ago' },
	{ slug: 'order-status', title: 'Order status & label system', icon: 'FileText', collaborators: [people.dr, people.so], edited: '8 months ago' },
	{ slug: 'packing-station', title: 'Packing station redesign', icon: 'FileText', source: 'notion', collaborators: [people.so, people.ab, people.dr], edited: '9 months ago' },
	{ slug: 'courier-hand-off', title: 'Courier hand-off ideas', icon: 'FileText', source: 'slack', collaborators: [people.ab], edited: '29 days ago' },
];

export const spaceApps: { label: string; icon: IconName }[] = [
	{ label: 'Page approval', icon: 'ShieldCheck' },
	{ label: 'Diagrams', icon: 'Workflow' },
];

export const linkedApps: { label: string; icon: IconName }[] = [
	{ label: 'Tracker', icon: 'Kanban' },
	{ label: 'Teams', icon: 'Users' },
];

export const promo = {
	title: 'Unlock Folio AI in every tab',
	detail: '50K+ teams use it to chat with AI that understands their company.',
	link: 'Get the browser extension',
};

export const page = {
	title: 'Picker app usability study',
	published: 'Published Dec 9, 2025',
	author: people.ab,
	meta: [
		{ icon: 'Clock', label: '3 min read' },
		{ icon: 'Volume2', label: 'Listen' },
		{ icon: 'TrendingUp', label: '2 views' },
		{ icon: 'MessageCircle', label: '4 comments' },
		{ icon: 'ShieldCheck', label: 'Request approval' },
	] as { icon: IconName; label: string }[],
	sections: [
		{
			heading: 'Summary',
			paragraphs: [
				'We watched eight pickers use the handheld app during real shifts to see where the pick, pack and hand-off steps slow down. The app works, but three moments cost the most time: finding the next location, confirming a short pick, and handing a tote to packing.',
				'Fixing these three moments would save an estimated 40 seconds per order, roughly one extra wave per shift for a team of ten.',
			],
		},
		{
			heading: 'What we tested',
			paragraphs: ['Each session followed a picker through one full wave. We timed every step, noted errors and asked short questions between orders.'],
			list: {
				heading: 'Key findings',
				items: [
					'The next location is shown in small grey text, so pickers scroll back to check it on almost every pick.',
					'Short picks take four taps to confirm, and most pickers skip the reason field.',
					'Tote hand-off has no confirmation, so packers often wait for a tote that is still on a trolley.',
				],
			},
		},
		{
			heading: 'Next steps',
			paragraphs: ['Prototype a larger next-location card and a one-tap short pick, then test both with the same group in two weeks.'],
		},
	] as { heading: string; paragraphs: string[]; list?: { heading: string; items: string[] } }[],
};
