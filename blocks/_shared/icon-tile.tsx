import { Icon, type IconName } from '@nokgridcore/ui/icon';

// TO UPSTREAM: icon.tile exists in the NokGridCore Figma library but not in
// @nokgridcore/ui yet. Built here to the Figma spec with the props the package
// would take; when it ships, swap this import for '@nokgridcore/ui/icon-tile'.
// See NOKGRID-GAPS.md.

export type IconTileSize = 'small' | 'medium' | 'large';

/** A semantic colour token name without the --nok-color- prefix, e.g. "background-brand-subtle". */
type ColorToken = string;

export interface IconTileProps {
	icon: IconName;
	/** Plate/icon pairs from Figma: small 20/14, medium 28/16, large 36/20. */
	size?: IconTileSize;
	/** Plate fill token. Figma default: background/brand-subtle. */
	plate?: ColorToken;
	/** Icon colour token. Figma default: icon/default. */
	iconColor?: ColorToken;
	className?: string;
}

const plateSize: Record<IconTileSize, string> = {
	small: 'size-icon-md', // 20px
	medium: 'size-[28px]', // no 28px size token in NokGridCore
	large: 'size-[36px]', // no 36px size token in NokGridCore
};

const plateRadius: Record<IconTileSize, string> = {
	small: 'rounded-sm',
	medium: 'rounded-md',
	large: 'rounded-lg',
};

// Icon has no 14px size (xs is 12, sm 16), so the small tile sizes its glyph directly.
const iconSize = { small: 'sm', medium: 'sm', large: 'md' } as const;
const iconOverride: Record<IconTileSize, string | undefined> = {
	small: '!size-[14px]',
	medium: undefined,
	large: undefined,
};

/** A container for a single icon, with plate and icon colours from any token. */
export function IconTile({
	icon,
	size = 'large',
	plate = 'background-brand-subtle',
	iconColor = 'icon-default',
	className,
}: IconTileProps) {
	return (
		<span
			aria-hidden='true'
			className={['inline-flex shrink-0 items-center justify-center', plateSize[size], plateRadius[size], className]
				.filter(Boolean)
				.join(' ')}
			style={{ background: `var(--nok-color-${plate})`, color: `var(--nok-color-${iconColor})` }}>
			<Icon name={icon} size={iconSize[size]} className={iconOverride[size]} />
		</span>
	);
}
