<script lang="ts">
	import AdminRow from '$lib/components/orders/admin_row.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let tasks = data.tasks as Task[];

	// import order -> get company info -> create type Task object
</script>

<div class="bg-gruvboxDark-bgH">
	<div class="pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="overflow-hidden rounded-lg gruvboxDark-bgH shadow-md shadow-gruvboxDark-red">
			<h2 class="sr-only" id="profile-overview-title">Admin Dashboard</h2>
			<div class="gruvboxDark-bgH p-6">
				<div class="sm:flex sm:items-center sm:justify-between">
					<div class="sm:flex sm:space-x-5 gruvboxDark-bgH">
						<div class="flex-shrink-0">
							<img class="mx-auto h-20 w-20 rounded-full" src="screenshots/eric.jpg" alt="" />
						</div>
						<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left gruvboxDark-bgH">
							<p class="text-sm font-medium text-white">Welcome back,</p>
							<p class="text-xl font-bold text-gruvboxDark-red sm:text-2xl">Eric Biggs</p>
							<p class="mt-1 text-sm font-medium text-white">Administrator</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="mt-8 text-2xl font-semibold leading-6 text-white">Dashboard</h1>
			</div>
		</div>
		<div class="mt-10 sm:mt-16">
			<div class="gruvboxDark-bgH grid grid-cols-2 sm:mt-16 gap-10 lg:grid-rows-1">
				<div class="-ml-4 -mt-4 flex items-center justify-start sm:flex-nowrap">
					<div class="ml-4 mt-4">
						<h3 class="text-2xl font-semibold leading-6 text-gruvboxDark-red gruvboxDark-bgH">
							Upcoming Tasks
						</h3>
					</div>
				</div>
				<div class="-ml-4 -mt-4 flex items-center sm:flex-nowrap gruvboxDark-bgH">
					<div class="ml-4 mt-4 gruvboxDark-bgH">
						<h3 class="text-2xl font-semibold leading-6 text-gruvboxDark-red gruvboxDark-bgH">
							Current Tasks
						</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="mb-8 mx-auto max-w-2xl lg:max-w-7xl gruvboxDark-bgH">
			<div class=" grid grid-cols-1 gap-10 sm:mt-6 lg:grid-cols-6 lg:grid-rows-1">
				<div class="relative lg:col-span-3 h-[480px]">
					<div
						class="absolute inset-0 rounded-lg gruvboxDark-bgH shadow-md shadow-gruvboxDark-red2 outline outline-gruvboxDark-red"
					></div>
					<div class="relative flex h-full flex-col overflow-hidden rounded-md">
						<div class="flex flex-col h-full">
							<div class="overflow-y-auto">
								<ul role="list" class="pl-3 pr-3">
									{#each tasks as task}
										<AdminRow {task} />
									{/each}
								</ul>
							</div>
						</div>
					</div>
					<div
						class="pointer-events-none absolute inset-0 rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
				</div>
				<div class="relative lg:col-span-3 h-[480px]">
					<div
						class="absolute inset-0 rounded-lg gruvboxDark-bgH shadow-md shadow-gruvboxDark-red2 outline outline-gruvboxDark-red"
					></div>
					<div class="relative flex h-full flex-col overflow-hidden rounded-md">
						<div class="flex flex-col h-full">
							<div class="overflow-y-auto">
								<ul role="list" class="pl-3 pr-3">
									<li class=" w-full bg-neutral-800 border border-gruvboxDark-blue rounded-md mt-2">
										<button
											on:click={() => alert('clicked')}
											class=" min-w-0 overflow-hidden w-full hover:bg-gruvboxDark-bgS"
										>
											<div class="flex gap-3 py-2 px-4 w-full justify-between">
												<div class="flex gap-3 w-full">
													<img
														class="h-16 w-16 flex-shrink-0 rounded-full bg-gray-50"
														alt=""
														src="screenshots/eric.jpg"
													/>
													<div class="min-w-0 flex flex-col place-items-start col-span-2">
														<p class="font-semibold text-gruvboxDark-blue truncate text-lg">
															TASK UPDATED
														</p>
														<p class="font-semibold text-gray-300 truncate text-sm">
															Shy Apply LLC
														</p>
														<p class="font-semibold text-gray-300 truncate text-sm">
															PB: Dylan Taylor
														</p>
													</div>
												</div>
												<div class="pr-2">
													<p class="text-sm font-semibold text-gray-300 truncate">#113456</p>
													<p class="text-sm font-semibold text-gray-300 truncate mt-7">10/30/24</p>
												</div>
											</div>
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div
						class="pointer-events-none absolute inset-0 rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
				</div>
				<!-- Repeat the same structure for the second column -->
			</div>
		</div>
	</div>
</div>
