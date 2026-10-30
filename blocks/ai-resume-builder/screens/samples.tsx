import { useState } from 'react';
import { Badge } from '@nokgridcore/ui/badge';
import { Card } from '@nokgridcore/ui/card';
import { Chip } from '@nokgridcore/ui/chip';
import { SearchInput } from '@nokgridcore/ui/search-input';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import { sampleCategories, samples } from '../data';
import type { Nav } from '../index';
import { AccountActions, fill, Panel, primaryText } from '../parts';
import { ResumeSheet } from '../resume-sheet';
import { text } from '../text';

const TABS = ['All samples', 'Saved'] as const;
const saved: string[] = []; // nothing saved yet in the placeholder data

export function Samples({ nav }: { nav: Nav }) {
	const [tab, setTab] = useState(0);
	const [category, setCategory] = useState<string | null>('Pro');
	const [query, setQuery] = useState('');

	const q = query.trim().toLowerCase();
	const visible = samples.filter(
		(sample) =>
			(tab === 0 || saved.includes(sample.title)) &&
			(!category || (category === 'Pro' ? sample.pro : sample.categories.includes(category))) &&
			(!q || sample.title.toLowerCase().includes(q)),
	);

	return (
		<div className='flex flex-col gap-layout-lg'>
			<header className='flex items-center justify-between'>
				<TabGroup role='tablist' aria-label='Samples' activeIndex={tab} onActiveIndexChange={setTab}>
					{TABS.map((label, index) => (
						<Tab
							key={label}
							role='tab'
							aria-selected={tab === index}
							label={label === 'Saved' ? `Saved (${saved.length})` : label}
						/>
					))}
				</TabGroup>
				<AccountActions nav={nav} bell={false} avatar={false} />
			</header>

			<Panel className='flex flex-col gap-component-lg p-layout-lg' aria-label='Search samples'>
				<SearchInput
					size='lg'
					placeholder='Search resume and cover letter samples by role or skill'
					aria-label='Search samples by role or skill'
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					showClear={query.length > 0}
					onClear={() => setQuery('')}
				/>
				<div role='group' aria-label='Categories' className='flex flex-wrap gap-component-sm'>
					{sampleCategories.map((label) => {
						const selected = category === label;
						return (
							<Chip
								key={label}
								label={label}
								appearance={selected ? 'selected' : 'outline'}
								aria-pressed={selected}
								className={selected ? primaryText : undefined}
								onClick={() => setCategory(selected ? null : label)}
							/>
						);
					})}
				</div>
			</Panel>

			{visible.length === 0 ?
				<p className='m-0 py-layout-lg text-center text-text-secondary' style={text['body-md']}>
					{tab === 1 ? 'You haven’t saved any samples yet.' : 'No samples match your search.'}
				</p>
			:	<ul className='m-0 grid list-none grid-cols-4 gap-layout-md p-0'>
					{visible.map((sample) => (
						<li key={sample.title}>
							{/* Every sample here is Pro, so opening one offers the upgrade. */}
							<button
								type='button'
								onClick={nav.upgrade}
								aria-label={`${sample.title}, ${sample.company}${sample.pro ? ' (Pro)' : ''}`}
								className='block w-full rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)] [&>div]:transition-colors [&>div]:hover:!border-[var(--nok-color-border-strong)]'>
								<Card
									style={fill}
									media={<ResumeSheet variant='thumbnail' name={sample.author} />}
									title={sample.title}
									description={sample.company}
									actions={sample.pro && <Badge label='Pro' variant='info' appearance='tinted' />}
								/>
							</button>
						</li>
					))}
				</ul>
			}
		</div>
	);
}
