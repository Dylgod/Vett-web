<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number = 1;

	let isOpen = false;

	const numbers = Array.from({ length: 15 }, (_, i) => i + 1);

	const dispatch = createEventDispatcher<{ change: number }>();

	function toggleMenu(): void {
		isOpen = !isOpen;
	}

	function selectNumber(number: number): void {
		value = number;
		isOpen = false;
		dispatch('change', value);
	}

	function handleClickOutside(event: MouseEvent): void {
		if (isOpen && !event.target) return;
		const target = event.target as HTMLElement;
		if (isOpen && !target.closest('.select-container')) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="select-container relative inline-block text-left">
	<button
		type="button"
		class="inline-flex items-center justify-between w-20 rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		on:click={toggleMenu}
		aria-haspopup="true"
		aria-expanded={isOpen}
	>
		<span class="mr-2">{value}</span>
		<svg
			class="h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	{#if isOpen}
		<div
			class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-10"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			<div class="py-1 max-h-40 overflow-y-auto custom-scrollbar" role="none">
				{#each numbers as number}
					<button
						class="block w-full text-left px-4 py-2 text-sm bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 hover:text-gray-900"
						role="menuitem"
						on:click={() => selectNumber(number)}
					>
						{number}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.custom-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: #888 #f1f1f1;
	}

	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: #888;
		border-radius: 20px;
		border: 3px solid #f1f1f1;
	}

	/* Adjust the dropdown width to account for the scrollbar */
	.select-container > div[role='menu'] {
		width: calc(5rem); /* 7rem (w-28) minus 6px for scrollbar */
	}

	/* Ensure the content within the dropdown aligns with the button */
	.select-container > div[role='menu'] > div {
		width: 5rem; /* Full width to align with button */
	}
</style>
