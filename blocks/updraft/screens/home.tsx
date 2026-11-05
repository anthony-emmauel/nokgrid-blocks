import { Badge } from '@nokgridcore/ui/badge';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Avatar } from '@nokgridcore/ui/avatar';
import { experts, nova, shortcuts, welcome, workspace, type Expert } from '../data';
import { CardMedia, Disc, fill, Logo, Panel, primaryText, ToolChip, type Nav } from '../parts';
import { text } from '../text';

export function Home({ nav }: { nav: Nav }) {
	return (
		<div className='flex flex-col items-center gap-8 pb-16 pt-layout-lg'>
			<nav aria-label='Shortcuts' className='flex items-start gap-component-lg'>
				{shortcuts.map((shortcut) => (
					<button
						key={shortcut.label}
						type='button'
						onClick={shortcut.screen ? () => nav.go(shortcut.screen!) : undefined}
						className='relative flex flex-col items-center gap-component-sm rounded-md text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'
						style={text['label-md']}>
						<Disc size={56} icon={shortcut.icon} initials={shortcut.initials} />
						{shortcut.badge && <Badge label={shortcut.badge} variant='info' appearance='tinted' className='absolute left-[calc(50%)] top-[-6px]' />}
						{shortcut.label}
					</button>
				))}
			</nav>

			<div className='flex w-[600px] max-w-full flex-col gap-5'>
				<header className='flex items-center justify-between'>
					<h1 className='m-0 text-text-primary' style={text['heading-md']}>
						Clear skies, {workspace}
					</h1>
					<div className='flex items-center gap-component-xs'>
						<Button variant='tertiary' size='sm' icon='Search' iconPosition='only' aria-label='Search agents' />
						<Button variant='tertiary' size='sm' icon='ChevronDown' iconPosition='right'>
							All agents
						</Button>
					</div>
				</header>

				<Panel className='flex flex-col gap-component-md p-component-lg' aria-label={`${nova.name} activity`}>
					<div className='flex items-center gap-[10px]'>
						<Avatar type='initials' size='sm' initials={nova.initials} />
						<div className='flex min-w-0 flex-1 flex-col'>
							<span className='text-text-primary' style={text['label-lg']}>
								{nova.name}
							</span>
							<span className='text-text-tertiary' style={text['body-sm']}>
								{nova.time}
							</span>
						</div>
						<Button variant='tertiary' size='sm' icon='Ellipsis' iconPosition='only' aria-label={`More actions for ${nova.name}`} />
					</div>
					<p className='m-0 text-text-primary' style={text['label-lg']}>
						{nova.prompt}
					</p>
					<ul className='m-0 flex list-none flex-col gap-component-sm p-0'>
						{nova.channels.map((channel) => (
							<li key={channel.name}>
								<Card
									orientation='horizontal'
									style={fill}
									media={
										<CardMedia>
											<Logo name={channel.logo} size={40} />
										</CardMedia>
									}
									title={channel.name}
									description={channel.detail}
									actions={
										<Button variant='primary' size='xs' className={primaryText} aria-label={`Connect ${channel.name}`}>
											Connect
										</Button>
									}
								/>
							</li>
						))}
					</ul>
				</Panel>

				<Card
					style={fill}
					showMedia={false}
					leadingIcon
					icon={<Avatar type='initials' size='lg' initials={nova.initials} />}
					title={nova.joined.title}
					description={nova.joined.detail}
					actions={
						<div className='flex gap-component-sm'>
							<Button variant='primary' size='sm' icon='MessageCircle' className={primaryText} onClick={() => nav.go('chat')}>
								Message
							</Button>
							<Button variant='secondary' size='sm' icon='Share2'>
								Share
							</Button>
						</div>
					}
				/>

				<div className='flex items-center justify-between pt-component-sm'>
					<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
						Add an expert to your team
					</h2>
					<Button variant='tertiary' size='sm' icon='ArrowRight' iconPosition='right'>
						See all
					</Button>
				</div>
				<ul className='m-0 grid list-none grid-cols-2 gap-component-md p-0'>
					{experts.map((expert) => (
						<li key={expert.initials} className='flex'>
							<ExpertCard expert={expert} nav={nav} />
						</li>
					))}
				</ul>

				<Card
					style={fill}
					mediaType='bleed'
					// Card's bleed media has a fixed height; Figma's crew band is 104px (NOKGRID-GAPS.md).
					className='overflow-hidden [&>div:first-child]:!h-[104px]'
					media={
						<div className='flex h-full w-full items-end justify-center gap-[10px] overflow-hidden bg-background-sunken' aria-hidden='true'>
							{welcome.crew.map((member) => (
								<Disc key={member.initials} size={member.size} initials={member.initials} />
							))}
						</div>
					}
					title={welcome.title}
					description={welcome.detail}
					actions={
						<Button variant='primary' size='sm' icon='Plus' className={primaryText}>
							New agent
						</Button>
					}
				/>
			</div>
		</div>
	);
}

function ExpertCard({ expert, nav }: { expert: Expert; nav: Nav }) {
	const card = (
		<Card
			style={fill}
			className='h-full'
			showMedia={false}
			leadingIcon
			icon={<Avatar type='initials' size='md' initials={expert.initials} />}
			title={expert.title}
			description={expert.pitch}
			actions={
				<div className='flex items-center gap-component-xs'>
					{expert.isNew && <Badge label='New' variant='info' appearance='tinted' />}
					{expert.tools.map((tool) => (
						<ToolChip key={tool.name} logo={tool.logo} label={tool.name} />
					))}
					{expert.moreTools && (
						<span className='text-text-tertiary' style={text['body-sm']}>
							+{expert.moreTools}
						</span>
					)}
				</div>
			}
		/>
	);

	if (!expert.screen) return card;
	return (
		<button
			type='button'
			onClick={() => nav.go(expert.screen!)}
			aria-label={`View ${expert.title}`}
			className='block w-full rounded-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)] [&>div]:transition-colors [&>div]:hover:!border-[var(--nok-color-border-strong)]'>
			{card}
		</button>
	);
}
