'use client';

import { useEffect, useRef, useState, type PointerEvent, type SyntheticEvent } from 'react';
import { Icon } from '@nokgridcore/ui/icon';
import { text } from './text';

const TIMEOUT_MS = 4000;
// The live block is a desktop layout: on phones it renders at this size and
// people pan and pinch around it.
const DESKTOP = { width: 1280, height: 900 };
// Start slightly zoomed out, as in Figma, so the sidebar and content both show.
const START_SCALE = 0.7;
const MIN_SCALE = 0.35;
const MAX_SCALE = 2;

type State = 'loading' | 'ready' | 'failed';

/**
 * A browser-chrome frame around a lazy <iframe> of the live block. The
 * thumbnail shows until it loads, and stays if it errors or takes over ~4s.
 * On touch screens the block can be dragged to pan and pinched to zoom.
 */
export function LiveFrame({
	src,
	displayUrl,
	poster,
	title,
	touch,
	onEscape,
}: {
	src: string;
	displayUrl: string;
	poster: string;
	title: string;
	touch: boolean;
	/** Esc pressed inside the block (and not handled by it, e.g. by its own dropdown). */
	onEscape: () => void;
}) {
	const [state, setState] = useState<State>('loading');

	// Keys pressed inside the iframe never reach the dialog, so listen there too.
	// The block is same-origin; window listeners run after the block's own handlers.
	function onFrameLoad(event: SyntheticEvent<HTMLIFrameElement>) {
		setState('ready');
		event.currentTarget.contentWindow?.addEventListener('keydown', (key) => {
			if (key.key === 'Escape' && !key.defaultPrevented) onEscape();
		});
	}

	useEffect(() => {
		const timer = setTimeout(() => setState((s) => (s === 'loading' ? 'failed' : s)), TIMEOUT_MS);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-solid border-border-default bg-background-surface'>
			<div className='flex shrink-0 items-center gap-component-md bg-background-sunken px-component-lg py-[10px]'>
				<span aria-hidden='true' className='flex gap-[6px]'>
					{[0, 1, 2].map((dot) => (
						<span key={dot} className='size-[10px] rounded-full bg-border-strong' />
					))}
				</span>
				<span
					className='min-w-0 flex-1 truncate rounded-md bg-background-surface px-component-md py-component-xs text-text-secondary'
					style={text['caption-md']}>
					{displayUrl}
				</span>
				<span className='hidden shrink-0 items-center gap-[6px] text-text-secondary lg:flex' style={text['caption-md']}>
					<span aria-hidden='true' className='size-1.5 rounded-full bg-background-brand' />
					Live · scroll and click
				</span>
			</div>

			<div className='relative min-h-0 flex-1 overflow-hidden bg-background-canvas'>
				{state !== 'failed' &&
					(touch ?
						<PanZoomFrame src={src} title={title} ready={state === 'ready'} onLoad={onFrameLoad} />
					:	<iframe
							src={src}
							title={`${title}, live preview`}
							onLoad={onFrameLoad}
							onError={() => setState('failed')}
							className={`absolute inset-0 size-full border-0 transition-opacity duration-300 ${
								state === 'ready' ? 'opacity-100' : 'opacity-0'
							}`}
						/>)}
				{state !== 'ready' && (
					<div className='absolute inset-0'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={`${poster}.png`} alt='' className='size-full object-cover object-top' />
						{state === 'failed' && (
							<p
								className='absolute inset-x-0 bottom-0 m-0 bg-background-surface px-component-lg py-component-md text-center text-text-secondary'
								style={text['body-sm']}>
								The live preview didn&apos;t load here. Use “Open live block” below.
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

/**
 * Touch screens: the iframe sits at desktop size inside a pan/zoom layer.
 * Pointer events go to the layer (drag pans, two fingers zoom); a tap is
 * passed through to the element under it in the block, which is same-origin.
 */
function PanZoomFrame({
	src,
	title,
	ready,
	onLoad,
}: {
	src: string;
	title: string;
	ready: boolean;
	onLoad: (event: SyntheticEvent<HTMLIFrameElement>) => void;
}) {
	const frameRef = useRef<HTMLIFrameElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const pointers = useRef(new Map<number, { x: number; y: number }>());
	const gesture = useRef({ moved: false, startDistance: 0, startScale: 1, start: { x: 0, y: 0 }, at: 0 });
	const [view, setView] = useState({ x: 0, y: 0, scale: START_SCALE });
	const [hint, setHint] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setHint(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	// Keep the block covering the stage: no panning past its edges.
	function clamp(next: { x: number; y: number; scale: number }) {
		const stage = stageRef.current?.getBoundingClientRect();
		if (!stage) return next;
		const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
		const w = DESKTOP.width * scale;
		const h = DESKTOP.height * scale;
		const x = w <= stage.width ? 0 : Math.min(0, Math.max(stage.width - w, next.x));
		const y = h <= stage.height ? 0 : Math.min(0, Math.max(stage.height - h, next.y));
		return { x, y, scale };
	}

	function onPointerDown(event: PointerEvent<HTMLDivElement>) {
		event.currentTarget.setPointerCapture(event.pointerId);
		pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
		const g = gesture.current;
		if (pointers.current.size === 1) {
			g.moved = false;
			g.start = { x: event.clientX, y: event.clientY };
			g.at = Date.now();
		}
		if (pointers.current.size === 2) {
			const [a, b] = [...pointers.current.values()];
			g.startDistance = Math.hypot(a.x - b.x, a.y - b.y);
			g.startScale = view.scale;
		}
	}

	function onPointerMove(event: PointerEvent<HTMLDivElement>) {
		const previous = pointers.current.get(event.pointerId);
		if (!previous) return;
		const current = { x: event.clientX, y: event.clientY };
		pointers.current.set(event.pointerId, current);
		const g = gesture.current;
		if (Math.hypot(current.x - g.start.x, current.y - g.start.y) > 6) g.moved = true;

		if (pointers.current.size === 1) {
			setView((v) => clamp({ ...v, x: v.x + current.x - previous.x, y: v.y + current.y - previous.y }));
		} else if (pointers.current.size === 2) {
			const [a, b] = [...pointers.current.values()];
			const stage = stageRef.current!.getBoundingClientRect();
			const mid = { x: (a.x + b.x) / 2 - stage.left, y: (a.y + b.y) / 2 - stage.top };
			setView((v) => {
				const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, (g.startScale * Math.hypot(a.x - b.x, a.y - b.y)) / g.startDistance));
				// Zoom around the point between the fingers.
				const k = scale / v.scale;
				return clamp({ scale, x: mid.x - (mid.x - v.x) * k, y: mid.y - (mid.y - v.y) * k });
			});
		}
		if (g.moved) setHint(false);
	}

	function onPointerUp(event: PointerEvent<HTMLDivElement>) {
		const g = gesture.current;
		const wasSingle = pointers.current.size === 1;
		pointers.current.delete(event.pointerId);
		if (!wasSingle || g.moved || Date.now() - g.at > 500) return;
		// A tap: click whatever is under the finger inside the block.
		const stage = stageRef.current!.getBoundingClientRect();
		const doc = frameRef.current?.contentDocument;
		const target = doc?.elementFromPoint(
			(event.clientX - stage.left - view.x) / view.scale,
			(event.clientY - stage.top - view.y) / view.scale,
		);
		// The element belongs to the iframe's window (so `instanceof HTMLElement`
		// fails here), and is often an SVG icon: climb to the nearest HTML element.
		let element: Element | null | undefined = target;
		while (element && !('click' in element && 'focus' in element)) element = element.parentElement;
		const html = element as HTMLElement | null | undefined;
		html?.focus({ preventScroll: true });
		html?.click();
	}

	return (
		<div
			ref={stageRef}
			className='absolute inset-0 touch-none overflow-hidden'
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerCancel={(event) => pointers.current.delete(event.pointerId)}>
			<iframe
				ref={frameRef}
				src={src}
				title={`${title}, live preview`}
				tabIndex={-1}
				onLoad={onLoad}
				className={`pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-300 ${
					ready ? 'opacity-100' : 'opacity-0'
				}`}
				style={{
					width: DESKTOP.width,
					height: DESKTOP.height,
					transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
				}}
			/>
			<div
				aria-hidden='true'
				className={`pointer-events-none absolute bottom-[19px] left-1/2 flex -translate-x-1/2 items-center gap-component-sm whitespace-nowrap rounded-full bg-background-inverse py-[10px] pl-[14px] pr-component-lg text-background-canvas shadow-lg transition-opacity duration-500 ${
					hint ? 'opacity-100' : 'opacity-0'
				}`}
				style={text['label-md']}>
				<Icon name='Move' size='sm' />
				Drag to pan around · pinch to zoom
			</div>
		</div>
	);
}
