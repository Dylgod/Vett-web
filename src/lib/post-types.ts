export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	longDescription: string;
	date: string;
	categories: Categories[];
	published: boolean;
	canonicalUrl: string;
}