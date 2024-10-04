import { json } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$lib/utils';

export async function GET () {
	const posts = await fetchMarkdownPosts();
	return json(posts);
}