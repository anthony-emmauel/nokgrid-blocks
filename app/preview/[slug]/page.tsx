import { notFound } from 'next/navigation';
import { blocks, getBlock } from '@/blocks/registry';

export const dynamicParams = false;

export function generateStaticParams() {
	return blocks.map(({ slug }) => ({ slug }));
}

export const metadata = { robots: { index: false } };

/** The block alone, full-bleed. The block page shows this in an iframe. */
export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const block = getBlock(slug);
	if (!block) notFound();
	const { default: Block } = await block.load();

	return <Block />;
}
