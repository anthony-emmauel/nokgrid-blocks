import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@nokgridcore/ui/styles.css';
import './globals.css';
import '../themes/black.css';

export const metadata: Metadata = {
	title: { default: 'NokGridCore Blocks', template: '%s · NokGridCore Blocks' },
	description:
		'Ready-made dashboard blocks composed only from NokGridCore components and tokens, in light and dark.',
};

// Runs before paint so nobody sees a flash of the wrong mode.
// Order: ?theme=light|dark, then the visitor's saved choice, then the system setting.
const themeScript = `try{var d=document.documentElement,q=new URLSearchParams(location.search).get('theme'),s=null;try{s=localStorage.getItem('theme')}catch(e){}var t=q==='dark'||q==='light'?q:s==='dark'||s==='light'?s:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){}`;

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
