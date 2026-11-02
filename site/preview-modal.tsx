'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Modal } from '@nokgridcore/ui/modal';
import { ModalBody } from '@nokgridcore/ui/modal-body';
import { ModalFooter } from '@nokgridcore/ui/modal-footer';
import { ModalHeader } from '@nokgridcore/ui/modal-header';
import { blockTitle, type BlockEntry } from '@/blocks/registry';
import { LinkButton } from './link-button';
import { REPO_URL, SITE_URL } from './links';
import { LiveFrame } from './live-frame';

const MOBILE = '(max-width: 1023px)';

/**
 * The block preview: NokGridCore Modal (centred 1200px panel on desktop,
 * full screen on mobile) inside a native <dialog>. Modal has no dialog
 * behaviour of its own, so the <dialog> supplies it: role="dialog", focus kept
 * inside, Esc to close, and the page behind made inert. Focus goes back to the
 * block's card on close.
 */
export function PreviewModal({ block, onClose }: { block: BlockEntry; onClose: () => void }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const [mobile, setMobile] = useState(false);
	const title = blockTitle(block);
	const path = `/blocks/${block.slug}`;
	const liveUrl = `${SITE_URL}${path}`;
	// Button md has 16px labels; on phones the small size (14px, as in Figma) keeps all three on one row.
	const buttonSize = mobile ? 'sm' : 'md';

	useEffect(() => {
		const query = matchMedia(MOBILE);
		const update = () => setMobile(query.matches);
		update();
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (dialog && !dialog.open) dialog.showModal();
		// Start focus on the dialog itself, so the close button only shows its
		// focus ring once someone tabs to it.
		dialog?.focus();
		const { overflow } = document.body.style;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = overflow;
			document.querySelector<HTMLElement>(`[data-block-card="${block.slug}"]`)?.focus({ preventScroll: true });
		};
	}, [block.slug]);

	// Clicks on the dimmed page around the panel close it.
	function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
		if (!panelRef.current?.contains(event.target as Node)) onClose();
	}

	return (
		<dialog
			ref={dialogRef}
			aria-label={title}
			tabIndex={-1}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onClick={onDialogClick}
			className='m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 outline-none backdrop:bg-transparent'>
			<Modal
				ref={panelRef}
				position={mobile ? 'full-screen' : 'center'}
				// Modal's widths stop at 800px; the preview is 1200px, 40px from the top and bottom.
				style={mobile ? undefined : { width: 'min(1200px, calc(100vw - 48px))', height: 'calc(100dvh - 80px)' }}>
				<ModalHeader
					artworkType='standard'
					showArtwork={false}
					closeButtonPosition='inline'
					title={title}
					subtitle={mobile ? block.modalDescription.short : block.modalDescription.full}
					showSubtitle
					onClose={onClose}
					// ModalHeader pads 24px all round; Figma uses 16px with 4px below.
					className='[&>div]:!px-component-lg [&>div]:!pb-component-xs [&>div]:!pt-component-lg'
				/>
				<ModalBody className='flex min-h-0 flex-1 flex-col !px-component-lg !py-component-sm'>
					<LiveFrame
						src={path}
						displayUrl={mobile ? new URL(SITE_URL).host : `${new URL(SITE_URL).host}${path}`}
						poster={block.thumbnail}
						title={title}
						touch={mobile}
						onEscape={onClose}
					/>
				</ModalBody>
				<ModalFooter
					showTertiaryAction
					tertiaryAction={
						<LinkButton href={`${REPO_URL}/tree/main/blocks/${block.slug}`} variant='tertiary' size={buttonSize} className='whitespace-nowrap'>
							Code on GitHub
						</LinkButton>
					}
					// ModalFooter puts primary before secondary; Figma has "Figma design"
					// first, so both go in the primary slot in that order.
					primaryAction={
						<>
							<LinkButton href={block.figma} variant='tertiary' size={buttonSize} className='whitespace-nowrap'>
								Figma design
							</LinkButton>
							<LinkButton href={liveUrl} variant='primary' size={buttonSize} className='whitespace-nowrap'>
								{mobile ? 'Open live' : 'Open live block'}
							</LinkButton>
						</>
					}
				/>
			</Modal>
		</dialog>
	);
}
