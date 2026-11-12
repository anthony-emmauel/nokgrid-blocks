import { Icon } from '@nokgridcore/ui/icon';
import { page } from './data';
import { Face } from './parts';
import { text } from './text';

// Figma's document type: a 40/48 page title and 26/34 section headings, in the brand font.
const pageTitle = { ...text['display-sm'], fontSize: 40, lineHeight: '48px' };
const sectionHeading = { ...text['display-sm'], fontSize: 26, lineHeight: '34px' };

/** A document in the space: title, meta row and the page's sections. */
export function Page() {
	return (
		<article className='flex justify-center px-5 py-10 md:px-layout-lg md:py-16'>
			<div className='flex w-[760px] max-w-full flex-col gap-5 text-text-primary'>
				<h1 className='m-0 max-md:!text-[32px] max-md:!leading-10' style={pageTitle}>
					{page.title}
				</h1>
				<ul className='m-0 flex list-none flex-wrap items-center gap-5 p-0 text-text-secondary' style={text['body-sm']}>
					<li className='flex items-center gap-[6px]'>
						<Face person={page.author} />
						By {page.author.name}
					</li>
					{page.meta.map((item) => (
						<li key={item.label} className='flex items-center gap-[6px]'>
							<Icon name={item.icon} size='sm' color='secondary' />
							{item.label}
						</li>
					))}
				</ul>
				<span aria-hidden='true' className='h-4' />
				{page.sections.map((section) => (
					<section key={section.heading} className='flex flex-col gap-5'>
						<h2 className='m-0 max-md:!text-[22px] max-md:!leading-[30px]' style={sectionHeading}>
							{section.heading}
						</h2>
						{section.paragraphs.map((p) => (
							<p key={p} className='m-0' style={text['body-lg']}>
								{p}
							</p>
						))}
						{section.list && (
							<>
								<h3 className='m-0' style={text['heading-sm']}>
									{section.list.heading}
								</h3>
								<ul className='m-0 flex list-none flex-col gap-5 p-0' style={text['body-lg']}>
									{section.list.items.map((item) => (
										<li key={item} className='flex gap-component-sm'>
											<span aria-hidden='true'>•</span>
											{item}
										</li>
									))}
								</ul>
							</>
						)}
					</section>
				))}
			</div>
		</article>
	);
}
