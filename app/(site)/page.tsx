import { Suspense } from 'react';
import { BlockLibrary } from '@/site/block-library';
import { FollowBand } from '@/site/follow-band';
import { Hero } from '@/site/hero';
import { SiteFooter } from '@/site/site-footer';
import { SiteNav } from '@/site/site-nav';

/** The blocks landing page: hero, filterable block cards with a live preview, follow band. */
export default function LandingPage() {
	return (
		<>
			<SiteNav />
			<main>
				<Hero />
				{/* Reads ?block=<slug> to open the preview; the page itself stays static. */}
				<Suspense>
					<BlockLibrary />
				</Suspense>
			</main>
			<FollowBand />
			<SiteFooter />
		</>
	);
}
