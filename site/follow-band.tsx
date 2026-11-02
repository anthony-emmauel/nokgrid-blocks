import { FIGMA_COMMUNITY_URL, LINKEDIN_URL } from './links';
import { LinkButton } from './link-button';
import { text } from './text';

export function FollowBand() {
	return (
		<section
			aria-labelledby='follow-title'
			className='flex flex-col items-start justify-between gap-layout-lg border-0 border-t border-solid border-border-default bg-background-surface px-5 py-10 lg:flex-row lg:items-center lg:px-[144px] lg:py-16'>
			<div className='flex flex-col gap-component-sm'>
				<h2 id='follow-title' className='t-display-lg m-0 text-text-primary'>
					New blocks, regularly.
				</h2>
				<p className='m-0 max-w-[480px] text-text-secondary' style={text['body-md']}>
					Follow on LinkedIn or the Figma Community to get each one first.
				</p>
			</div>
			<div>
				{(['sm', 'md'] as const).map((size) => (
					// Mobile uses the small size, as in Figma.
					<div key={size} className={`flex-col items-start gap-component-lg lg:flex-row ${size === 'sm' ? 'flex lg:hidden' : 'hidden lg:flex'}`}>
						<LinkButton href={LINKEDIN_URL} variant='tertiary' size={size}>
							Follow on LinkedIn
						</LinkButton>
						<LinkButton href={FIGMA_COMMUNITY_URL} variant='primary' size={size}>
							Figma Community
						</LinkButton>
					</div>
				))}
			</div>
		</section>
	);
}
