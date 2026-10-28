import { blocks } from '@/blocks/registry';

/** The site opens straight into the latest block, full screen. */
export default async function HomePage() {
	const { default: Block } = await blocks[blocks.length - 1].load();
	return <Block />;
}
