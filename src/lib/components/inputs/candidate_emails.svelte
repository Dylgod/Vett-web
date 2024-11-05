<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let numberOfCandidates: number;
    export let emailInputs: string[] = Array(numberOfCandidates).fill('');

    let validationErrors: boolean[] = Array(numberOfCandidates).fill(false);

    const dispatch = createEventDispatcher<{
        change: string[];
    }>();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateEmail(email: string, index: number): void {
        validationErrors[index] = !emailRegex.test(email);
        validationErrors = [...validationErrors];

        if (!validationErrors.some((error) => error)) {
            dispatch('change', emailInputs);
        }
    }

    function handleInput(index: number, value: string): void {
        emailInputs[index] = value;
        emailInputs = [...emailInputs];
        validateEmail(value, index);
    }

    $: if (numberOfCandidates !== emailInputs.length) {
        emailInputs = Array(numberOfCandidates).fill('').map((_, i) => emailInputs[i] || '');
    }

</script>

<div class="space-y-4">
	<h3 class="text-lg font-medium text-gray-900 dark:text-white">Add Candidate Emails</h3>

	{#each emailInputs as email, index}
		<div class="flex items-start space-x-4">
			<div class="flex-1">
				<input
					type="email"
					bind:value={emailInputs[index]}
					on:input={() => handleInput(index, emailInputs[index])}
					class="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
					class:error={validationErrors[index]}
					placeholder={`Candidate ${index + 1} Email`}
				/>
				{#if validationErrors[index]}
					<span class="error-message text-red-500">Please enter a valid email address</span>
				{/if}
			</div>
		</div>
	{/each}
</div>
