import { useState } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Badge } from '@nokgridcore/ui/badge';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Input } from '@nokgridcore/ui/input';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import { jobDetail, jobs, jobSearch, jobTabs } from '../data';
import type { Nav } from '../index';
import { AccountActions, fill, Panel, primaryText, selectedCard } from '../parts';
import { text } from '../text';

export function Jobs({ nav }: { nav: Nav }) {
	const [tab, setTab] = useState(0);
	const [selectedId, setSelectedId] = useState(jobs[0].id);

	const status = jobTabs[tab].status;
	const visible = status ? jobs.filter((job) => job.status.includes(status)) : jobs;
	const job = jobs.find((j) => j.id === selectedId) ?? jobs[0];
	const resultLabel = status ? `${jobTabs[tab].label} · ${visible.length} results` : `All jobs · ${jobSearch.total} results`;

	return (
		<div className='flex flex-col gap-layout-lg'>
			<header className='flex items-center justify-between'>
				<TabGroup role='tablist' aria-label='Jobs' activeIndex={tab} onActiveIndexChange={setTab}>
					{jobTabs.map((t, index) => (
						<Tab
							key={t.label}
							role='tab'
							aria-selected={tab === index}
							label={t.count === undefined ? t.label : `${t.label} (${t.count})`}
						/>
					))}
				</TabGroup>
				<AccountActions nav={nav} />
			</header>

			<Panel className='flex items-end gap-layout-md p-5' aria-label='Search jobs'>
				<div className='min-w-0 flex-1'>
					<Input size='lg' label='Job title' leadingIcon='Building2' defaultValue={jobSearch.title} />
				</div>
				<div className='min-w-0 flex-1'>
					<Input size='lg' label='Location' leadingIcon='MapPin' defaultValue={jobSearch.location} />
				</div>
				<Button variant='secondary' size='md' icon='SlidersHorizontal'>
					Filter
				</Button>
			</Panel>

			<Panel className='flex min-h-0 overflow-hidden' aria-label='Results'>
				<div className='flex w-[480px] shrink-0 flex-col border-0 border-r border-solid border-border-default'>
					<div className='flex items-center justify-between px-5 py-component-lg'>
						<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
							{resultLabel}
						</h2>
						<Button variant='secondary' size='sm' icon='ChevronDown' iconPosition='right'>
							Best match
						</Button>
					</div>
					<ul className='m-0 flex list-none flex-col gap-component-sm px-component-lg pb-component-lg' aria-label='Jobs'>
						{visible.map((j) => (
							<li key={j.id}>
								<button
									type='button'
									aria-pressed={j.id === job.id}
									aria-label={`${j.title}, ${j.company}, ${j.posted}`}
									onClick={() => setSelectedId(j.id)}
									className='block w-full rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)] [&>div]:transition-colors [&>div]:hover:!border-[var(--nok-color-border-strong)]'>
									<Card
										orientation='horizontal'
										style={fill}
										className={j.id === job.id ? selectedCard : undefined}
										media={<Avatar type='initials' shape='square' size='lg' initials={j.initials} />}
										title={j.title}
										description={`${j.company} · ${j.location}`}
										actions={
											<span className='text-text-tertiary' style={text['body-sm']}>
												{j.posted}
											</span>
										}
									/>
								</button>
							</li>
						))}
						{visible.length === 0 && (
							<li className='px-component-sm py-layout-md text-text-secondary' style={text['body-sm']}>
								No jobs here yet.
							</li>
						)}
					</ul>
				</div>

				<article className='flex min-w-0 flex-1 flex-col gap-5 p-7' aria-labelledby='job-title'>
					<div className='flex items-center justify-between gap-layout-md'>
						<div className='flex flex-col gap-[6px]'>
							<h2 id='job-title' className='m-0 text-text-primary' style={text['heading-md']}>
								{job.title}
							</h2>
							<p className='m-0 text-text-secondary' style={text['body-md']}>
								{job.company} · {job.location} · {job.type}
							</p>
						</div>
						<div className='flex gap-component-sm'>
							<Button variant='tertiary' size='sm' icon='Bookmark' iconPosition='only' aria-label='Save job' />
							<Button variant='tertiary' size='sm' icon='Ellipsis' iconPosition='only' aria-label='More actions' />
						</div>
					</div>
					<div className='flex items-center gap-component-md'>
						<Button variant='primary' size='md' className={primaryText}>
							Apply now
						</Button>
						<Button variant='secondary' size='md' icon='Zap' onClick={nav.upgrade}>
							Tailor my resume
						</Button>
						<Badge label={`${job.match}% match`} variant='success' appearance='tinted' size='medium' />
					</div>
					<JobSection title='About the role'>
						<p className='m-0 text-text-secondary' style={text['body-md']}>
							{job.company} {jobDetail.about}
						</p>
					</JobSection>
					<JobSection title='Responsibilities'>
						<BulletList items={jobDetail.responsibilities} />
					</JobSection>
					<JobSection title='Requirements'>
						<BulletList items={jobDetail.requirements} />
					</JobSection>
				</article>
			</Panel>
		</div>
	);
}

function JobSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className='flex flex-col gap-[10px]'>
			<h3 className='m-0 text-text-primary' style={text['heading-sm']}>
				{title}
			</h3>
			{children}
		</section>
	);
}

function BulletList({ items }: { items: string[] }) {
	return (
		<ul className='m-0 flex list-none flex-col gap-[10px] p-0 text-text-secondary' style={text['body-md']}>
			{items.map((item) => (
				<li key={item} className='flex gap-component-sm'>
					<span aria-hidden='true'>•</span>
					{item}
				</li>
			))}
		</ul>
	);
}
