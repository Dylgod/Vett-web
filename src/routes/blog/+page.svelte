<script lang="ts">
	import { formatDate } from '$lib/utils';
	import Header from '$lib/components/sections/header.svelte';
	import LogoutHeader from '$lib/components/sections/logout_header.svelte';
	export let data;
	$: ({ session, supabase } = data);
</script>

{#if (session)}
<LogoutHeader />
{:else}
<Header />
{/if}

<div class="pb-24 pt-12 sm:pb-32 sm:pt-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h2>
			<p class="mt-2 text-lg leading-8 text-gray-600">
				Everything we know about landing your dream job
			</p>
			<div
				class="mt-10 space-y-16 border-t border-gray-600 pt-10 sm:mt-16 sm:pt-16 md:mt-8 md:pt-8"
			>
				{#each data.posts as post}
					<article class="flex max-w-xl flex-col items-start justify-between">
						<div class="flex items-center gap-x-4 text-xs">
							<time datetime={post.date} class="text-gray-600">{formatDate(post.date)}</time>
						</div>
						<div class="group relative">
							<h3
								class="mt-3 text-lg font-semibold leading-6 text-gray-800 group-hover:text-gray-500"
							>
								<a href={'/blog/' + post.slug}>
									<span class="absolute inset-0" />
									{post.title}
								</a>
							</h3>
							<p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-800">
								{post.longDescription}
							</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</div>
