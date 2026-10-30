'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The 16:10 card thumbnail. If the block has a cover video it plays on hover
 * (desktop) or while the card is in view (touch), muted and inline. Under
 * prefers-reduced-motion only the thumbnail shows.
 */
export function CardMedia({
	thumbnail,
	coverVideo,
	hovered,
	priority = false,
}: {
	thumbnail: string;
	coverVideo?: string;
	hovered: boolean;
	priority?: boolean;
}) {
	const rootRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [motionOK, setMotionOK] = useState(false);
	const [canHover, setCanHover] = useState(true);
	const [inView, setInView] = useState(false);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)');
		const hover = matchMedia('(hover: hover)');
		const update = () => {
			setMotionOK(!reduce.matches);
			setCanHover(hover.matches);
		};
		update();
		reduce.addEventListener('change', update);
		hover.addEventListener('change', update);
		return () => {
			reduce.removeEventListener('change', update);
			hover.removeEventListener('change', update);
		};
	}, []);

	useEffect(() => {
		const root = rootRef.current;
		if (!coverVideo || canHover || !root) return;
		const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
			threshold: 0.6,
		});
		observer.observe(root);
		return () => observer.disconnect();
	}, [coverVideo, canHover]);

	const shouldPlay = Boolean(coverVideo) && motionOK && (canHover ? hovered : inView);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (shouldPlay) video.play().catch(() => undefined);
		else video.pause();
	}, [shouldPlay]);

	return (
		<div ref={rootRef} className='relative aspect-[16/10] w-full overflow-hidden bg-background-sunken'>
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
			{coverVideo && motionOK && (
				<video
					ref={videoRef}
					muted
					loop
					playsInline
					preload='none'
					aria-hidden='true'
					onPlaying={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
					className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
						playing && shouldPlay ? 'opacity-100' : 'opacity-0'
					}`}>
					<source src={`${coverVideo}.webm`} type='video/webm' />
					<source src={`${coverVideo}.mp4`} type='video/mp4' />
				</video>
			)}
		</div>
	);
}
