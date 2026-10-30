import type { ReactNode } from 'react';
import '@nokgridcore/ui/styles.css';
import '../globals.css';
import '../../site/site.css';
import { RootHtml } from '../_shell/root-html';
import { siteMetadata } from '../_shell/metadata';

export const metadata = siteMetadata;

/** The landing page: NokGridCore's default (orange) tokens, no theme override. */
export default function SiteLayout({ children }: { children: ReactNode }) {
	return <RootHtml extraFonts='&family=Courier+Prime'>{children}</RootHtml>;
}
