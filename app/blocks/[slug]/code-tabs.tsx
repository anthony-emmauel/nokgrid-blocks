'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Button } from '@nokgridcore/ui/button';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import { text } from '@/app/_site/text';

export interface CodeFile {
	name: string;
	source: string;
	/** Pre-highlighted at build time by shiki. */
	html: string;
}

export function CodeTabs({ files }: { files: CodeFile[] }) {
	const [active, setActive] = useState(0);
	const [copied, setCopied] = useState(false);
	const tabsRef = useRef<HTMLDivElement>(null);
	const file = files[active];

	// TabGroup has no keyboard model of its own; add the standard tablist arrows.
	function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
		if (!step) return;
		event.preventDefault();
		const next = (active + step + files.length) % files.length;
		setActive(next);
		tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
	}

	async function copy() {
		await navigator.clipboard.writeText(file.source);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	// The code surface is dark in both token modes, so its controls use the dark mode too.
	return (
		<div
			data-theme='dark'
			className='overflow-hidden rounded-md border border-solid border-border-code bg-background-code'>
			<div className='flex items-center justify-between gap-component-md border-0 border-b border-solid border-border-code px-component-md py-component-sm'>
				<TabGroup
					ref={tabsRef}
					appearance='filled'
					role='tablist'
					aria-label='Files'
					activeIndex={active}
					onActiveIndexChange={setActive}
					onKeyDown={onKeyDown}>
					{files.map(({ name }, index) => (
						<Tab
							key={name}
							appearance='filled'
							label={name}
							role='tab'
							id={`code-tab-${index}`}
							aria-selected={index === active}
							aria-controls='code-panel'
							tabIndex={index === active ? 0 : -1}
						/>
					))}
				</TabGroup>
				<Button variant='tertiary' size='sm' icon={copied ? 'Check' : 'Copy'} onClick={copy}>
					{copied ? 'Copied' : `Copy ${file.name}`}
				</Button>
				<span className='sr-only' aria-live='polite'>
					{copied ? `${file.name} copied to clipboard` : ''}
				</span>
			</div>
			<div
				id='code-panel'
				role='tabpanel'
				aria-labelledby={`code-tab-${active}`}
				tabIndex={0}
				className='max-h-[640px] overflow-auto p-component-lg text-text-code focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'
				style={{ ...text['body-sm'], fontFamily: 'var(--nok-typography-font-family-mono), monospace' }}
				dangerouslySetInnerHTML={{ __html: file.html }}
			/>
		</div>
	);
}
