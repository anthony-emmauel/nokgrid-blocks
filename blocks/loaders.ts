import type { ComponentType } from 'react';

/** Props every block page receives: the URL segments after /blocks/<slug>. */
export interface BlockProps {
	screen?: string[];
}

interface BlockLoader {
	load: () => Promise<{ default: ComponentType<BlockProps> }>;
	/** Extra client-side routes the block has, e.g. ['settings'] → /blocks/<slug>/settings. */
	screens?: string[][];
}

// Block code, by slug. Only the block pages import this, so the landing page
// never bundles a block. Add a loader when a block goes live.
export const loaders: Record<string, BlockLoader> = {
	'users-admin': { load: () => import('./users-admin') },
	'ai-resume-builder': {
		load: () => import('./ai-resume-builder'),
		screens: [['sample-library'], ['job-search'], ['project-editor'], ['review'], ['settings']],
	},
};
