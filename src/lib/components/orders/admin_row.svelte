<script lang="ts">
	const taskColors = {
		onboarding: 'aqua',
		create_takehome: 'purple',
		tech_interview: 'yellow',
		update: 'blue',
		review: 'red'
	};

	export let task: keyof typeof taskColors;
    export let company: string;
    export let manager: string;
    export let order_id: string;
    export let date: string;
</script>

<li class="task-item {task}">
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
					<p class="task-type">Type</p>
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

<style>
	.task-item {
		--task-color: var(--color-gruvboxDark-aqua);
	}
	.task-item.onboarding {
		--task-color: var(--color-gruvboxDark-aqua);
	}
	.task-item.create_takehome {
		--task-color: var(--color-gruvboxDark-purple);
	}
	.task-item.tech_interview {
		--task-color: var(--color-gruvboxDark-yellow);
	}
	.task-item.update {
		--task-color: var(--color-gruvboxDark-blue);
	}
	.task-item.review {
		--task-color: var(--color-gruvboxDark-red);
	}

	.task-item {
		@apply w-full bg-neutral-800 border rounded-md mt-2;
		border-color: var(--task-color);
	}

	.task-type {
		@apply font-semibold truncate text-lg;
		color: var(--task-color);
	}
</style>
