import type { MetadataRoute } from 'next';
import { loaders } from '@/blocks/loaders';
import { getBlock } from '@/blocks/registry';
import { SITE_URL } from '@/site/links';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
		...Object.keys(loaders).map((slug) => ({
			url: `${SITE_URL}/blocks/${slug}`,
			lastModified: getBlock(slug)?.date,
			changeFrequency: 'monthly' as const,
		})),
	];
}
