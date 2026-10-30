'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Badge } from '@nokgridcore/ui/badge';
import { Button } from '@nokgridcore/ui/button';
import { Modal } from '@nokgridcore/ui/modal';
import { ModalBody } from '@nokgridcore/ui/modal-body';
import { ModalFooter } from '@nokgridcore/ui/modal-footer';
import { ModalHeader } from '@nokgridcore/ui/modal-header';
import { Option } from '@nokgridcore/ui/option';
import { Radio } from '@nokgridcore/ui/radio';
import { Select } from '@nokgridcore/ui/select';
import { IconTile } from '../_shared/icon-tile';
import { currencies, upgrade } from './data';
import { primaryText } from './parts';
import { text } from './text';

// The hexagon artwork from Figma: rounded plates rotated -30°, in two offset rows.
// Drawn with tokens (surface plates, border/strong outline) so it follows light and dark.
// ModalHeader has no artwork slot (NOKGRID-GAPS.md), so this lies over its 160px hero.
const PLATE = { width: 220, height: 120, radius: 16, stroke: 10 };
const plateCentres = [-120, 30, 180, 330, 480, 630, 780].flatMap((x, i) => [
	{ x: x + 125, y: (i % 2 ? -20 : -60) + 107 },
	{ x: x + 125, y: (i % 2 ? 110 : 150) + 107 },
]);

function HeroPattern() {
	return (
		<svg
			aria-hidden='true'
			className='pointer-events-none absolute inset-x-0 top-0 z-[1] h-[160px] w-full'
			viewBox='0 0 640 160'
			preserveAspectRatio='xMidYMid slice'>
			<rect width='640' height='160' fill='var(--nok-color-background-sunken)' />
			{plateCentres.map(({ x, y }, i) => (
				<rect
					key={i}
					x={x - PLATE.width / 2 + PLATE.stroke / 2}
					y={y - PLATE.height / 2 + PLATE.stroke / 2}
					width={PLATE.width - PLATE.stroke}
					height={PLATE.height - PLATE.stroke}
					rx={PLATE.radius - PLATE.stroke / 2}
					transform={`rotate(-30 ${x} ${y})`}
					fill='var(--nok-color-background-surface)'
					stroke='var(--nok-color-border-strong)'
					strokeWidth={PLATE.stroke}
				/>
			))}
		</svg>
	);
}

/**
 * Upgrade to Pro: NokGridCore Modal (center, medium) inside a native <dialog>,
 * which supplies Esc, focus kept inside, the inert page and focus return.
 */
export function UpgradeModal({ onClose }: { onClose: () => void }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const [plan, setPlan] = useState(upgrade.plans[0].id);

	useEffect(() => {
		const dialog = dialogRef.current;
		const opener = document.activeElement as HTMLElement | null;
		if (dialog && !dialog.open) dialog.showModal();
		return () => opener?.focus({ preventScroll: true });
	}, []);

	function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
		if (!panelRef.current?.contains(event.target as Node)) onClose();
	}

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby='upgrade-title'
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onClick={onDialogClick}
			className='m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent'>
			<Modal ref={panelRef} position='center' size='medium' className='relative'>
				<HeroPattern />
				<ModalHeader
					artworkType='hero'
					titleStyle='promotional'
					closeButtonPosition='overlay'
					title={upgrade.title}
					subtitle={upgrade.subtitle}
					showSubtitle
					onClose={onClose}
					// Keep the close button above the pattern; tighten the title row to Figma's 16/16/4.
					className='[&_button]:z-10 [&>div:last-child]:!px-component-lg [&>div:last-child]:!pb-component-xs [&>div:last-child]:!pt-component-lg'
				/>
				<span id='upgrade-title' className='sr-only'>
					{upgrade.title}
				</span>
				<ModalBody className='!px-component-lg !py-component-sm'>
					<div className='flex flex-col gap-component-lg'>
						<ul className='m-0 flex list-none flex-col gap-component-sm p-0'>
							{upgrade.features.map((feature) => (
								<li key={feature} className='flex items-center gap-component-sm text-text-primary' style={text['body-md']}>
									<IconTile icon='Check' size='small' iconColor='icon-brand' />
									{feature}
								</li>
							))}
						</ul>

						<fieldset className='m-0 flex flex-col gap-component-lg border-0 p-0'>
							<div className='flex items-center justify-between'>
								<legend className='float-left p-0 text-text-primary' style={text['heading-sm']}>
									Choose a plan
								</legend>
								<div className='w-[120px] shrink-0'>
									<Select size='sm' label='Currency' showLabel={false} defaultSelectedIndex={0}>
										{currencies.map((currency) => (
											<Option key={currency} label={currency} />
										))}
									</Select>
								</div>
							</div>
							<div className='flex flex-col gap-component-sm'>
								{upgrade.plans.map((option) => {
									const selected = plan === option.id;
									return (
										<label
											key={option.id}
											className={`flex cursor-pointer items-center gap-[10px] rounded-[10px] border-solid px-component-lg py-[14px] ${
												selected ?
													'border-2 border-text-primary bg-background-canvas'
												:	'border border-border-default bg-background-surface hover:border-border-strong'
											}`}>
											<Radio
												name='plan'
												size='md'
												label={option.label}
												checked={selected}
												onChange={() => setPlan(option.id)}
											/>
											{option.badge && <Badge label={option.badge} variant='info' appearance='tinted' />}
											<span className='ml-auto text-text-primary' style={text['label-lg']}>
												{option.price}
											</span>
										</label>
									);
								})}
							</div>
						</fieldset>

						<p className='m-0 flex justify-center gap-component-xs' style={text['body-sm']}>
							<span className='text-text-secondary'>{upgrade.teams.prompt}</span>
							<a href='#teams' className='text-text-link underline-offset-2 hover:underline' onClick={(event) => event.preventDefault()}>
								{upgrade.teams.link}
							</a>
						</p>
					</div>
				</ModalBody>
				<ModalFooter
					layout='full-width-single-button'
					primaryAction={
						<Button variant='primary' size='md' className={primaryText} onClick={onClose}>
							Continue
						</Button>
					}
				/>
			</Modal>
		</dialog>
	);
}
