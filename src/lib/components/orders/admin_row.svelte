<script lang="ts">
	const taskColors = {
		onboarding: 'border-gruvboxDark-aqua text-gruvboxDark-aqua',
		create_takehome: 'border-gruvboxDark-purple text-gruvboxDark-purple',
		tech_interview: 'border-gruvboxDark-yellow text-gruvboxDark-yellow',
		update: 'border-gruvboxDark-blue text-gruvboxDark-blue',
		review: 'border-gruvboxDark-red text-gruvboxDark-red'
	} as const;

	export let task: Task;

	$: taskType = task.Type;
	$: colorClasses = taskColors[taskType] || 'border-gray-500 text-gray-500'; // Default color if type is not found
	$: company = task.Company_name;
	$: manager = task.Manager;
	$: order_id = task.Order_id;
	$: date = task.Date;
</script>

<li class="w-full bg-neutral-800 border rounded-md mt-2 {colorClasses}">
	<button
		on:click={() => alert('clicked')}
		class="min-w-0 overflow-hidden w-full hover:bg-gruvboxDark-bgS"
	>
		<div class="flex gap-3 py-2 px-4 w-full justify-between">
			<div class="flex gap-3 w-full">
				<img
					class="h-16 w-16 flex-shrink-0 rounded-full bg-gray-50"
					alt=""
					src="screenshots/eric.jpg"
				/>
				<div class="min-w-0 flex flex-col place-items-start col-span-2">
					<p class="font-semibold truncate text-lg {colorClasses}">{taskType.toLocaleUpperCase()}</p>
					<p class="font-semibold text-gray-300 truncate text-sm">{company}</p>
					<p class="font-semibold text-gray-300 truncate text-sm">PB: {manager}</p>
				</div>
			</div>
			<div class="pr-2">
				<p class="text-sm font-semibold text-gray-300 truncate">#{order_id}</p>
				<p class="text-sm font-semibold text-gray-300 truncate mt-7">{date}</p>
			</div>
		</div>
	</button>
</li>
