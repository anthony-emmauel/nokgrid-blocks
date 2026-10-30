import type { ReactNode } from 'react';
import { Avatar } from '@nokgridcore/ui/avatar';
import { Button } from '@nokgridcore/ui/button';
import { user } from './data';
import type { Nav } from './index';
import { text } from './text';

// Card has a fixed width per size; blocks stretch it to their grid column (NOKGRID-GAPS.md).
export const fill = { width: '100%' };
// Selected cards (current job, current project) use a text/primary border, as in Figma.
export const selectedCard = '!border-[var(--nok-color-text-primary)]';
// Primary buttons on the black theme take action/primary-text, not white (NOKGRID-GAPS.md).
export const primaryText = 'text-action-primary-text';

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
