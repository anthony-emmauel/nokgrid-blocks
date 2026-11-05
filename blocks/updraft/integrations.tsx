import { useRef, useState } from 'react';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Chip } from '@nokgridcore/ui/chip';
import { Icon } from '@nokgridcore/ui/icon';
import { SearchInput } from '@nokgridcore/ui/search-input';
import { integrationFilters, integrations, integrationTotal, type Integration } from './data';
import { CardMedia, fill, Logo, plainButton, primaryText } from './parts';
import { text } from './text';

export function Integrations() {
	const [filter, setFilter] = useState<(typeof integrationFilters)[number]['label']>('All');
	const [searching, setSearching] = useState(false);
	const [query, setQuery] = useState('');
	const searchRef = useRef<HTMLInputElement>(null);

	const q = query.trim().toLowerCase();
	const visible = integrations.filter(
		(item) =>
			(filter === 'All' || item.categories.includes(filter)) &&
			(!q || item.name.toLowerCase().includes(q) || item.detail.toLowerCase().includes(q)),
	);
	const count = integrationFilters.find((f) => f.label === filter)?.count ?? integrationTotal;

	function openSearch() {
		setSearching(true);
		requestAnimationFrame(() => searchRef.current?.focus());
	}

	function closeSearch() {
		setQuery('');
		setSearching(false);
	}

	return (
		<div className='flex justify-center px-layout-lg py-layout-lg'>
			<div className='flex w-[720px] max-w-full flex-col gap-layout-lg'>
				<header className='flex flex-col gap-[6px]'>
					<h1 className='m-0 text-text-primary' style={text['heading-lg']}>
						Integrations
					</h1>
					<p className='m-0 text-text-secondary' style={text['body-md']}>
						Give your agents access to the tools your team already uses.
					</p>
				</header>

				<div className='flex items-center gap-component-sm'>
					<div role='group' aria-label='Categories' className='flex items-center gap-component-sm'>
						{integrationFilters.map(({ label, count: total }) => {
							const selected = filter === label;
							return (
								<Chip
									key={label}
									label={`${label} ${total}`}
									appearance={selected ? 'selected' : 'outline'}
									aria-pressed={selected}
									className={selected ? primaryText : undefined}
									onClick={() => setFilter(label)}
								/>
							);
						})}
					</div>
					<span className='min-w-0 flex-1' />
					{searching ?
						<div className='w-[160px] shrink-0'>
							<SearchInput
								ref={searchRef}
								size='sm'
								placeholder='Search'
								aria-label='Search integrations'
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								onKeyDown={(event) => event.key === 'Escape' && closeSearch()}
								onBlur={() => !query && setSearching(false)}
								showClear={query.length > 0}
								onClear={closeSearch}
							/>
						</div>
					:	<Button variant='tertiary' size='xs' icon='Search' iconPosition='only' aria-label='Search integrations' className={plainButton} onClick={openSearch} />}
					<Button variant='tertiary' size='sm' icon='ChevronDown' iconPosition='right' className={plainButton}>
						All methods
					</Button>
				</div>

				<div className='flex items-center justify-between'>
					<h2 className='m-0 flex gap-[6px]' style={text['label-lg']}>
						<span className='text-text-primary'>{filter}</span>
						<span className='text-text-tertiary' style={text['body-md']}>
							· {count}
						</span>
					</h2>
					<Button variant='tertiary' size='sm' icon='ChevronDown' iconPosition='right' className={plainButton}>
						Most popular
					</Button>
				</div>

				{visible.length ?
					<ul className='m-0 grid list-none grid-cols-2 gap-x-component-lg gap-y-component-md p-0'>
						{visible.map((item) => (
							<li key={item.name}>
								<IntegrationCard item={item} />
							</li>
						))}
					</ul>
				:	<p className='m-0 py-layout-lg text-center text-text-secondary' style={text['body-md']} role='status'>
						No integrations match your search.
					</p>
				}
			</div>
		</div>
	);
}

function IntegrationCard({ item }: { item: Integration }) {
	return (
		<Card
			orientation='horizontal'
			style={fill}
			media={
				<CardMedia>
					{item.logo ?
						<Logo name={item.logo} size={40} />
					:	<Icon name='Navigation2' color='default' className='!size-8' aria-hidden='true' />}
				</CardMedia>
			}
			title={item.name}
			description={item.detail}
			actions={<Button variant='tertiary' size='sm' icon='Plus' iconPosition='only' aria-label={`Add ${item.name}`} className={`${plainButton} !w-6 !p-0`} />}
		/>
	);
}
