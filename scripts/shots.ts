// Light and dark screenshots of a block at each of its Figma widths.
//   npm run shots -- <slug> [base-url]
// base-url defaults to the local dev server; pass a deploy preview URL to shoot that.
// Writes shots/<slug>-<width>-<theme>.png (git-ignored).
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const [slug, base = 'http://localhost:3000'] = process.argv.slice(2);
if (!slug) {
	console.error('Usage: npm run shots -- <slug> [base-url]');
	process.exit(1);
}

const widths = (process.env.WIDTHS ?? '390,1440,1920').split(',').map(Number);
const height = Number(process.env.HEIGHT ?? 1000);

await mkdir('shots', { recursive: true });
const browser = await chromium.launch();
for (const width of widths) {
	for (const theme of ['light', 'dark']) {
		const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
		await page.goto(`${base}/preview/${slug}?theme=${theme}`, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		const file = `shots/${slug}-${width}-${theme}.png`;
		await page.screenshot({ path: file, fullPage: true });
		console.log(file);
		await page.close();
	}
}
await browser.close();
