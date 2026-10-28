import Link from 'next/link';
import { blocks, blockTitle } from '@/blocks/registry';
import { display, text } from './_site/text';

export default function HomePage() {
	return (
		<main className='mx-auto flex max-w-[960px] flex-col gap-layout-md px-component-xl py-layout-lg'>
			<header className='flex flex-col gap-component-md'>
				<h1 className='m-0 text-text-primary' style={display}>
					NokGridCore Blocks
				</h1>
				<p className='m-0 max-w-[60ch] text-text-secondary' style={text['body-md']}>
					Ready-made dashboard blocks composed only from{' '}
					<a className='text-text-link underline' href='https://www.nokgrid.com/'>
						NokGridCore
					</a>{' '}
					components and tokens, in light and dark. Preview each one, then copy the code.
				</p>
			</header>

			{blocks.length === 0 ?
				<p className='m-0 text-text-secondary' style={text['body-md']}>
					The first block is on its way.
				</p>
			:	<ul className='m-0 flex list-none flex-col gap-component-md p-0'>
					{blocks.map((block) => (
						<li key={block.slug}>
							<Link
								href={`/blocks/${block.slug}`}
								className='flex flex-col gap-component-xs rounded-md border border-solid border-border-default bg-background-surface p-component-xl no-underline transition-colors hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'>
								<span className='text-text-primary' style={text['label-lg']}>
									{blockTitle(block)}
								</span>
								<span className='text-text-secondary' style={text['body-sm']}>
									{block.description}
								</span>
							</Link>
						</li>
					))}
				</ul>
			}
		</main>
	);
}
