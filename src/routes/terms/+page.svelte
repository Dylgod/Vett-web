<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="bg-neutral-100">
	<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="prose mx-auto max-w-full">
			{@html data.html}
		</div>
	</div>
</section>