import { Button } from '@nokgridcore/ui/button';
import { IconTile } from '../_shared/icon-tile';
import { docs, space, type Doc } from './data';
import { Face, Faces, Logo, plainButton } from './parts';
import { text } from './text';

/** The Northstar Overhaul space: a banner with the space's details, then its pages in a table. */
export function Space({ open }: { open: (doc: Doc) => void }) {
	return (
		<>
			<header className='relative flex h-[260px] shrink-0 flex-col justify-end gap-component-md overflow-hidden px-10 py-8'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={space.banner} alt='' className='pointer-events-none absolute inset-0 size-full object-cover' />
				{/* The banner text is white over the artwork in both modes. */}
				<h1 className='relative m-0 text-white' style={{ ...text['display-sm'], fontSize: 36, lineHeight: '44px' }}>
					{space.project}
				</h1>
				<div className='relative flex items-center gap-component-lg text-white' style={text['body-md']}>
					<span className='flex items-center gap-component-sm'>
						<Face person={space.createdBy} />
						Created by {space.createdBy.name} · {space.updated}
					</span>
					<span aria-hidden='true' className='h-4 w-px bg-white' />
					<span className='flex items-center gap-component-sm'>
						<Faces people={space.collaborators} />
						{space.collaborators.length} collaborators
					</span>
					<span aria-hidden='true' className='h-4 w-px bg-white' />
					<span className='flex items-center gap-[6px]'>
						{space.apps.map((logo) => (
							<span key={logo} className='rounded-md bg-white p-1'>
								<Logo name={logo} size={16} onWhite />
							</span>
						))}
						{space.appCount} connected apps
					</span>
				</div>
			</header>

			<div className='px-8 pb-8 pt-layout-lg'>
				{/* NokGridCore's TableCell takes text only; these cells hold logos, avatars and buttons (NOKGRID-GAPS.md). */}
				<table className='w-full border-separate border-spacing-0 overflow-hidden rounded-lg border border-solid border-border-default bg-background-surface'>
					<thead>
						<tr className='text-left text-text-primary' style={text['label-lg']}>
							{['Name', 'Collaborators', 'Last edited', 'Actions'].map((label, i) => (
								<th
									key={label}
									scope='col'
									className={`border-0 border-b border-solid border-border-default px-component-lg py-component-sm font-medium ${
										['', 'w-[220px]', 'w-[200px]', 'w-[96px] text-center'][i]
									}`}>
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{docs.map((doc, i) => {
							const last = i === docs.length - 1;
							const cell = `h-14 border-0 border-solid border-border-default ${last ? '' : 'border-b'}`;
							return (
								<tr
									key={doc.slug}
									onClick={doc.opens ? () => open(doc) : undefined}
									className={doc.opens ? 'cursor-pointer transition-colors hover:bg-background-overlay' : undefined}>
									<td className={`${cell} pl-component-md`}>
										<span className='flex items-center gap-component-xs'>
											{doc.source ?
												<span className='flex size-7 shrink-0 items-center justify-center rounded-md bg-background-canvas'>
													<Logo name={doc.source} size={16} />
												</span>
											:	<IconTile icon='FileText' size='medium' plate='background-canvas' />}
											<span className='px-component-lg text-text-primary' style={text['body-sm']}>
												{doc.opens ?
													<button
														type='button'
														onClick={(event) => {
															event.stopPropagation();
															open(doc);
														}}
														className='rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nok-color-border-focus)]'>
														{doc.title}
													</button>
												:	doc.title}
											</span>
										</span>
									</td>
									<td className={`${cell} pl-component-lg`}>
										<Faces people={doc.collaborators} />
									</td>
									<td className={`${cell} px-component-lg text-text-primary`} style={text['body-sm']}>
										{doc.edited}
									</td>
									<td className={`${cell} text-center`}>
										<Button
											variant='tertiary'
											size='xs'
											icon='Ellipsis'
											iconPosition='only'
											aria-label={`More actions for ${doc.title}`}
											className={plainButton}
											onClick={(event) => event.stopPropagation()}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
