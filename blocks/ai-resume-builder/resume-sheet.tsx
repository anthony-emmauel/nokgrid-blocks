import { text } from './text';

// The resume artwork from Figma (sample cards and the Review page), drawn from
// tokens so it follows light and dark: a sunken plate, a surface sheet, and
// placeholder lines in border/default (border/strong where a line is flagged).

// Line widths repeat this rhythm, taken from the Figma artwork (as % of the sheet).
const WIDTHS = [100, 92, 96, 60, 100, 85, 90, 45, 98, 93, 57, 86, 68, 80, 59, 41];
const widthAt = (i: number) => WIDTHS[i % WIDTHS.length];

export interface ResumeSection {
	title: string;
	lines: number;
	/** Zero-based lines drawn darker, e.g. the ones a review flags. */
	flagged?: number[];
}

type SheetProps =
	| { variant: 'thumbnail'; name: string; lines?: number }
	| { variant: 'page'; name: string; subtitle: string; sections: ResumeSection[] };

export function ResumeSheet(props: SheetProps) {
	if (props.variant === 'thumbnail') {
		const { name, lines = 7 } = props;
		return (
			<div aria-hidden='true' className='flex h-full w-full flex-col overflow-hidden rounded-lg bg-background-sunken px-5 pt-component-md'>
				<div className='flex flex-1 flex-col items-center gap-[6px] overflow-hidden bg-background-surface px-[14px] pt-component-md'>
					<span className='text-text-primary' style={text['label-sm']}>
						{name}
					</span>
					{Array.from({ length: lines }, (_, i) => (
						<span key={i} className='h-[3px] shrink-0 rounded-[2px] bg-border-default' style={{ width: `${widthAt(i)}%` }} />
					))}
				</div>
			</div>
		);
	}

	const { name, subtitle, sections } = props;
	let line = 0;
	return (
		<div className='h-full overflow-hidden rounded-xl bg-background-sunken p-7'>
			<div className='flex flex-col gap-[14px] bg-background-surface px-8 py-9'>
				<p className='m-0 text-text-primary' style={text['heading-md']}>
					{name}
				</p>
				<p className='m-0 text-text-secondary' style={text['body-sm']}>
					{subtitle}
				</p>
				{sections.map((section) => (
					<div key={section.title} className='flex flex-col gap-[6px]' aria-hidden='true'>
						<span className='uppercase text-text-primary' style={text['label-sm']}>
							{section.title}
						</span>
						<span className='h-px w-full bg-border-default' />
						{Array.from({ length: section.lines }, (_, i) => (
							<span
								key={i}
								className={`h-[6px] rounded-[2px] ${section.flagged?.includes(i) ? 'bg-border-strong' : 'bg-border-default'}`}
								style={{ width: `${widthAt(line++)}%` }}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
