import type { Metadata } from 'next';
import { SITE_URL } from '@/site/links';

const description =
	'Ready-made dashboard blocks composed only from NokGridCore components and tokens, in light and dark.';

export const siteMetadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: { default: 'NokGridCore Blocks', template: '%s · NokGridCore Blocks' },
	description,
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		siteName: 'NokGridCore Blocks',
		title: 'NokGridCore Blocks',
		description,
		url: '/',
		images: [{ url: '/blocks/users-admin/thumbnail.png', width: 1152, height: 720 }],
	},
	twitter: { card: 'summary_large_image' },
};
