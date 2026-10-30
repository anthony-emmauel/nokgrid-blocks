'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { Chip } from '@nokgridcore/ui/chip';
import { getBlock, liveBlocks, newestLiveSlug, sortedBlocks } from '@/blocks/registry';
import { BlockCard } from './block-card';
import { PreviewModal } from './preview-modal';
import { text } from './text';

const ALL = 'All';

// Selected chip: background/inverse with a background/canvas label, not the
// orange "selected" appearance. Workaround: colour/text/inverse currently
// aliases colour/background/inverse, so the matching text token would be
// invisible on it. Listed in NOKGRID-GAPS.md.
const selectedChip =
	'!border-transparent !bg-background-inverse !text-background-canvas hover:!bg-background-inverse';

/** Filter chips, the block grid and the preview modal (opened by ?block=<slug>). */
export function BlockLibrary() {
	const params = useSearchParams();
	const [filter, setFilter] = useState(ALL);
	const blocks = useMemo(() => sortedBlocks(), []);
	const newest = newestLiveSlug();
	// True when a card opened the modal (a history entry was pushed), so closing
	// goes Back; a shared /?block= link closes to / instead.
	const openedFromCard = useRef(false);

	// Counts are released blocks only; a chip with none is hidden.
	const chips = useMemo(() => {
		const counts = new Map<string, number>();
		for (const block of liveBlocks)
			for (const category of block.categories) counts.set(category, (counts.get(category) ?? 0) + 1);
		return [
			{ label: ALL, count: liveBlocks.length },
			...[...counts].map(([label, count]) => ({ label, count })),
		].filter((chip) => chip.count > 0);
	}, []);

	const visible = filter === ALL ? blocks : blocks.filter((block) => block.categories.includes(filter));

	const open = getBlock(params.get('block') ?? '');
	const openBlock = open?.status === 'live' ? open : undefined;

	return (
		<section aria-label='Blocks' className='flex flex-col gap-layout-lg px-5 pb-14 lg:px-[144px] lg:pb-24'>
			<div className='flex items-center justify-between gap-component-lg'>
				<div role='group' aria-label='Filter blocks' className='flex flex-wrap gap-component-sm'>
					{chips.map((chip) => {
						const selected = filter === chip.label;
						return (
							<Chip
								key={chip.label}
								size='medium'
								label={`${chip.label} · ${chip.count}`}
								aria-pressed={selected}
								className={selected ? selectedChip : undefined}
								onClick={() => setFilter(chip.label)}
							/>
						);
					})}
				</div>
				<p className='m-0 hidden text-text-tertiary lg:block' style={text['caption-md']}>
					Newest first
				</p>
			</div>

			<ul className='m-0 grid list-none grid-cols-1 gap-layout-lg p-0 md:grid-cols-2'>
				{visible.map((block, index) => (
					<li key={block.slug}>
						<BlockCard
							block={block}
							isNew={block.slug === newest}
							priority={index < 2}
							onOpen={() => (openedFromCard.current = true)}
						/>
					</li>
				))}
			</ul>

			{openBlock && (
				<PreviewModal
					key={openBlock.slug}
					block={openBlock}
					onClose={() => {
						// Next keeps useSearchParams in sync with the native history API.
						if (openedFromCard.current) window.history.back();
						else window.history.replaceState(null, '', '/');
						openedFromCard.current = false;
					}}
				/>
			)}
		</section>
	);
}
