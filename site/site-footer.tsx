import { text } from './text';

export function SiteFooter() {
	return (
		<footer
			className='flex flex-col justify-between px-5 pb-10 pt-8 text-text-tertiary lg:flex-row lg:gap-component-lg lg:px-[144px]'
			style={text['caption-md']}>
			<p className='m-0'>© 2026 NokGridCore · MIT licence</p>
			<p className='m-0'>Built with NokGridCore · by Emmanuel Anthony</p>
		</footer>
	);
}
