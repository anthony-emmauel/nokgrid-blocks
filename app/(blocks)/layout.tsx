import type { ReactNode } from 'react';
import '@nokgridcore/ui/styles.css';
import '../globals.css';
import '../../themes/black.css';
import { RootHtml } from '../_shell/root-html';
import { siteMetadata } from '../_shell/metadata';

export const metadata = siteMetadata;

/** Block pages: the black theme from the NokGridCore Black theme Figma file. */
export default function BlocksLayout({ children }: { children: ReactNode }) {
	return <RootHtml>{children}</RootHtml>;
}
