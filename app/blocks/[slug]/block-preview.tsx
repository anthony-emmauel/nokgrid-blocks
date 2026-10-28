'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import type { BlockWidth } from '@/blocks/registry';
import { text } from '@/app/_site/text';

type Theme = 'light' | 'dark';
const THEMES: Theme[] = ['light', 'dark'];
const THEME_LABELS: Record<Theme, string> = { light: 'Light', dark: 'Dark' };

interface BlockPreviewProps {
	slug: string;
	title: string;
	widths: BlockWidth[];
	frameHeight: number;
}

/**
 * Renders /preview/<slug> at a real viewport width, scaled down to fit.
 * The iframe is same-origin, so the theme is switched in place (keeping the
 * block's state) and its height follows the content.
 */
export function BlockPreview({ slug, title, widths, frameHeight }: BlockPreviewProps) {
	const [theme, setTheme] = useState<Theme>('light');
	const [width, setWidth] = useState<BlockWidth>(widths.includes(1440) ? 1440 : widths[0]);
	const [available, setAvailable] = useState(0);
	const [contentHeight, setContentHeight] = useState(frameHeight);
	const stageRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<HTMLIFrameElement>(null);
	// Fixed on mount: changing src would reload the block and lose its state.
	const [src] = useState(`/preview/${slug}?theme=light`);

	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;
		const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
		observer.observe(stage);
		return () => observer.disconnect();
	}, []);

	const applyTheme = useCallback(() => {
		const root = frameRef.current?.contentDocument?.documentElement;
		if (root) root.dataset.theme = theme;
	}, [theme]);

	useEffect(applyTheme, [applyTheme]);

	const heightObserver = useRef<ResizeObserver>(null);
	const observeHeight = useCallback(() => {
		const doc = frameRef.current?.contentDocument;
		if (!doc?.body) return;
		const measure = () =>
			setContentHeight(Math.max(frameHeight, doc.documentElement.scrollHeight));
		measure();
		heightObserver.current?.disconnect();
		heightObserver.current = new ResizeObserver(measure);
		heightObserver.current.observe(doc.body);
	}, [frameHeight]);

	useEffect(() => () => heightObserver.current?.disconnect(), []);

	const scale = available ? Math.min(1, available / width) : 1;

	return (
		<section aria-labelledby='preview-heading' className='flex flex-col gap-component-md'>
			<div className='flex flex-wrap items-center justify-between gap-component-md'>
				<h2 id='preview-heading' className='m-0 text-text-primary' style={text['label-lg']}>
					Preview
				</h2>
				<div className='flex flex-wrap items-center gap-component-lg'>
					<TabGroup
						appearance='elevated'
						role='group'
						aria-label='Theme'
						activeIndex={THEMES.indexOf(theme)}
						onActiveIndexChange={(index) => setTheme(THEMES[index])}>
						{THEMES.map((option) => (
							<Tab
								key={option}
								appearance='elevated'
								label={THEME_LABELS[option]}
								leadingIcon={option === 'light' ? 'Sun' : 'Moon'}
								aria-pressed={theme === option}
							/>
						))}
					</TabGroup>
					{widths.length > 1 && (
						<TabGroup
							appearance='elevated'
							role='group'
							aria-label='Viewport width'
							activeIndex={widths.indexOf(width)}
							onActiveIndexChange={(index) => setWidth(widths[index])}>
							{widths.map((option) => (
								<Tab
									key={option}
									appearance='elevated'
									label={`${option}`}
									leadingIcon={option < 768 ? 'Smartphone' : 'Monitor'}
									aria-pressed={width === option}
									aria-label={`${option} pixels wide`}
								/>
							))}
						</TabGroup>
					)}
					<a
						href={`/preview/${slug}?theme=${theme}`}
						target='_blank'
						rel='noreferrer'
						className='text-text-link underline'
						style={text['body-sm']}>
						Open full screen
					</a>
				</div>
			</div>

			<div
				ref={stageRef}
				className='overflow-hidden rounded-md border border-solid border-border-default bg-background-sunken'>
				<div style={{ width: width * scale, height: contentHeight * scale, margin: '0 auto' }}>
					<iframe
						ref={frameRef}
						src={src}
						title={`${title} preview, ${width} pixels wide`}
						onLoad={() => {
							applyTheme();
							observeHeight();
						}}
						style={{
							width,
							height: contentHeight,
							border: 0,
							display: 'block',
							transform: `scale(${scale})`,
							transformOrigin: 'top left',
						}}
					/>
				</div>
			</div>
		</section>
	);
}
