import type { ReactNode } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { Progress } from '@nokgridcore/ui/progress';
import { user } from './data';
import type { Nav } from './index';
import { text } from './text';

// Card has a fixed width per size; blocks stretch it to their grid column (NOKGRID-GAPS.md).
export const fill = { width: '100%' };
// Selected cards (current job, current project) use a text/primary border, as in Figma.
export const selectedCard = '!border-[var(--nok-color-text-primary)]';
// Primary buttons on the black theme take action/primary-text, not white (NOKGRID-GAPS.md).
export const primaryText = 'text-action-primary-text';
// MenuItem always draws a filled, fully rounded badge and takes no appearance. Figma's "Pro" is the
// tinted info badge, so this repaints it with Badge's own tinted-info tokens (NOKGRID-GAPS.md).
export const tintedInfoBadge = [
	'[&>.rounded-full]:!rounded-sm',
	'[&>.rounded-full]:border [&>.rounded-full]:border-solid [&>.rounded-full]:!border-border-info',
	'[&>.rounded-full]:!bg-background-info [&>.rounded-full]:!text-text-info',
].join(' ');

// Progress draws only the arc (no track), with a 4/8px stroke and background/success-strong.
// Figma's score ring is a border/default track under a border/success arc, both 6.5px.
// The radius matches Progress's own: (diameter − its stroke) / 2 (NOKGRID-GAPS.md).
const RING = { sm: { diameter: 56, radius: 26 }, md: { diameter: 72, radius: 32 } } as const;
const RING_STROKE = 6.5;

/** A circular score: NokGridCore Progress on a grey track. `children` sits in the centre. */
export function ScoreRing({
	value,
	size,
	showPercentage = false,
	label,
	children,
}: {
	value: number;
	size: keyof typeof RING;
	showPercentage?: boolean;
	label: string;
	children?: ReactNode;
}) {
	const { diameter, radius } = RING[size];
	return (
		<div className='relative inline-flex shrink-0 items-center justify-center'>
			<svg aria-hidden='true' className='absolute inset-0 overflow-visible' width={diameter} height={diameter}>
				<circle
					cx={diameter / 2}
					cy={diameter / 2}
					r={radius}
					fill='none'
					stroke='var(--nok-color-border-default)'
					strokeWidth={RING_STROKE}
				/>
			</svg>
			<Progress
				type='circular'
				size={size}
				value={value}
				color='success'
				showPercentage={showPercentage}
				aria-label={label}
				className='[&_circle]:![stroke:var(--nok-color-border-success)] [&_circle]:[stroke-width:6.5px] [&_svg]:overflow-visible'
			/>
			{children && (
				<span aria-hidden='true' className='absolute text-text-primary' style={text['label-md']}>
					{children}
				</span>
			)}
		</div>
	);
}

/** The surface panels the screens are built from: surface fill, default border, xl radius. */
export function Panel({ children, className = '', as: Tag = 'section', ...props }: {
	children: ReactNode;
	className?: string;
	as?: 'section' | 'div';
	'aria-label'?: string;
	'aria-labelledby'?: string;
}) {
	return (
		<Tag className={`rounded-xl border border-solid border-border-default bg-background-surface ${className}`} {...props}>
			{children}
		</Tag>
	);
}

/** Page title and subtitle (heading/lg + body/md). */
export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<div className='flex flex-col gap-component-xs'>
			<h1 className='m-0 text-text-primary' style={text['heading-lg']}>
				{title}
			</h1>
			<p className='m-0 text-text-secondary' style={text['body-md']}>
				{subtitle}
			</p>
		</div>
	);
}

/** Upgrade, notifications and the account avatar, top right of most screens. */
export function AccountActions({ nav, bell = true, avatar = true }: { nav: Nav; bell?: boolean; avatar?: boolean }) {
	return (
		<div className='flex shrink-0 items-center gap-component-md'>
			<Button variant='primary' size='sm' icon='ArrowUp' className={primaryText} onClick={nav.upgrade}>
				Upgrade
			</Button>
			{bell && <Button variant='tertiary' size='sm' icon='Bell' iconPosition='only' aria-label='Notifications' />}
			{avatar && (
				<button
					type='button'
					aria-label='Account settings'
					onClick={() => nav.go('settings')}
					className='rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'>
					<Avatar type='initials' size='md' initials={user.initials} />
				</button>
			)}
		</div>
	);
}
