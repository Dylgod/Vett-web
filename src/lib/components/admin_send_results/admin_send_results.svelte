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

	const resultOptions = [
		['Pass', 'text-green-500'],
		['Fail', 'text-red-600']
		// ['No-show', 'text-gruvboxDark-yellow2']
	];

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

	function getNoteButtonColor(note: string): string {
		return note.length < 5 ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800';
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
							type="button"
							on:click={() => {
								activeNoteIndex = index;
								noteText = evaluation.note || '';
								showNoteModal = !showNoteModal;
							}}
							class="px-3 py-1 text-sm {getNoteButtonColor(
								evaluation.note || ''
							)} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
								class="w-full rounded-md border-gray-300 dark:bg-gray-700 py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500 {evaluation.result ===
								'Pass'
									? 'text-green-500'
									: evaluation.result === 'Fail'
										? 'text-red-600'
										: // : evaluation.result === 'No-show'
											// 	? 'text-gruvboxDark-yellow2'
											'text-white'}"
							>
								<option value="" class="text-white">Select result...</option>
								{#each resultOptions as option}
									<option value={option[0]} class={option[1]}>
										{option[0]}
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
		<div
			class="absolute top-0 left-[calc(100%+1rem)] w-64 dark:bg-gray-700 rounded-lg shadow-lg border"
		>
			<div class="flex justify-end">
				<button
					type="button"
					class="mr-2 mt-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
					on:click={() => (showNoteModal = !showNoteModal)}
				>
					✕
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<div class="pt-1 pl-4 pr-4 pb-4">
				<textarea
					bind:value={noteText}
					class="w-full h-48 p-2 border rounded resize-none bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
					placeholder="Enter note..."
				/>
				<div class="flex justify-end mt-4">
					<button
						type="button"
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
		<input type="hidden" name="evaluations" id="evaluations" value={JSON.stringify(evaluations)} />
		<button
			type="submit"
			disabled={evaluations.some((evaluation) => evaluation.result === '')}
			class="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
		>
			Finalize Results
		</button>
	</div>
</div>
