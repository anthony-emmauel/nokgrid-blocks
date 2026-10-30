import type { ReactNode } from 'react';

// Runs before paint so nobody sees a flash of the wrong mode.
// Order: ?theme=light|dark, then the visitor's saved choice, then the system setting.
// Both shells share it, so the landing page and a block in its preview iframe
// always open in the same mode.
const themeScript = `try{var d=document.documentElement,q=new URLSearchParams(location.search).get('theme'),s=null;try{s=localStorage.getItem('theme')}catch(e){}var t=q==='dark'||q==='light'?q:s==='dark'||s==='light'?s:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){}`;

// Token font families are literal names, so load them under those names.
const TOKEN_FONTS = 'family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700';

/**
 * The <html> both page shells share. Each shell is its own root layout, so the
 * landing page (default orange tokens) and the blocks (black theme) never load
 * each other's theme CSS.
 */
export function RootHtml({ children, extraFonts = '' }: { children: ReactNode; extraFonts?: string }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
				<link
					rel='stylesheet'
					href={`https://fonts.googleapis.com/css2?${TOKEN_FONTS}${extraFonts}&display=swap`}
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
