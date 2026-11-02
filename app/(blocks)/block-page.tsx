import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loaders } from '@/blocks/loaders';
import { blockTitle, getBlock } from '@/blocks/registry';

type Params = { params: Promise<{ slug: string }> };

/** Only blocks with code get a page; in-design blocks have no loader yet. */
export function blockStaticParams() {
	return Object.keys(loaders).map((slug) => ({ slug }));
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
	const load = loaders[(await params).slug];
	if (!load) notFound();
	const { default: Block } = await load();
	return <Block />;
}
