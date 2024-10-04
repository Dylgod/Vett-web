<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import { PUBLIC_HOSTNAME } from '$env/static/public';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta
		name="description"
		content={data.description} />
	<!-- // TODO:  -->
	<!-- iscanonical from analytics goes here -->
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	<link
		rel="canonical"
		href={data.canonicalUrl ?? `${PUBLIC_HOSTNAME}${$page.url.pathname}`} />
</svelte:head>

<article>
	<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="prose prose-lg mx-auto lg:max-w-[40vw]">
			<!-- Title -->
			<hgroup>
				<h1>{data.title}</h1>
				<p>Published: {formatDate(data.date)}</p>
			</hgroup>

			<!-- Tags -->
			<!-- <div class="tags"> -->
			<!-- 	{#each data.categories as category} -->
			<!-- 		<span class="surface-4">&num;{category}</span> -->
			<!-- 	{/each} -->
			<!-- </div> -->

			<!-- Post -->
			<slot />
		</div>
	</div>
</article>
