import { useState } from 'react';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import type { IconName } from '@nokgridcore/ui/icon';
import { Progress } from '@nokgridcore/ui/progress';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import { IconTile } from '../../_shared/icon-tile';
import { issues, review, reviewSheet, type IssueGroup, type IssueKind } from '../data';
import type { Nav } from '../index';
import { fill, PageTitle, Panel, primaryText } from '../parts';
import { ResumeSheet } from '../resume-sheet';
import { text } from '../text';

// Issue tiles use the status token pairs from Figma (plate background/<kind>, icon icon/<kind>).
const issueIcon: Record<IssueKind, IconName> = {
	error: 'CircleX',
	warning: 'CircleAlert',
	info: 'Info',
	success: 'CircleCheck',
};

const groups: (IssueGroup | 'All')[] = ['All', 'Content', 'Format', 'ATS'];

export function Review({ nav }: { nav: Nav }) {
	const [group, setGroup] = useState(0);
	const active = groups[group];
	const visible = active === 'All' ? issues : issues.filter((issue) => issue.group === active);
	const count = (g: (typeof groups)[number]) => (g === 'All' ? issues.length : issues.filter((i) => i.group === g).length);

	return (
		<div className='flex flex-col gap-layout-lg'>
			<header className='flex items-center justify-between gap-layout-lg'>
				<PageTitle title='Review my resume' subtitle={review.document} />
				<div className='flex gap-component-sm'>
					<Button variant='secondary' size='sm' icon='ArrowUp'>
						Upload new version
					</Button>
					<Button variant='primary' size='sm' className={primaryText} onClick={nav.upgrade}>
						Fix with AI
					</Button>
				</div>
			</header>

			<div className='flex items-start gap-layout-lg'>
				<div className='w-[520px] shrink-0'>
					<ResumeSheet variant='page' {...reviewSheet} />
				</div>

				<div className='flex min-w-0 flex-1 flex-col gap-component-lg'>
					<Panel className='flex items-center gap-5 p-layout-lg' aria-label='Resume score'>
						{/* A score out of 100, not a percentage: Progress's own label is hidden and the number sits in the ring. */}
						<div className='relative flex shrink-0 items-center justify-center'>
							<Progress type='circular' size='md' value={review.score} color='success' aria-label={`Resume score ${review.score} out of 100`} />
							<span aria-hidden='true' className='absolute text-text-primary' style={text['label-md']}>
								{review.score}
							</span>
						</div>
						<div className='flex min-w-0 flex-1 flex-col gap-component-xs'>
							<p className='m-0 text-text-primary' style={text['heading-sm']}>
								{review.verdict}
							</p>
							<p className='m-0 text-text-secondary' style={text['body-md']}>
								{review.next}
							</p>
						</div>
						<dl className='m-0 flex gap-5'>
							{review.subScores.map((score) => (
								<div key={score.label} className='flex flex-col-reverse items-center gap-[2px]'>
									<dt className='text-text-secondary' style={text['body-sm']}>
										{score.label}
									</dt>
									<dd className='m-0 text-text-primary' style={text['heading-sm']}>
										{score.value}
									</dd>
								</div>
							))}
						</dl>
					</Panel>

					<Panel className='flex flex-col gap-component-lg p-layout-lg' aria-labelledby='fix-title'>
						<div className='flex items-center justify-between'>
							<h2 id='fix-title' className='m-0 text-text-primary' style={text['heading-sm']}>
								What to fix
							</h2>
							<TabGroup role='tablist' aria-label='Issue types' activeIndex={group} onActiveIndexChange={setGroup}>
								{groups.map((g, index) => (
									<Tab key={g} role='tab' aria-selected={group === index} label={`${g} (${count(g)})`} />
								))}
							</TabGroup>
						</div>
						<ul className='m-0 flex list-none flex-col gap-component-lg p-0'>
							{visible.map((issue) => (
								<li key={issue.title}>
									<Card
										orientation='horizontal'
										style={fill}
										media={<IconTile icon={issueIcon[issue.kind]} plate={`background-${issue.kind}`} iconColor={`icon-${issue.kind}`} />}
										title={issue.title}
										description={issue.detail}
										showActions={issue.fixable}
										actions={
											<Button variant='secondary' size='sm' aria-label={`Fix: ${issue.title}`} onClick={nav.upgrade}>
												Fix
											</Button>
										}
									/>
								</li>
							))}
						</ul>
					</Panel>
				</div>
			</div>
		</div>
	);
}
