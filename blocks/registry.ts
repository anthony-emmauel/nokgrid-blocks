// One entry per block. The landing page (cards, filter chips, counts, the meta
// line, the preview modal) and the block pages are all generated from this
// list, so adding a block means adding an entry here and its folder.
// Block code is loaded separately, in ./loaders.ts.

/** Viewport widths a block has a Figma frame for. */
export type BlockWidth = 390 | 1440 | 1920;

/** `in-design` blocks show on the landing page but don't open the preview yet. */
export type BlockStatus = 'live' | 'in-design';

export interface BlockEntry {
	/** Same slug everywhere: branch, folder, URL, portfolio entry. */
	slug: string;
	/** Two-digit block number, e.g. "01". */
	number: string;
	name: string;
	/** One line for the landing card. */
	description: string;
	/** The preview modal's header line; `short` is used on mobile. */
	modalDescription: { full: string; short: string };
	/** Neutral badges on the card. */
	tags: string[];
	/** Landing filter chips this block counts towards. */
	categories: string[];
	status: BlockStatus;
	/** ISO date the block shipped (or is planned); sorts the grid newest first. */
	date: string;
	/** 16:10 card thumbnail, path without extension (.avif, .webp and .png exist). */
	thumbnail: string;
	/** Optional looping cover, path without extension (.webm and .mp4 exist). */
	coverVideo?: string;
	/** Figma frame: internal link until the block is public on Figma Community. */
	figma: string;
	/** NokGridCore components the block is composed from, as named in Figma. */
	components: string[];
	widths: BlockWidth[];
	/** Height of the Figma frame, used as the minimum preview height. */
	frameHeight: number;
}

const figmaFrame = (nodeId: string) =>
	`https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=${nodeId}`;

export const blocks: BlockEntry[] = [
	{
		slug: 'users-admin',
		number: '01',
		name: 'Users admin',
		description: 'An admin users screen: sidebar nav, filters and a dense users table, in light and dark.',
		modalDescription: {
			full: 'Admin users screen: sidebar nav, filters and a dense users table. Light and dark.',
			short: 'Admin users screen · light and dark',
		},
		tags: ['Admin', 'Table', 'Filters', 'Light + dark'],
		categories: ['Admin', 'Tables'],
		status: 'live',
		date: '2026-10-28',
		thumbnail: '/blocks/users-admin/thumbnail',
		coverVideo: '/blocks/users-admin/cover',
		figma: figmaFrame('36-7279'),
		components: [
			'top-bar',
			'sidebar',
			'sidebar-header',
			'sidebar-content',
			'sidebar-group',
			'sidebar-footer',
			'menu-item',
			'breadcrumb',
			'breadcrumb-item',
			'avatar',
			'badge-count',
			'button',
			'search-input',
			'tab',
			'table',
			'table-toolbar',
			'table-header-cell',
			'table-row',
			'table-cell',
			'checkbox',
			'popover',
			'option',
			'chip',
		],
		widths: [1440, 1920],
		frameHeight: 1000,
	},
	{
		slug: 'ai-resume-builder',
		number: '02',
		name: 'AI resume builder',
		description: 'Dashboard with a tools grid, stats and resume progress. In design, coming next.',
		modalDescription: {
			full: 'An AI resume builder: dashboard, sample library, job search, editor, review and settings. Light and dark.',
			short: 'AI resume builder · light and dark',
		},
		tags: ['AI tool', 'Dashboard', 'Library'],
		categories: ['AI tools', 'Dashboards'],
		status: 'in-design',
		date: '2026-10-30',
		thumbnail: '/blocks/ai-resume-builder/thumbnail',
		figma: figmaFrame('53-1702'),
		components: [],
		widths: [1440],
		frameHeight: 1000,
	},
];

export const liveBlocks = blocks.filter((block) => block.status === 'live');

export function getBlock(slug: string): BlockEntry | undefined {
	return blocks.find((block) => block.slug === slug);
}

export function blockTitle(block: BlockEntry): string {
	return `Blocks ${block.number} · ${block.name}`;
}

/** Released blocks newest first, then blocks still in design. */
export function sortedBlocks(): BlockEntry[] {
	const rank = (block: BlockEntry) => (block.status === 'live' ? 0 : 1);
	return [...blocks].sort((a, b) => rank(a) - rank(b) || b.date.localeCompare(a.date));
}

/** The newest released block gets the "New" badge. */
export function newestLiveSlug(): string | undefined {
	return [...liveBlocks].sort((a, b) => b.date.localeCompare(a.date))[0]?.slug;
}
