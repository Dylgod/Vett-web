<script lang="ts">
	import Faq from '$lib/components/sections/faq.svelte';
	import Reviews from '$lib/components/sections/reviews.svelte';
	import Header from '$lib/components/sections/header.svelte';
	import Hero from '$lib/components/sections/hero.svelte';
	import Footer from '$lib/components/sections/footer.svelte';
	import Problem from '$lib/components/sections/problem.svelte';
	import Howitworks from '$lib/components/sections/howitworks.svelte';

	import { LayerCake, Svg } from 'layercake';

	import Line from '$lib/components/graphs/Line.svelte';
	import Area from '$lib/components/graphs/Area.svelte';
	import AxisX from '$lib/components/graphs/AxisX.svelte';
	import AxisY from '$lib/components/graphs/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	// @ts-ignore
	import data from '$lib/components/graphs/datapoints.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach((d: { [x: string]: string | number; }) => {
	d[yKey] = +d[yKey];
	});
</script>

<Header />

<Hero />

<Problem />

<Howitworks />

<Reviews />

<Faq />

<Footer />
