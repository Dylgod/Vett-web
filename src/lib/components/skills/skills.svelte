<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	interface Skill {
		text: string;
		color: string;
	}

	let skillInput = '';
	let skills: Writable<Skill[]> = writable([]);
	const colors: string[] = ['bg-teal-500', 'bg-orange-500', 'bg-rose-500', 'bg-purple-500'];
	let colorIndex = 0;
	let showMaxAlert = false;

	const dispatch = createEventDispatcher();

	function addSkill(): void {
		if (skillInput.trim()) {
			if ($skills.length < 8) {
				$skills = [...$skills, { text: skillInput, color: colors[colorIndex] }];
				colorIndex = (colorIndex + 1) % colors.length;
				skillInput = '';
				dispatch('skillslist', getSkillsList());
			} else {
				showMaxAlert = true;
				setTimeout(() => {
					showMaxAlert = false;
				}, 3000);
			}
		}
	}

	function removeSkill(index: number): void {
		$skills = $skills.filter((_, i) => i !== index);
		dispatch('skillslist', getSkillsList());
	}

	function getSkillsList(): string[] {
		return $skills.map((skill) => skill.text);
	}
</script>

<div class="gap-4 mb-4 relative">
	<label for="skills" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Skills</label
	>
	<div class="flex mb-2">
		<input
			type="text"
			bind:value={skillInput}
			maxlength="30"
			id="skills"
			placeholder="Add Skill"
			class="border rounded-l-lg bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full dark:focus:ring-primary-500 dark:focus:border-primary-500"
			spellcheck="true"
		/>
		<button
			on:click={addSkill}
				type="button"
				class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end"
			>
				<svg
					class="me-1 -ms-1 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					></path></svg
				>
				Add
		</button>
	</div>
	<div
		class="mt-2 h-48 w-full overflow-y-auto border border-gray-300 rounded-lg p-2 dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
	>
		<div class="flex flex-wrap -mx-1">
			{#each $skills as skill, index}
				<div
					class="px-1 py-1"
					style="margin-left: {index % 2 === 0 && Math.floor(index / 4) % 2 !== 0 ? '5px' : '0'}"
				>
					<button
						on:click={() => removeSkill(index)}
						class="{skill.color} text-white rounded-lg px-2 py-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500"
					>
						{skill.text} -
					</button>
				</div>
			{/each}
		</div>
	</div>

	{#if showMaxAlert}
		<div
			transition:fade
			class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md text-sm"
			role="alert"
		>
			8 skills Maximum
		</div>
	{/if}
</div>
