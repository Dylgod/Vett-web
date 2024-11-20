<script>
	import Header from '$lib/components/sections/header_dark.svelte';
	import LogoutHeader from '$lib/components/sections/logout_header_dark.svelte';
	import Footer from '$lib/components/sections/footer.svelte';

	export let data;
	$: ({ session } = data);

</script>

{#if (session)}
<LogoutHeader />
{:else}
<Header />
{/if}

<slot />

<Footer />