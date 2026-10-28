import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Block sources are read from disk at build time for the code tabs.
	outputFileTracingIncludes: { '/blocks/[slug]': ['./blocks/**/*'] },
};

export default nextConfig;
