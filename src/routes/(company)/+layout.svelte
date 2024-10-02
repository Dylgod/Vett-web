<script>
	import Header from '$lib/components/sections/header_dark.svelte';
	// import Header from '$lib/components/sections/header.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import LogoutHeaderDark from '$lib/components/sections/logout_header_dark.svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

{#if (session)}
<LogoutHeaderDark />
{:else}
<Header />
{/if}

<slot />

