<script lang="ts">
	import { enhance } from '$app/forms';
	import { emailStore } from '$lib/stores';

	export let myemails: [string, boolean | 'fail'][];
	export let selected: string[] = [];

	export let resend_email_body: string
	export let resend_email_company_name: string
	export let resend_supabase_emails_column: string
	export let resend_order_id: string
	let resend_email_address: string;

	$: {
		emailStore.set({
			emails: myemails,
			loading: false
		});
	}

	const statusConfigs = {
		Sent: {
			bgColor: 'bg-green-100',
			textColor: 'text-green-700',
			fillColor: 'fill-green-500'
		},
		'Not Sent': {
			bgColor: 'bg-yellow-100',
			textColor: 'text-yellow-700',
			fillColor: 'fill-yellow-500'
		},
		Failed: {
			bgColor: 'bg-red-100',
			textColor: 'text-red-700',
			fillColor: 'fill-red-500'
		}
	};

	function handleCheckboxChange(email: string, isChecked: boolean) {
		if (isChecked) {
			selected = [...selected, email];
		} else {
			selected = selected.filter((e) => e !== email);
		}
	}

	function handleSelectAll() {
		if (selected.length === $emailStore.emails.length) {
			selected = [];
		} else {
			selected = $emailStore.emails.map(([email]) => email);
		}
	}

	$: selectAllButtonText =
		selected.length === $emailStore.emails.length ? 'Deselect All' : 'Select All';
</script>

<div class="w-full border rounded-lg">
	{#if $emailStore.error}
		<div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
			{$emailStore.error}
		</div>
	{/if}

	<div class="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-gray-300">
		<div class="col-span-1"></div>
		<div class="col-span-8">Candidate</div>
		<div class="col-span-3">Status</div>
	</div>

	<div class="h-64 overflow-y-auto">
		{#each $emailStore.emails as [email, status]}
			<div class="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0">
				<div class="col-span-1 flex items-center">
					<input
						type="checkbox"
						checked={selected.includes(email)}
						on:change={(e) => handleCheckboxChange(email, e.currentTarget.checked)}
						class="h-4 w-4 rounded border-gray-300"
						disabled={$emailStore.loading || status === true}
					/>
				</div>

				<div class="col-span-8 flex items-center text-white">
					{email}
				</div>

				<div class="col-span-3">
					{#if status === true}
						<span
							class="inline-flex items-center gap-x-1.5 rounded-md {statusConfigs.Sent
								.bgColor} px-2 py-1 text-xs font-medium {statusConfigs.Sent.textColor}"
						>
							<svg
								class="h-1.5 w-1.5 {statusConfigs.Sent.fillColor}"
								viewBox="0 0 6 6"
								aria-hidden="true"
							>
								<circle cx="3" cy="3" r="3" />
							</svg>
							Sent
						</span>
					{:else if status === 'fail'}
						<span
							class="inline-flex items-center gap-x-1.5 rounded-md {statusConfigs.Failed
								.bgColor} px-2 py-1 text-xs font-medium {statusConfigs.Failed.textColor}"
						>
							<svg
								class="h-1.5 w-1.5 {statusConfigs.Failed.fillColor}"
								viewBox="0 0 6 6"
								aria-hidden="true"
							>
								<circle cx="3" cy="3" r="3" />
							</svg>
							Failed
						</span>
					{:else}
						<span
							class="inline-flex items-center gap-x-1.5 rounded-md {statusConfigs['Not Sent']
								.bgColor} px-2 py-1 text-xs font-medium {statusConfigs['Not Sent'].textColor}"
						>
							<svg
								class="h-1.5 w-1.5 {statusConfigs['Not Sent'].fillColor}"
								viewBox="0 0 6 6"
								aria-hidden="true"
							>
								<circle cx="3" cy="3" r="3" />
							</svg>
							Not Sent
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<div class="flex mb-10 mt-4 gap-4 relative">
	<form method="POST" action="?/resendEmail" class="flex" use:enhance>
		<input type="hidden" name="resend_order_id" value={resend_order_id} />
		<input type="hidden" name="resend_email_body" value={resend_email_body} />
		<input type="hidden" name="resend_email_company_name" value={resend_email_company_name} />
		<input type="hidden" name="resend_supabase_emails_column" value={resend_supabase_emails_column} />
		<input
			type="text"
			bind:value={resend_email_address}
			name="resend_email_address"
			id="resend_email_address"
			placeholder="Enter Email to resend.."
			class="border rounded-l-lg bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm focus:ring-primary-600 focus:border-primary-600 block dark:focus:ring-primary-500 dark:focus:border-primary-500 w-60"
			spellcheck="true"
		/>
		<button
			type="submit"
			class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end"
		>
			Resend
		</button>
	</form>
</div>

<div class="flex gap-10 mt-6 mb-2 justify-between">
	<button
		type="button"
		on:click={handleSelectAll}
		class="items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
		disabled={$emailStore.loading}
	>
		{selectAllButtonText}
	</button>
	<button
		type="submit"
		class="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
		disabled={$emailStore.loading || selected.length === 0}
	>
		{$emailStore.loading ? 'Sending...' : 'Send Emails'}
	</button>
</div>
