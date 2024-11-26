import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md']
};

export default config;
