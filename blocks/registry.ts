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
export const blocks: BlockEntry[] = [];

export function getBlock(slug: string): BlockEntry | undefined {
	return blocks.find((block) => block.slug === slug);
}

export function blockTitle(block: BlockEntry): string {
	return `Blocks ${block.number} · ${block.name}`;
}
