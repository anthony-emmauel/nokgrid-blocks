import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@nokgridcore/ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
	title: { default: 'NokGridCore Blocks', template: '%s · NokGridCore Blocks' },
	description:
		'Ready-made dashboard blocks composed only from NokGridCore components and tokens, in light and dark.',
};

// Runs before paint so nobody sees a flash of the wrong mode.
// Site pages follow the system theme. Block previews start in the mode from
// ?theme= (light by default), so direct links and screenshots are predictable.
const themeScript = `try{var d=document.documentElement,p=location.pathname.indexOf('/preview/')===0,q=new URLSearchParams(location.search).get('theme');d.dataset.theme=(p?q==='dark':matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
				{/* Token font families are literal names, so load them under those names. */}
				{/* eslint-disable-next-line @next/next/no-page-custom-font */}
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap'
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
