import { liveBlocks } from '@/blocks/registry';
import { DESIGN_SYSTEM_URL, FIGMA_COMMUNITY_URL } from './links';
import { LinkButton } from './link-button';
import { text } from './text';

const pad2 = (n: number) => String(n).padStart(2, '0');

export function Hero() {
	const count = liveBlocks.length;
	const meta = [`${pad2(count)} ${count === 1 ? 'block' : 'blocks'}`, 'New blocks regularly', 'Free · MIT', 'Light + dark'];

	return (
		<section aria-labelledby='hero-title' className='flex flex-col items-start gap-layout-md px-5 pb-10 pt-12 lg:px-[144px] lg:pb-16 lg:pt-24'>
			<p className='m-0 text-text-brand' style={text['label-md']}>
				BLOCKS
			</p>
			<h1 id='hero-title' className='t-display-hero m-0 max-w-[720px] text-text-primary'>
				Start with blocks, not a blank canvas.
			</h1>
			<p className='m-0 max-w-[600px] text-text-secondary' style={text['body-lg']}>
				Ready-made dashboard sections built only from NokGridCore components and tokens. Open one, see it live,
				then grab the design or the code.
			</p>
			{(['sm', 'md'] as const).map((size) => (
				// Mobile uses the small size, stacked, as in Figma.
				<div key={size} className={`flex-col items-start gap-component-lg lg:flex-row ${size === 'sm' ? 'flex lg:hidden' : 'hidden lg:flex'}`}>
					<LinkButton href={FIGMA_COMMUNITY_URL} variant='primary' size={size}>
						Get the Figma file
					</LinkButton>
					<LinkButton href={DESIGN_SYSTEM_URL} variant='tertiary' size={size}>
						Design system
					</LinkButton>
				</div>
			))}
			<ul className='t-meta m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 text-text-secondary lg:gap-x-6'>
				{meta.map((item, index) => (
					<li key={item} className='flex items-center gap-component-sm'>
						<span
							aria-hidden='true'
							className={`size-1.5 shrink-0 rounded-full ${index === 0 ? 'bg-background-brand' : 'bg-border-strong'}`}
						/>
						{item}
					</li>
				))}
			</ul>
		</section>
	);
}
