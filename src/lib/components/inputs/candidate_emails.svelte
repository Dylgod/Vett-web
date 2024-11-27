<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';

	export let numberOfCandidates: number;
	export let emailInputs: string[] = Array(numberOfCandidates).fill('');

	let validationErrors: boolean[] = Array(numberOfCandidates).fill(false);
	let errorMessages: string[] = Array(numberOfCandidates).fill('');

	const dispatch = createEventDispatcher<{
		change: string[];
	}>();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validateEmail(email: string, index: number): void {
		// Check for duplicates in other fields
		const isDuplicate = emailInputs.some((e, i) => e === email && i !== index);

		if (isDuplicate) {
			validationErrors[index] = true;
			errorMessages[index] = 'This email has already been entered';
		} else {
			validationErrors[index] = !emailRegex.test(email);
			errorMessages[index] = validationErrors[index] ? 'Please enter a valid email address' : '';
		}

		validationErrors = [...validationErrors];
		errorMessages = [...errorMessages];

		if (!validationErrors.some((error) => error)) {
			dispatch('change', emailInputs);
		}
	}

	function handleInput(index: number, value: string): void {
		emailInputs[index] = value;
		emailInputs = [...emailInputs];
		validateEmail(value, index);
	}

	function handlePaste(event: ClipboardEvent, index: number): void {
		// Prevent default paste behavior
		event.preventDefault();

		// Get pasted content
		const pastedText = event.clipboardData?.getData('text') || '';

		// Split by common delimiters (newline, comma, semicolon)
		const emails = pastedText
			.split(/[\n,;]/)
			.map((email) => email.trim())
			.filter((email) => email !== '');

		// Only take as many emails as we have fields available
		const availableFields = numberOfCandidates - index;
		const emailsToUse = emails.slice(0, availableFields);

		// Populate the fields
		emailsToUse.forEach((email, i) => {
			if (index + i < numberOfCandidates) {
				emailInputs[index + i] = email;
				validateEmail(email, index + i);
			}
		});

		emailInputs = [...emailInputs];
	}

	function clearAllFields(): void {
		emailInputs = Array(numberOfCandidates).fill('');
		validationErrors = Array(numberOfCandidates).fill(false);
		errorMessages = Array(numberOfCandidates).fill('');
		dispatch('change', emailInputs);
	}

	$: if (numberOfCandidates !== emailInputs.length) {
		emailInputs = Array(numberOfCandidates)
			.fill('')
			.map((_, i) => emailInputs[i] || '');
		validationErrors = Array(numberOfCandidates).fill(false);
		errorMessages = Array(numberOfCandidates).fill('');
	}
</script>

<div class="space-y-4">
	<div class="flex justify-between items-center">
		<h3 class="text-lg font-medium text-gray-900 dark:text-white">Add Candidate Emails<span class="ml-2 text-sm text-gray-400">- try pasting the emails in!</span></h3>
		<button
			type="button"
			class="inline-flex items-center px-3 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-700"
			on:click={clearAllFields}
		>
			<!-- <X class="w-4 h-4 mr-1" /> -->
			Clear All
		</button>
	</div>

	{#each emailInputs as email, index}
		<div class="flex items-start space-x-4">
			<div class="flex-1">
				<input
					type="email"
					bind:value={emailInputs[index]}
					on:input={() => handleInput(index, emailInputs[index])}
					on:paste={(e) => handlePaste(e, index)}
					class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
					class:border-red-500={validationErrors[index]}
					placeholder={`Candidate ${index + 1} Email`}
				/>
				{#if validationErrors[index]}
					<span class="text-sm text-red-500">{errorMessages[index]}</span>
				{/if}
			</div>
		</div>
	{/each}
</div>
