<script>
	// import Header from '$lib/components/sections/header_dark.svelte';
	import Header from '$lib/components/sections/header.svelte';
	// import LogoutHeaderDark from '$lib/components/sections/logout_header_dark.svelte';
	import LogoutHeader from '$lib/components/sections/logout_header.svelte';

	export let data;
	$: ({ session, supabase } = data);
</script>

{#if (session)}
<LogoutHeader />
{:else}
<Header />
{/if}

<slot />

