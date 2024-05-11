import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
	// SSGはこの設定で動く
	compiler: {
		styledComponents: true,
	},
	sassOptions: {
		includePaths: [path.join('./', 'styles')],
	},
};

export default nextConfig;
