import { useState } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { Card } from '@nokgridcore/ui/card';
import { Divider } from '@nokgridcore/ui/divider';
import { TextArea } from '@nokgridcore/ui/textarea';
import { chat } from '../data';
import { fill, Logo } from '../parts';
import { text } from '../text';

export function Chat() {
	const [promoOpen, setPromoOpen] = useState(true);

	return (
		<>
			<header className='flex items-center gap-[10px] px-layout-lg py-[14px]'>
				<Avatar type='initials' size='md' initials={chat.initials} />
				<div className='flex min-w-0 flex-1 flex-col'>
					<h1 className='m-0 text-text-primary' style={text['label-lg']}>
						{chat.title}
					</h1>
					<span className='text-text-secondary' style={text['body-sm']}>
						{chat.agent}
					</span>
				</div>
				<div className='flex items-center gap-[6px]'>
					<span className='text-text-tertiary' style={text['body-sm']}>
						Talk to me on
					</span>
					{chat.channels.map((channel) => (
						<Logo key={channel} name={channel} size={16} />
					))}
				</div>
				<Divider orientation='vertical' className='!h-5' />
				<Button variant='tertiary' size='sm' icon='Edit3' iconPosition='only' aria-label='Rename chat' />
				<Button variant='tertiary' size='sm' icon='PanelRight' iconPosition='only' aria-label='Toggle details panel' />
				<Button variant='tertiary' size='sm' icon='Share2' iconPosition='only' aria-label='Share chat' />
			</header>

			<div className='flex min-h-0 flex-1 justify-center overflow-y-auto py-layout-lg'>
				<div className='flex w-[652px] max-w-full flex-col gap-[18px] text-text-primary' style={text['body-lg']}>
					{chat.messages.map((message) => (
						<p key={message} className='m-0'>
							{message}
						</p>
					))}
				</div>
			</div>

			<div className='flex justify-center py-5'>
				<div className='flex w-[652px] max-w-full flex-col gap-component-md'>
					{promoOpen && (
						<Card
							orientation='horizontal'
							style={fill}
							showMedia={false}
							showDescription={false}
							title={chat.promo.title}
							actions={
								<div className='flex items-center gap-[6px]'>
									{chat.promo.actions.map((action) => (
										<Button key={action.label} variant='secondary' size='sm'>
											<span className='flex items-center gap-component-xs'>
												<Logo name={action.logo} size={16} />
												{action.label}
											</span>
										</Button>
									))}
									<Button
										variant='tertiary'
										size='xs'
										icon='X'
										iconPosition='only'
										aria-label='Dismiss'
										onClick={() => setPromoOpen(false)}
									/>
								</div>
							}
						/>
					)}
					{/* Figma's textarea keeps its hidden label and helper slots, so the composer sits apart from the card and controls. */}
					<div className='flex flex-col gap-[29px] pt-[23px]'>
						<TextArea
							leadingLabel='Message'
							hideLabel
							hideHelperText
							showResize={false}
							placeholder='Message…'
							rows={3}
							className='!bg-transparent [&_textarea]:!px-component-sm [&_textarea]:!py-component-xs'
						/>
						<div className='flex items-center gap-component-sm'>
							<Button variant='tertiary' size='sm' icon='Plus' iconPosition='only' aria-label='Attach' />
							<span className='flex-1' />
							<Button variant='tertiary' size='sm' icon='ChevronDown' iconPosition='right'>
								{chat.model}
							</Button>
							<Button variant='primary' size='sm' icon='ArrowUp' iconPosition='only' aria-label='Send message' state='disabled' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
