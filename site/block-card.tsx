'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { Badge } from '@nokgridcore/ui/badge';
import { Card } from '@nokgridcore/ui/card';
import type { BlockEntry } from '@/blocks/registry';
import { CardMedia } from './card-media';

// Card overrides (listed in NOKGRID-GAPS.md; remove once Card supports them):
// 1. Card has a fixed pixel width per size: stretch it to the grid column.
// 2. Its media area has a fixed 120–160px height: let the 16:10 media size it.
// 3. Its border is an inline style, so hover needs !important to reach it.
const cardClass = [
	'[&>div:first-child]:!h-auto',
	'group-hover:!border-[var(--nok-color-border-strong)]',
	'transition-colors',
].join(' ');

/**
 * One block on the landing page: NokGridCore Card (size lg, bleed media) with
 * the thumbnail, "NN · Title", the description and neutral tag badges. Live
 * blocks are a single link that opens the preview; in-design blocks aren't
 * interactive.
 */
export function BlockCard({
	block,
	isNew,
	priority,
	onOpen,
}: {
	block: BlockEntry;
	isNew: boolean;
	priority: boolean;
	onOpen: () => void;
}) {
	const [hovered, setHovered] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const live = block.status === 'live';
	const title = `${block.number} · ${block.name}`;

	// 4. Card renders its title as a <p>; give it heading semantics (an h3).
	useLayoutEffect(() => {
		const titleEl = cardRef.current?.querySelector(':scope > div:last-child p');
		titleEl?.setAttribute('role', 'heading');
		titleEl?.setAttribute('aria-level', '3');
	}, []);

	const tags = live ? block.tags : [...block.tags, 'In design'];

	const card = (
		<Card
			ref={cardRef}
			size='lg'
			mediaType='bleed'
			className={cardClass}
			style={{ width: '100%', height: '100%' }}
			media={
				<div className='relative w-full'>
					<CardMedia thumbnail={block.thumbnail} coverVideo={block.coverVideo} hovered={hovered} priority={priority} />
					{isNew && <Badge label='New' size='medium' className='absolute left-component-lg top-component-lg' />}
				</div>
			}
			title={title}
			description={block.description}
			actions={
				<ul className='m-0 flex list-none flex-wrap gap-[6px] p-0' aria-label='Tags'>
					{tags.map((tag) => (
						<li key={tag}>
							<Badge label={tag} appearance='tinted' />
						</li>
					))}
				</ul>
			}
		/>
	);

	if (!live) return <article className='h-full'>{card}</article>;

	return (
		<Link
			href={`/?block=${block.slug}`}
			scroll={false}
			data-block-card={block.slug}
			aria-label={`${title}. ${block.description} Open the live preview.`}
			className='group block h-full rounded-lg no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'
			onClick={onOpen}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
			onFocus={() => setHovered(true)}
			onBlur={() => setHovered(false)}>
			{card}
		</Link>
	);
}
