/** The 16:10 card thumbnail: a static image, AVIF/WebP with a PNG fallback. */
export function CardMedia({ thumbnail, priority = false }: { thumbnail: string; priority?: boolean }) {
	return (
		<div className='relative aspect-[16/10] w-full overflow-hidden bg-background-sunken'>
			<picture>
				<source srcSet={`${thumbnail}.avif`} type='image/avif' />
				<source srcSet={`${thumbnail}.webp`} type='image/webp' />
				<img
					src={`${thumbnail}.png`}
					alt=''
					width={1152}
					height={720}
					loading={priority ? 'eager' : 'lazy'}
					decoding='async'
					className='absolute inset-0 h-full w-full object-cover'
				/>
			</picture>
		</div>
	);
}
