import type { ComponentType } from 'react';

/** Viewport widths a block has a Figma frame for. */
export type BlockWidth = 390 | 1440 | 1920;

export interface BlockEntry {
	/** Same slug everywhere: branch, folder, URL, portfolio entry. */
	slug: string;
	/** Two-digit block number, e.g. "01". */
	number: string;
	name: string;
	description: string;
	/** NokGridCore components the block is composed from, as named in Figma. */
	components: string[];
	/** Figma frame: internal link until the block is public on Figma Community. */
	figma: string;
	widths: BlockWidth[];
	/** Height of the Figma frame, used as the preview's minimum height. */
	frameHeight: number;
	load: () => Promise<{ default: ComponentType }>;
}

// Add new blocks here, newest last.
export const blocks: BlockEntry[] = [
	{
		slug: 'users-admin',
		number: '01',
		name: 'Users admin',
		description:
			'An admin-centre users screen: top bar, sidebar nav, breadcrumb, page header, secondary nav, command bar and a users table with search, a user-type filter and row selection.',
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
		figma:
			'https://www.figma.com/design/UY2Mue2lSBmcaGdvjC6CRa/NokGridCore---Blocks-internal?node-id=2-1969',
		widths: [1440, 1920],
		frameHeight: 1000,
		load: () => import('./users-admin'),
	},
];

export function getBlock(slug: string): BlockEntry | undefined {
	return blocks.find((block) => block.slug === slug);
}

export function blockTitle(block: BlockEntry): string {
	return `Blocks ${block.number} · ${block.name}`;
}
