'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { Badge } from '@nokgridcore/ui/badge';
import { DOCS_URL, REPO_URL, STORYBOOK_URL } from './links';
import { text } from './text';

const links = [
	{ label: 'Documentation', href: DOCS_URL },
	{ label: 'Components', href: STORYBOOK_URL },
	{ label: 'Blocks', href: '/', current: true },
	{ label: 'GitHub', href: REPO_URL },
];

const linkClass = (current?: boolean) =>
	[
		'rounded-sm no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]',
		current ? 'text-text-brand' : 'text-text-secondary hover:text-text-primary',
	].join(' ');

export function SiteNav() {
	const [open, setOpen] = useState(false);
	const menuId = useId();

	useEffect(() => {
		if (!open) return;
		const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [open]);

	const items = links.map(({ label, href, current }) => {
		const props = {
			className: linkClass(current),
			style: text['label-lg'],
			'aria-current': current ? ('page' as const) : undefined,
		};
		return (
			<li key={label}>
				{href.startsWith('/') ?
					<Link href={href} {...props}>
						{label}
					</Link>
				:	<a href={href} {...props}>
						{label}
					</a>
				}
			</li>
		);
	});

	return (
		<header className='relative border-0 border-b border-solid border-border-default bg-background-canvas'>
			<div className='flex items-center justify-between px-5 py-[22px] lg:px-[144px]'>
				<Link
					href='/'
					className='flex items-center gap-component-sm rounded-sm no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src='/brand/wordmark.svg'
						alt='NokGridCore'
						width={176}
						height={28}
						className='h-[22px] w-[140px] lg:h-[28px] lg:w-[176px]'
					/>
					<Badge label='BLOCKS' appearance='tinted' />
				</Link>

				<nav aria-label='Main' className='hidden lg:block'>
					<ul className='m-0 flex list-none items-center gap-[28px] p-0'>{items}</ul>
				</nav>

				<button
					type='button'
					className='rounded-sm text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)] lg:hidden'
					style={text['label-lg']}
					aria-expanded={open}
					aria-controls={menuId}
					onClick={() => setOpen((value) => !value)}>
					{open ? 'Close' : 'Menu'}
				</button>
			</div>

			{open && (
				<nav
					id={menuId}
					aria-label='Main'
					className='border-0 border-t border-solid border-border-default px-5 pb-layout-md pt-component-lg lg:hidden'>
					<ul className='m-0 flex list-none flex-col gap-component-lg p-0'>{items}</ul>
				</nav>
			)}
		</header>
	);
}
