import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loaders } from '@/blocks/loaders';
import { blockTitle, getBlock } from '@/blocks/registry';

type Params = { params: Promise<{ slug: string; screen?: string[] }> };

/** Every block's own page plus each of its client-side routes; in-design blocks have no loader yet. */
export function blockStaticParams() {
	return Object.entries(loaders).flatMap(([slug, { screens = [] }]) => [
		{ slug, screen: [] },
		...screens.map((screen) => ({ slug, screen })),
	]);
}

export async function blockMetadata({ params }: Params): Promise<Metadata> {
	const block = getBlock((await params).slug);
	if (!block) return {};
	const path = `/blocks/${block.slug}`;
	return {
		title: blockTitle(block),
		description: block.description,
		alternates: { canonical: path },
		openGraph: {
			title: blockTitle(block),
			description: block.description,
			url: path,
			images: [{ url: `${block.thumbnail}.png`, width: 1152, height: 720 }],
		},
	};
}

/** The block alone, full screen, like a real app page. */
export async function BlockPage({ params }: Params) {
	const { slug, screen = [] } = await params;
	const loader = loaders[slug];
	const known = screen.length === 0 || loader?.screens?.some((s) => s.join('/') === screen.join('/'));
	if (!loader || !known) notFound();
	const { default: Block } = await loader.load();
	return <Block screen={screen} />;
}
