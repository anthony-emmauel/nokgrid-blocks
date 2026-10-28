import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { codeToHtml } from 'shiki';
import { Badge } from '@nokgridcore/ui/badge';
import { blocks, blockTitle, getBlock } from '@/blocks/registry';
import { display, text } from '@/app/_site/text';
import { BlockPreview } from './block-preview';
import { CodeTabs, type CodeFile } from './code-tabs';

const REPO = 'https://github.com/anthony-emmauel/nokgrid-blocks';
const FILES = ['index.tsx', 'data.ts'];

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

async function readBlockFiles(slug: string): Promise<CodeFile[]> {
	return Promise.all(
		FILES.map(async (name) => {
			const source = await readFile(path.join(process.cwd(), 'blocks', slug, name), 'utf8');
			const html = await codeToHtml(source, {
				lang: 'tsx',
				theme: 'github-dark',
			});
			return { name, source, html };
		}),
	);
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const block = getBlock(slug);
	if (!block) notFound();
	const files = await readBlockFiles(slug);
	const linkClass = 'text-text-link underline';

	return (
		<main className='mx-auto flex max-w-[1600px] flex-col gap-layout-md px-component-xl py-layout-md'>
			<nav aria-label='Breadcrumb' style={text['body-sm']}>
				<Link href='/' className={linkClass}>
					All blocks
				</Link>
			</nav>

			<header className='flex flex-col gap-component-md'>
				<h1 className='m-0 text-text-primary' style={display}>
					{blockTitle(block)}
				</h1>
				<p className='m-0 max-w-[70ch] text-text-secondary' style={text['body-md']}>
					{block.description}
				</p>
				<ul
					className='m-0 flex list-none flex-wrap gap-component-lg p-0'
					style={text['body-sm']}>
					<li>
						<a className={linkClass} href={block.figma}>
							Figma frame
						</a>
					</li>
					<li>
						<a className={linkClass} href={`${REPO}/tree/main/blocks/${slug}`}>
							Source on GitHub
						</a>
					</li>
				</ul>
			</header>

			<BlockPreview
				slug={slug}
				title={blockTitle(block)}
				widths={block.widths}
				frameHeight={block.frameHeight}
			/>

			<section aria-labelledby='code-heading' className='flex flex-col gap-component-md'>
				<h2 id='code-heading' className='m-0 text-text-primary' style={text['label-lg']}>
					Code
				</h2>
				<p className='m-0 text-text-secondary' style={text['body-sm']}>
					Needs <code>@nokgridcore/ui</code> and <code>@nokgridcore/tokens</code>. Swap the
					placeholder data in <code>data.ts</code>.
				</p>
				<CodeTabs files={files} />
			</section>

			<section aria-labelledby='components-heading' className='flex flex-col gap-component-md'>
				<h2 id='components-heading' className='m-0 text-text-primary' style={text['label-lg']}>
					Components used
				</h2>
				<ul className='m-0 flex list-none flex-wrap gap-component-sm p-0'>
					{block.components.map((name) => (
						<li key={name}>
							<Badge label={name} variant='neutral' size='medium' />
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
