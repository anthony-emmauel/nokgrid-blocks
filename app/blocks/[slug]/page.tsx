import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blocks, blockTitle, getBlock } from '@/blocks/registry';

export const dynamicParams = false;

export function generateStaticParams() {
	return blocks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const block = getBlock((await params).slug);
	return block ? { title: blockTitle(block), description: block.description } : {};
}

/** The block alone, full screen, like a real app page. */
export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
	const block = getBlock((await params).slug);
	if (!block) notFound();
	const { default: Block } = await block.load();
	return <Block />;
}
