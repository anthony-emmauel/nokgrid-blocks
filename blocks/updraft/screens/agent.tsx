import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Icon } from '@nokgridcore/ui/icon';
import { IconTile } from '../../_shared/icon-tile';
import { agent } from '../data';
import { CardMedia, Disc, fill, primaryText, ToolChip, type Nav } from '../parts';
import { text } from '../text';

export function Agent({ nav }: { nav: Nav }) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	useEffect(() => () => clearTimeout(timer.current), []);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(window.location.href);
		} catch {
			return; // Clipboard can be blocked, e.g. in a preview iframe.
		}
		setCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className='flex justify-center px-layout-lg pb-16 pt-layout-lg'>
			<div className='flex w-[1010px] max-w-full flex-col gap-8'>
				<div>
					<Button variant='tertiary' size='sm' icon='ArrowLeft' onClick={() => nav.go('home')}>
						Back
					</Button>
				</div>

				<header className='flex items-center gap-5'>
					<Disc size={64} initials={agent.initials} />
					<div className='flex min-w-0 flex-1 flex-col gap-[6px]'>
						<h1 className='m-0 text-text-primary' style={text['heading-lg']}>
							{agent.role}
						</h1>
						<p className='m-0 flex items-center gap-[6px] whitespace-pre text-text-secondary' style={text['body-md']}>
							<span className='text-text-primary' style={text['label-lg']}>
								{agent.name}
							</span>
							{`·  ${agent.by}  ·`}
							<Icon name='BadgeCheck' size='sm' color='default' />
							<span className='text-text-primary'>{agent.skills}</span>
							<span className='text-text-tertiary'>{agent.installs}</span>
						</p>
					</div>
					<div className='flex items-center gap-component-sm' aria-live='polite'>
						<Button variant='secondary' size='md' onClick={copyLink}>
							{copied ? 'Copied' : 'Copy link'}
						</Button>
						<Button variant='primary' size='md' className={primaryText}>
							Add to your team
						</Button>
					</div>
				</header>

				<section className='flex flex-col gap-component-md'>
					<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
						Meet {agent.name}
					</h2>
					<p className='m-0 text-text-secondary' style={text['body-lg']}>
						{agent.about}
					</p>
				</section>

				<div className='flex items-start gap-8'>
					<section className='flex min-w-0 flex-1 flex-col gap-[14px]'>
						<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
							Works with
						</h2>
						<div className='flex gap-component-sm'>
							{agent.tools.map((tool) => (
								<ToolChip key={tool.name} logo={tool.logo} label={tool.name} />
							))}
						</div>
					</section>
					<section className='flex min-w-0 flex-1 flex-col gap-[14px]'>
						<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
							Skills
						</h2>
						<div className='flex'>
							<ToolChip icon='Zap' label={agent.skill} />
						</div>
					</section>
				</div>

				<section className='flex flex-col gap-component-lg'>
					<h2 className='m-0 text-text-primary' style={text['heading-sm']}>
						What you get
					</h2>
					<ul className='m-0 flex w-[640px] max-w-full list-none flex-col gap-component-sm p-0'>
						{agent.benefits.map((benefit) => (
							<li key={benefit.title}>
								<Card
									orientation='horizontal'
									style={fill}
									showActions={false}
									media={
										<CardMedia>
											<IconTile icon='CircleCheck' />
										</CardMedia>
									}
									title={benefit.title}
									description={benefit.detail}
								/>
							</li>
						))}
					</ul>
				</section>

				<Card
					style={fill}
					showMedia={false}
					leadingIcon
					icon={<Avatar type='initials' size='lg' initials={agent.initials} />}
					title={agent.cta.title}
					description={agent.cta.detail}
					actions={
						<Button variant='primary' size='md' className={primaryText}>
							Add to your team
						</Button>
					}
				/>
			</div>
		</div>
	);
}
