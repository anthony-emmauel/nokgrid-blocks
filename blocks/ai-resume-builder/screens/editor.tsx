import { useState } from 'react';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Divider } from '@nokgridcore/ui/divider';
import type { IconName } from '@nokgridcore/ui/icon';
import { Input } from '@nokgridcore/ui/input';
import { MenuItem } from '@nokgridcore/ui/menu-item';
import { Progress } from '@nokgridcore/ui/progress';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import { TextArea } from '@nokgridcore/ui/textarea';
import { Toggle } from '@nokgridcore/ui/toggle';
import { IconTile } from '../../_shared/icon-tile';
import {
	bulletLimit,
	editorDocument,
	editorScore,
	editorSections,
	projectChecks,
	projects,
	videoGuide,
	type CheckState,
} from '../data';
import type { Nav } from '../index';
import { fill, Panel, primaryText, selectedCard } from '../parts';
import { text } from '../text';

const checkIcon: Record<CheckState, IconName> = {
	failed: 'CircleX',
	locked: 'Lock',
	warning: 'CircleAlert',
	passed: 'CircleCheck',
};

export function Editor({ nav }: { nav: Nav }) {
	const [section, setSection] = useState(editorSections.indexOf('Project'));
	const [projectId, setProjectId] = useState(projects[0].id);
	const [sortByDate, setSortByDate] = useState(true);
	const project = projects.find((p) => p.id === projectId) ?? projects[0];
	const [bullets, setBullets] = useState(project.bullets);

	const selectProject = (id: string) => {
		setProjectId(id);
		setBullets(projects.find((p) => p.id === id)?.bullets ?? '');
	};

	return (
		<div className='flex flex-col gap-layout-lg'>
			<nav aria-label='Resume sections' className='flex flex-col items-start gap-component-md'>
				<Button variant='secondary' size='sm' icon='ChevronDown' iconPosition='right' aria-label={`Resume: ${editorDocument}`}>
					{editorDocument}
				</Button>
				<TabGroup role='tablist' aria-label='Sections' activeIndex={section} onActiveIndexChange={setSection}>
					{editorSections.map((label, index) => (
						<Tab key={label} role='tab' aria-selected={section === index} label={label} />
					))}
				</TabGroup>
			</nav>

			<div className='flex items-start gap-layout-lg'>
				<div className='flex w-[340px] shrink-0 flex-col gap-component-lg'>
					<Card
						style={fill}
						media={
							<div className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background-sunken'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={videoGuide.image} alt='' className='absolute inset-0 h-full w-full object-cover' />
								<IconTile icon='Play' size='large' iconColor='icon-brand' className='relative' />
							</div>
						}
						title={videoGuide.title}
						description={videoGuide.detail}
					/>

					<Panel className='flex flex-col' aria-label='Score and projects'>
						<div className='flex items-center gap-component-lg p-5'>
							<Progress type='circular' size='sm' value={editorScore.value} showPercentage aria-label={`${editorScore.label}: ${editorScore.value}%`} />
							<div className='flex flex-col gap-[2px]'>
								<span className='text-text-primary' style={text['body-md']}>
									{editorScore.label}
								</span>
								<span className='text-text-secondary' style={text['body-sm']}>
									{editorScore.verdict}
								</span>
							</div>
						</div>
						<Divider style={fill} />
						<div className='flex items-center justify-between px-5 py-component-lg'>
							<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
								Projects
							</h2>
							<Button variant='secondary' size='xs' icon='Plus' iconPosition='only' aria-label='Add project' />
						</div>
						<div className='flex flex-col gap-component-sm px-component-lg pb-component-lg'>
							{projects.map((p) => (
								<div key={p.id} className='flex flex-col gap-component-sm'>
									{/* Clicking the card selects it; the card's own button does the same for keyboard users. */}
									<div onClick={() => selectProject(p.id)} className='cursor-pointer'>
										<Card
											orientation='horizontal'
											showMedia={false}
											style={fill}
											className={p.id === projectId ? selectedCard : undefined}
											title={p.title}
											description='Details'
											actions={
												<Button
													variant='tertiary'
													size='sm'
													icon='Ellipsis'
													iconPosition='only'
													aria-label={`Edit ${p.title}`}
													aria-pressed={p.id === projectId}
													onClick={(event) => {
														event.stopPropagation();
														selectProject(p.id);
													}}
												/>
											}
										/>
									</div>
									{p.id === projectId && (
										<ul className='m-0 flex list-none flex-col p-0' aria-label='Checks for this project'>
											{projectChecks.map((check) => (
												<li key={check.label}>
													<MenuItem
														role={check.state === 'locked' ? 'button' : undefined}
														aria-label={check.state === 'locked' ? `${check.label} (Pro)` : undefined}
														style={fill}
														showLeadingIcon
														icon={checkIcon[check.state]}
														showLabel
														label={check.label}
														showBadge={check.state === 'locked'}
														badgeVariant='info'
														badgeLabel='Pro'
														tabIndex={check.state === 'locked' ? 0 : -1}
														onClick={check.state === 'locked' ? nav.upgrade : undefined}
														onKeyDown={(event) => {
															if ((event.key !== 'Enter' && event.key !== ' ') || check.state !== 'locked') return;
															event.preventDefault();
															nav.upgrade();
														}}
													/>
												</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
						<Divider style={fill} />
						<div className='px-5 py-5'>
							{/* Toggle's className lands on its track, so the full-width row is built here with its own label.
							    Its thumb is a raw bg-white, invisible on the black theme's white track: repaint it from the token. */}
							<label
								htmlFor='sort-by-date'
								className='flex cursor-pointer items-center justify-between text-text-primary [&_[role=switch]+span]:!bg-[var(--nok-color-action-primary-text)]'
								style={text['body-md']}>
								Sort by date
								<Toggle
									id='sort-by-date'
									size='md'
									label='Sort by date'
									hideLabel
									state={sortByDate ? 'on' : 'off'}
									onChange={() => setSortByDate((value) => !value)}
								/>
							</label>
						</div>
					</Panel>
				</div>

				<Panel className='flex min-w-0 flex-1 flex-col gap-7 p-7' aria-labelledby='project-title'>
					<h1 id='project-title' className='m-0 text-text-primary' style={text['heading-md']}>
						{project.title}
					</h1>
					<Input key={`title-${project.id}`} size='lg' label='Project title' required defaultValue={project.title} />
					<Input key={`org-${project.id}`} size='lg' label='Organization' placeholder='e.g. Riverside Food Bank' defaultValue={project.organization} />
					<div className='flex gap-component-lg'>
						<div className='min-w-0 flex-1'>
								<Input key={`start-${project.id}`} size='lg' label='Start date' placeholder='Aug 2026' defaultValue={project.start} />
							</div>
						<div className='min-w-0 flex-1'>
								<Input key={`end-${project.id}`} size='lg' label='End date' placeholder='Dec 2026' defaultValue={project.end} />
							</div>
						<div className='min-w-0 flex-1'>
								<Input key={`url-${project.id}`} size='lg' label='Project URL' placeholder='https://' defaultValue={project.url} />
							</div>
					</div>
					<TextArea
						leadingLabel='What did you do?'
						trailingLabel={`${bullets.length}/${bulletLimit}`}
						helperText='Aim for a mix of descriptive and number-led bullet points.'
						maxLength={bulletLimit}
						value={bullets}
						onChange={(event) => setBullets(event.target.value)}
						rows={3}
					/>
					<div className='flex justify-end gap-component-md'>
						<Button variant='secondary' size='md' icon='Zap' onClick={nav.upgrade}>
							Suggest bullet
						</Button>
						<Button variant='primary' size='md' className={primaryText}>
							Save to project list
						</Button>
					</div>
				</Panel>
			</div>
		</div>
	);
}
