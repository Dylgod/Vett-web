<script lang="ts">
	import Faq from '$lib/components/sections/faq.svelte';
	import Testimonials from '$lib/components/sections/testimonials.svelte';
	import Header from '$lib/components/sections/header.svelte';
	import LogoutHeader from '$lib/components/sections/logout_header.svelte';
	import Hero from '$lib/components/sections/hero.svelte';
	import Footer from '$lib/components/sections/footer.svelte';
	import Problem from '$lib/components/sections/problem.svelte';
	import Pricing from '$lib/components/sections/pricing.svelte';
	import Howitworks from '$lib/components/sections/howitworks.svelte';

	export let data;
	$: ({ session, supabase } = data);
</script>

{#if (session)}
<LogoutHeader />
{:else}
<Header />
{/if}

<Hero />

<Problem />

<Howitworks />

<Testimonials />

<Pricing />

<Faq />

<Footer /> 
