import type { ComponentType } from 'react';

// Block code, by slug. Only the block pages import this, so the landing page
// never bundles a block. Add a loader when a block goes live.
export const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
	'users-admin': () => import('./users-admin'),
};
