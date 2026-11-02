import { BlockPage, blockStaticParams } from '../../block-page';

// Same as /blocks/<slug>, kept for screenshots (`npm run shots`) and old links.
export const dynamicParams = false;
export const generateStaticParams = blockStaticParams;
export const metadata = { robots: { index: false } };
export default BlockPage;
