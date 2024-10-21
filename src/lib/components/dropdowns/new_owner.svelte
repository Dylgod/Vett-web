<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type Admin = {
		uuid: string;
		name: string | undefined;
		email: string | undefined;
		type: 'Administrator';
		isowner: boolean;
	};

	export let people: Admin[] = [];

	let value: string;
	let selectedUuid: string;
	let isOpen = false;
	let allOptions: Array<{ name: string; uuid: string }> = [];

	$: {
        const owner = people.find((admin) => admin.isowner);
		if (owner && !value) {
			value = owner.name || '';
			selectedUuid = owner.uuid;
		}
		allOptions = people
			.map((admin) => ({ name: admin.name || '', uuid: admin.uuid }))
			.filter((admin) => admin.uuid !== selectedUuid);
	}

	const dispatch = createEventDispatcher<{ change: { uuid: string } }>();

	function toggleMenu(): void {
        if (people.length > 1) {
            isOpen = !isOpen;
        }
	}

	function selectPerson(person_uuid: string): void {
		const selectedPerson = people.find((admin) => admin.uuid === person_uuid);
		if (selectedPerson) {
			value = selectedPerson.name || '';
			selectedUuid = selectedPerson.uuid;
			isOpen = false;
			dispatch('change', { uuid: selectedUuid });
		}
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
		class="inline-flex items-center justify-between w-60 rounded-md border shadow-sm px-4 py-2 text-sm font-medium bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
			class="absolute mt-1 rounded-md shadow-lg bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			<div class="py-1 max-h-40 overflow-y-auto custom-scrollbar" role="none">
				{#each allOptions as person}
					<button
						class="px-4 py-2 text-sm block w-full text-left font-semibold bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 hover:text-blue-200"
						role="menuitem"
						on:click={() => selectPerson(person.uuid)}
					>
						{person.name}
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
		width: calc(15rem - 5px); /* 7rem (w-28) minus 6px for scrollbar */
	}

	/* Ensure the content within the dropdown aligns with the button */
	.select-container > div[role='menu'] > div {
		width: 14rem; /* Full width to align with button */
	}
</style>
