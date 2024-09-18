<script>
	import { onMount } from 'svelte';

	const tabs = [
		{
			id: 'code-reviews',
			title: 'Code Reviews',
			description:
				"We review a candidate's projects in detail, and explore the tradeoffs and decision-making process.",
			image: './screenshots/profile.png'
		},
		{
			id: 'takehome-projects',
			title: 'Takehome Projects',
			description:
				'Many candidates prefer to have their skills tested on real-world problems. We happily oblige.',
			image: './screenshots/gitkraken.png'
		},
		{
			id: 'security-reviews',
			title: 'Security Reviews',
			description:
				"Certifications don't always translate to real skills. Fake it until you make it doesn't work on us.",
			image: './screenshots/datadog.png'
		}
	];

	let selectedTab = tabs[0];

	/**
	 * @param {{ id: string; title: string; description: string; image: string; }} tab
	 */
	function selectTab(tab) {
		selectedTab = tab;
	}
</script>

<section
	id="benefits"
	aria-label="the benefits of our evaluation process"
	class="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
>
	<!-- Background image -->
	<img
		alt=""
		loading="lazy"
		width="2245"
		height="1636"
		decoding="async"
		class="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
		style="color:transparent"
		src="./background-features.jpg"
	/>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
		<!-- Title and description -->
		<div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
			<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
				Deep Technical Evaluations
			</h2>
			<p class="mt-6 text-lg tracking-tight text-blue-100">
				We offer each candidate an interview process that they are comfortable with so we can
				evaluate them at their best.
			</p>
		</div>

		<!-- Tabs and content -->
		<div
			class="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
		>
			<!-- Buttons -->
			<div
				class="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5"
			>
				<div
					class="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
					role="tablist"
					aria-orientation="vertical"
				>
					{#each tabs as tab}
						<div
							class="group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 {selectedTab.id ===
							tab.id
								? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
								: 'hover:bg-white/10 lg:hover:bg-white/5'}"
						>
							<h3>
								<button
									class="font-display text-lg ui-not-focus-visible:outline-none {selectedTab.id ===
									tab.id
										? 'text-blue-600 lg:text-white'
										: 'text-blue-100 hover:text-white lg:text-white'}"
									role="tab"
									aria-selected={selectedTab.id === tab.id}
									on:click={() => selectTab(tab)}
								>
									<span class="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none"
									></span>
									{tab.title}
								</button>
							</h3>
							<p
								class="mt-2 hidden text-sm lg:block {selectedTab.id === tab.id
									? 'text-white'
									: 'text-blue-100 group-hover:text-white'}"
							>
								{tab.description}
							</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Content -->
			<div class="lg:col-span-7">
				<div class="image-container">
					{#each tabs as tab}
						<div
							role="tabpanel"
							aria-labelledby={tab.id}
							class="image-wrapper"
							class:hidden={selectedTab.id !== tab.id}
						>
							<div class="relative sm:px-6 lg:hidden">
								<div
									class="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl"
								></div>
								<p class="relative mx-auto max-w-2xl text-base text-white sm:text-center">
									{tab.description}
								</p>
							</div>
							<div
								class="image-frame mt-10 overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20"
							>
								<img
									alt={tab.title}
									fetchpriority="high"
									decoding="async"
									class="tab-image"
									src={tab.image}
								/>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.image-container {
		position: relative;
		width: 100%;
		max-width: 67.8125rem; /* This matches the lg:w-[67.8125rem] from the original code */
		height: 35rem;
		margin: 0 auto;
		aspect-ratio: 16 / 9; /* Fixed aspect ratio */
	}

	.image-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 0.3s ease-in-out;
	}

	.image-wrapper.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.image-frame {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.tab-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top; /* Align to the top of the image */
	}

	/* Responsive adjustments */
	@media (max-width: 1280px) {
		.image-container {
			max-width: 100%;
		}

		.image-wrapper {
			position: relative;
		}
	}
</style>
