<script>
	import Header from '$lib/components/sections/header_admin.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		document.body.classList.add('bg-gruvboxDark-bgH');
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => {
			data.subscription.unsubscribe();
			document.body.classList.remove('bg-gruvboxDark-bgH');
		}
	});
</script>

<Header />

<slot />
