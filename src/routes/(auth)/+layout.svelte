<script>
	import Header from '$lib/components/sections/header.svelte';

	export let data;
	$: ({ session, supabase } = data);
</script>

<Header />

<slot />

