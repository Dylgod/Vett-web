<script lang="ts">
	interface Evaluation {
		email: string;
		result: string;
		note: string | null | undefined;
	}

	export let emails: string[];

	let evaluations: Evaluation[] = emails.map((email) => ({
		email,
		result: '',
		note: null
	}));

	let activeNoteIndex: number = 80085;
	let noteText: string = '';
	let showNoteModal: boolean = false;

	const resultOptions = [['Pass', 'bg-green-500'], ['Fail', 'bg-red-500'], ['No-show', 'bg-gruvboxDark-yellow2']];

	function handleResultChange(email: string, newResult: string) {
		evaluations = evaluations.map((evaluation) =>
			evaluation.email === email ? { ...evaluation, result: newResult } : evaluation
		);
	}

	function handleSaveNote(email: string) {
		evaluations = evaluations.map((evaluation) =>
			evaluation.email === email ? { ...evaluation, note: noteText } : evaluation
		);
		noteText = '';
		showNoteModal = !showNoteModal;
	}

	function sendResults() {
		for (let i = 0; i < evaluations.length; i++) {
			console.log(evaluations[i]);
		}
	}
</script>

<div class="relative">
	<div class="w-full border rounded-lg">
		<div class="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-gray-300">
			<div class="col-span-1"></div>
			<div class="col-span-8">Candidate</div>
			<div class="col-span-3">Result</div>
		</div>

		<div class="h-64 overflow-y-auto">
			{#each evaluations as evaluation, index (evaluation.email)}
				<div class="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0">
					<div class="col-span-1 flex items-center">
						<button
							on:click={() => {
								activeNoteIndex = index;
								noteText = evaluation.note || '';
								showNoteModal = !showNoteModal;
							}}
							class="px-3 py-1 text-sm bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							Note
						</button>
					</div>

					<div class="col-span-8 flex items-center text-white pl-5">
						{evaluation.email}
					</div>

					<div class="col-span-3">
						<div class="relative">
							<select
								bind:value={evaluation.result}
								on:change={(e) => handleResultChange(evaluation.email, e.currentTarget.value)}
								class="w-full rounded-md border-gray-300 text-white dark:bg-gray-700 py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500"
							>
								<option value="">Select result...</option>
								{#each resultOptions as option}
									<option value={option}>
										{option}
									</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if showNoteModal}
		<div class="absolute top-0 left-[calc(100%+1rem)] w-64 bg-white rounded-lg shadow-lg border">
			<div class="p-4">
				<textarea
					bind:value={noteText}
					class="w-full h-48 p-2 border rounded resize-none"
					placeholder="Enter note..."
				/>
				<div class="flex justify-end mt-4">
					<button
						on:click={() => handleSaveNote(evaluations[activeNoteIndex].email)}
						class="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
					>
						Save Note
					</button>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex justify-end mt-6">
		<button
			type="button"
			disabled={evaluations.some((evaluation) => evaluation.result === '')}
			on:click={() => sendResults()}
			class="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
		>
			Finalize Results
		</button>
	</div>
</div>
