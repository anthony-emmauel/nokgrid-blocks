import { Avatar } from '@nokgridcore/ui/avatar';
import type { LogoName, Person } from './data';

// Figma's "tertiary with fills cleared": NokGridCore has no ghost button.
export const plainButton = 'border-transparent bg-transparent';

const LOGO_ROOT = '/blocks/folio/logos';

// Width of each artwork in its square, from the Figma logo frames. The rest fill it.
const logoWidth: Partial<Record<LogoName, string>> = {
	jira: '96.7%',
	'google-sheets': '72.7%',
	// The Confluence export holds the mark and the wordmark; Figma crops to the mark.
	confluence: '800%',
};

/**
 * A third-party logo from Figma, in a square `size` box. GitHub's mark is black, so dark mode inverts
 * it, except on the banner's white plates (`onWhite`).
 */
export function Logo({ name, size, onWhite }: { name: LogoName; size: number; onWhite?: boolean }) {
	return (
		<span
			aria-hidden='true'
			className={`flex shrink-0 items-center overflow-hidden ${name === 'confluence' ? 'justify-start' : 'justify-center'}`}
			style={{ width: size, height: size }}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`${LOGO_ROOT}/${name}.svg`}
				alt=''
				className={`block h-auto max-w-none ${name === 'github' && !onWhite ? '[[data-theme=dark]_&]:invert' : ''}`}
				style={{ width: logoWidth[name] ?? '100%' }}
			/>
		</span>
	);
}

/** Folio's mark: four rounded squares in the status colours, from Figma's logo/Folio. */
export function FolioMark({ size = 16 }: { size?: number }) {
	const cell = (size * 9) / 20;
	const tiles = [
		{ color: 'icon-info', x: 0, y: 0, round: 3 },
		{ color: 'icon-success', x: 1, y: 0, round: 3 },
		{ color: 'icon-warning', x: 0, y: 1, round: 3 },
		{ color: 'icon-error', x: 1, y: 1, round: 4.5 },
	];
	return (
		<span aria-hidden='true' className='relative block shrink-0' style={{ width: size, height: size }}>
			{tiles.map((t) => (
				<span
					key={t.color}
					className='absolute'
					style={{
						width: cell,
						height: cell,
						left: t.x ? size - cell : 0,
						top: t.y ? size - cell : 0,
						borderRadius: (t.round * size) / 20,
						background: `var(--nok-color-${t.color})`,
					}}
				/>
			))}
		</span>
	);
}

/** A person's photo avatar, 24px. */
export function Face({ person, className }: { person: Person; className?: string }) {
	return <Avatar type='image' size='sm' src={person.photo} alt={person.name} className={className} />;
}

/** Overlapping avatars, as in Figma's collaborator stacks. */
export function Faces({ people, ring }: { people: Person[]; ring?: string }) {
	return (
		<span className='flex items-center'>
			{people.map((p, i) => (
				<Face key={p.initials} person={p} className={`${i ? '-ml-1.5' : ''} ${ring ?? ''}`} />
			))}
		</span>
	);
}
