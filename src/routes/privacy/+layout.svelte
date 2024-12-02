<script>
	import Header from '$lib/components/sections/header.svelte';
	import LogoutHeader from '$lib/components/sections/logout_header.svelte';
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