<script>
	import Highlight from 'svelte-highlight';
	import rust from 'svelte-highlight/languages/rust';
	import tokyo from 'svelte-highlight/styles/tokyo-night-dark';
	const code = `
 // Burning time and money
fn hire_noob(noob: BadHire) {
  while noob.is_hired {
    company.lose_money(100_000)
  }
}

// Making money, living your best life
fn hire_pro(pro: GoodHire) {
  while pro.is_hired {
    company.make_money(100_000_000)
  }
} 
  `;
</script>

<svelte:head>
	{@html tokyo}
</svelte:head>

<div class="overflow-hidden bg-gray-900 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl md:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
			<div class="px-6 md:px-0 lg:pr-4 lg:pt-4">
				<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
					<h2 class="text-base font-semibold leading-7 text-white">Deploy faster</h2>
					<p class="mt-2 text-3xl font-bold tracking-tight text-indigo-500 sm:text-4xl">
						The Cost of a Bad Hire
					</p>
					<p class="mt-6 text-lg leading-8 text-white">
						Poor performance among hires cost enterprise level companies millions every quarter.
						Vetting candidates take the risk out of the process for a fraction of that cost.
					</p>
					<dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
						<div class="relative pl-9">
							<dt class="inline font-semibold text-gray-900">
								<svg
									class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
										clip-rule="evenodd"
									/>
								</svg>
							</dt>
							<dd class="text-white">
								According to the CEO of Link humans, the cost of a bad hire is $240,000 US dollars.
								Thats nearly 3x the average junior developer's salary. One meeting could be what
								seperates your company from serious savings.
							</dd>
						</div>
						<div class="relative pl-9">
							<dt class="inline font-semibold text-gray-900">
								<svg
									class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
										clip-rule="evenodd"
									/>
								</svg>
							</dt>
							<dd class="inline text-white">
								In a study conducted by the Bureau of Labor Statistics, <strong
									>73% of Americans would lie</strong
								>
								on resume or use AI to cheat and 74% of hiring managers admit to having made bad
								hiring decisions. Dont be a victim to AI deception or
								<a class="text-indigo-500" href="https://www.youtube.com/watch?v=5bId3N7QZec"
									>leetcode</a
								> warriors. Let Vett do the heavy lifting.
							</dd>
						</div>
						<div class="relative pl-9">
							<dt class="inline font-semibold text-gray-900">
								<svg
									class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
									/>
									<path
										fill-rule="evenodd"
										d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
										clip-rule="evenodd"
									/>
								</svg>
							</dt>
							<dd class="text-white">
								The Standish Group's CHAOS report indicates that only 29% of software projects are completed on time and within budget and yet, high-performing software developers are up to 10 times more productive than average developers. Let Vett find your company that 10x developer and get more projects done on time.
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
				<div
					class="absolute inset-y-0 right-1/2 -z-10 -mr-10 skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
					aria-hidden="true"
				></div>
				<div class="shadow-lg md:rounded-3xl">
					<div
						class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
					>
						<div
							class="absolute -inset-y-px left-1/2 -z-10 ml-10 skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
							aria-hidden="true"
						></div>
						<div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
							<div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
								<div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
									<div class="flex bg-gray-800/40 ring-1 ring-white/5">
										<div class="-mb-px flex text-sm font-medium leading-6 text-gray-400">
											<div
												class="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white"
											>
												hiring_decisions.rs
											</div>
											<div class="border-r border-gray-600/10 px-4 py-2">profit.rs</div>
										</div>
									</div>
									<div class="px-6">
										<Highlight language={rust} {code} />
									</div>
								</div>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
								aria-hidden="true"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.hljs) {
		background: transparent !important;
	}
</style>
