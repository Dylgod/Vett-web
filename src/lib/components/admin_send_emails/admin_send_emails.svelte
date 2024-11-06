<script lang="ts">
	// Props
	export let myemails: [string, boolean][];
	export let selected: string[] = [];

	// Status badge configurations
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

	// Handle checkbox changes
	function handleCheckboxChange(email: string, isChecked: boolean) {
		if (isChecked) {
			selected = [...selected, email];
		} else {
			selected = selected.filter((e) => e !== email);
		}
		console.log(selected);
	}
	console.log('myemails', myemails);

	function handleSelectAll() {
		if (selected.length === myemails.length) {
			// If all are selected, deselect all
			selected = [];
		} else {
			// Otherwise, select all
			selected = myemails.map(([email]) => email);
		}
	}

	// Compute button text based on selection state
	$: selectAllButtonText = selected.length === myemails.length ? 'Deselect All' : 'Select All';
</script>

<div class="w-full border rounded-lg">
	<!-- Header -->
	<div class="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-gray-300">
		<div class="col-span-1"></div>
		<div class="col-span-8">Candidate</div>
		<div class="col-span-3">Status</div>
	</div>

	<!-- Scrollable content -->
	<div class="h-64 overflow-y-auto">
		{#each myemails as [email, status]}
			<div class="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0">
				<!-- Checkbox -->
				<div class="col-span-1 flex items-center">
					<input
						type="checkbox"
						checked={selected.includes(email)}
						on:change={(e) => handleCheckboxChange(email, e.currentTarget.checked)}
						class="h-4 w-4 rounded border-gray-300"
					/>
				</div>

				<!-- Email -->
				<div class="col-span-8 flex items-center text-white">
					{email}
				</div>

				<!-- Status Badge -->
				<div class="col-span-3">
					{#if status}
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

<div class="flex gap-10 mt-6 justify-between">
	<button
		on:click={handleSelectAll}
		class="items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
	>
		{selectAllButtonText}
	</button>
	<button
		on:click={()=> alert("COOL!")}
		class=" px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
	>
		{selectAllButtonText}
	</button>
</div>
