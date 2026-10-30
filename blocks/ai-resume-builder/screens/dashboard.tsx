import { Badge } from '@nokgridcore/ui/badge';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Progress } from '@nokgridcore/ui/progress';
import { IconTile } from '../../_shared/icon-tile';
import { recentResumes, resumeProgress, stats, tools, user } from '../data';
import type { Nav } from '../index';
import { AccountActions, fill, PageTitle, Panel, primaryText } from '../parts';
import { text } from '../text';

export function Dashboard({ nav }: { nav: Nav }) {
	return (
		<div className='flex flex-col gap-7'>
			<header className='flex items-center justify-between gap-layout-lg'>
				<PageTitle title={`Good morning, ${user.firstName}`} subtitle='Pick up where you left off, or try something new.' />
				<AccountActions nav={nav} />
			</header>

			<ul className='m-0 grid list-none grid-cols-4 gap-layout-md p-0' aria-label='Your numbers'>
				{stats.map((stat) => (
					<li key={stat.title}>
						<Card
							orientation='horizontal'
							style={fill}
							media={<IconTile icon={stat.icon} size='large' />}
							title={stat.title}
							description={stat.detail}
						/>
					</li>
				))}
			</ul>

			<section aria-labelledby='tools-title' className='flex flex-col gap-7'>
				<div className='flex flex-col gap-[2px]'>
					<h2 id='tools-title' className='m-0 text-text-primary' style={text['heading-sm']}>
						Your tools
					</h2>
					<p className='m-0 text-text-secondary' style={text['body-sm']}>
						Everything in Draftwell, one click away
					</p>
				</div>
				<ul className='m-0 grid list-none grid-cols-4 gap-layout-md p-0'>
					{tools.map((tool) => (
						<li key={tool.title}>
							<Card
								style={fill}
								showMedia={false}
								leadingIcon
								icon={<IconTile icon={tool.icon} size='medium' />}
								title={tool.title}
								description={tool.description}
								actions={
									<div className='flex items-center gap-component-sm'>
										<Button
											variant='secondary'
											size='sm'
											icon='ChevronRight'
											iconPosition='right'
											aria-label={`${tool.action}: ${tool.title}`}
											onClick={() => (tool.screen ? nav.go(tool.screen) : nav.upgrade())}>
											{tool.action}
										</Button>
										{tool.pro && <Badge label='Pro' variant='info' appearance='tinted' />}
									</div>
								}
							/>
						</li>
					))}
				</ul>
			</section>

			<div className='flex items-start gap-layout-md'>
				<Panel className='flex min-w-0 flex-1 flex-col gap-component-md p-5' aria-labelledby='recent-title'>
					<h2 id='recent-title' className='m-0 text-text-primary' style={text['heading-sm']}>
						Recent resumes
					</h2>
					<ul className='m-0 flex list-none flex-col gap-component-md p-0'>
						{recentResumes.map((resume) => (
							<li key={resume.title}>
								<Card
									orientation='horizontal'
									style={fill}
									media={<IconTile icon='FileText' size='large' />}
									title={resume.title}
									description={resume.detail}
									actions={
										<Button
											variant='tertiary'
											size='sm'
											icon='Ellipsis'
											iconPosition='only'
											aria-label={`More actions for ${resume.title}`}
										/>
									}
								/>
							</li>
						))}
					</ul>
				</Panel>

				<Panel className='flex w-[420px] shrink-0 flex-col items-start gap-component-lg self-stretch p-5' aria-labelledby='finish-title'>
					<h2 id='finish-title' className='m-0 text-text-primary' style={text['heading-sm']}>
						Finish your resume
					</h2>
					{resumeProgress.map(({ section, value }) => (
						<div key={section} className='flex w-full flex-col gap-[6px]'>
							<div className='flex justify-between' style={text['body-sm']}>
								<span className='text-text-primary'>{section}</span>
								<span className='text-text-secondary'>{value}%</span>
							</div>
							<Progress value={value} fullWidth size='md' aria-label={`${section}: ${value}% complete`} />
						</div>
					))}
					<Button variant='primary' size='sm' className={primaryText} onClick={() => nav.go('project-editor')}>
						Continue editing
					</Button>
				</Panel>
			</div>
		</div>
	);
}
