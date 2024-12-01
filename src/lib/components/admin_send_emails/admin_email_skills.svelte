<script lang="ts">
	interface Eval_Step {
		step: string;
		description: string;
		order: number;
	}

	let eval_steps: Eval_Step[] = [
		{
			step: '',
			description: '',
			order: 0
		}
	];

	export let exported_steps: string | null;
	export let imported_steps: Eval_Step[] | null;

	let activeDescriptionIndex: number = -1;
	let descriptionText: string = '';
	let showDescriptionModal: boolean = false;

	// Reset to default state if imported_steps is null
	$: {
		if (imported_steps === null || imported_steps === undefined) {
			eval_steps = [
				{
					step: '',
					description: '',
					order: 0
				}
			];
			exported_steps = JSON.stringify(eval_steps);
		} else {
			eval_steps = imported_steps;
			exported_steps = JSON.stringify(imported_steps);
		}
	}

	function handleAddEval_Step() {
		const newStep = {
			step: '',
			description: '',
			order: eval_steps.length
		};
		eval_steps = [...eval_steps, newStep];
		exported_steps = JSON.stringify(eval_steps);
		// Force Svelte to update by reassigning imported_steps
		imported_steps = eval_steps;
	}

	function handleRemoveEval_Step(index: number) {
		if (eval_steps.length > 1) {
			const updatedSteps = eval_steps
				.filter((_, idx) => idx !== index)
				.map((step, idx) => ({
					...step,
					order: idx
				}));
			eval_steps = updatedSteps;
			exported_steps = JSON.stringify(updatedSteps);
			// Force Svelte to update by reassigning imported_steps
			imported_steps = updatedSteps;
		}
	}

	function handleStepChange(index: number, value: string) {
		const updatedSteps = eval_steps.map((step, idx) =>
			idx === index ? { ...step, step: value } : step
		);
		eval_steps = updatedSteps;
		exported_steps = JSON.stringify(updatedSteps);
		// Force Svelte to update by reassigning imported_steps
		imported_steps = updatedSteps;
	}

	function handleSaveDescription(index: number) {
		const updatedSteps = eval_steps.map((step, idx) =>
			idx === index ? { ...step, description: descriptionText } : step
		);
		eval_steps = updatedSteps;
		exported_steps = JSON.stringify(updatedSteps);
		// Force Svelte to update by reassigning imported_steps
		imported_steps = updatedSteps;
		descriptionText = '';
		showDescriptionModal = false;
	}

	function getButtonColor(description: string): string {
		return description.length < 5 ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800';
	}
</script>

<div class="relative">
	<div class="w-full border rounded-lg">
		<div class="h-64 overflow-y-auto">
			{#each eval_steps as step, index (index)}
				<div class="flex pt-4 pb-4 border-b last:border-b-0">
					<div class="pl-4 flex items-center">
						<button
							type="button"
							on:click={() => {
								activeDescriptionIndex = index;
								descriptionText = step.description || '';
								showDescriptionModal = !showDescriptionModal;
							}}
							class="px-3 py-1 text-sm {getButtonColor(
								step.description
							)} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							Describe
						</button>
					</div>

					<div class="pl-2 w-full max-w-96 flex items-center">
						<input
							type="text"
							placeholder="Step name..."
							value={step.step}
							on:input={(e) => handleStepChange(index, e.currentTarget.value)}
							class="w-full rounded-md border-gray-300 dark:bg-gray-700 py-1.5 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 text-white"
						/>
					</div>

					<div class="pl-3 flex items-center justify-end gap-1">
						<button
							type="button"
							on:click={() => handleRemoveEval_Step(index)}
							class="w-6 px-2 py-1 text-sm flex items-center font-extrabold bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							-
						</button>
						{#if index === eval_steps.length - 1}
							<button
								type="button"
								on:click={handleAddEval_Step}
								class="w-6 px-2 py-1 text-sm flex items-center font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
							>
								+
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if showDescriptionModal}
		<div
			class="absolute top-0 left-[calc(100%+1rem)] w-64 dark:bg-gray-700 rounded-lg shadow-lg border"
		>
			<div class="flex justify-end">
				<button
					type="button"
					class="mr-2 mt-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
					on:click={() => (showDescriptionModal = !showDescriptionModal)}
				>
					✕
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<div class="pt-1 pl-4 pr-4 pb-4">
				<textarea
					bind:value={descriptionText}
					class="w-full h-48 p-2 border rounded resize-none bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Enter description..."
				/>
				<div class="flex justify-end mt-4">
					<button
						type="button"
						on:click={() => handleSaveDescription(activeDescriptionIndex)}
						class="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
					>
						Save Description
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
