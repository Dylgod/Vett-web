<script lang="ts">
	import ProfileRow from '$lib/components/orders/profile_row.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let orderList = data.orders;
	let invisible = false;
	let addAdmin = false;
</script>

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<h2 class="sr-only" id="profile-overview-title">Company Dashboard</h2>
		<div class="bg-white p-6">
			<div class="sm:flex sm:items-center sm:justify-between">
				<div class="sm:flex sm:space-x-5">
					<div class="flex-shrink-0">
						<img
							class="mx-auto h-20 w-20 rounded-full"
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
						<p class="text-sm font-medium text-gray-600">Company Dashboard</p>
						<p class="mt-2 text-xl font-bold text-gray-900 sm:text-3xl">{data.Company_name}</p>
					</div>
				</div>
				<a
					href="/edit_company"
					class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>Edit Company</a
				>
			</div>
		</div>
	</div>
	<div class="px-4 sm:px-6 lg:px-4">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="mt-8 text-2xl font-semibold leading-6 text-gray-900">Active Orders</h1>
				<p class="mt-2 text-sm font-medium text-gray-600">
					Your company's active orders are listed below.<br>If you have any questions relating to the status of an on-going order, feel free to contact support <a class="text-blue-600 font-bold" href="/support">Here</a>
				</p>
			</div>
		</div>
		{#if orderList}
			{#if orderList.length < 0}
				<div class="mt-8 flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
											>Role</th
										>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>Candidates</th
										>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Skills</th
										>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th
										>
										<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200">
									{#each orderList as order}
										<ProfileRow
											role={order.role}
											candidates={order.candidates}
											skills={order.skills}
											status={order.status}
										/>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{:else}
			<button type="button" class="mt-5 p-5 relative w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
				<span class="text-sm font-semibold text-gray-900">No Active Orders</span>
			  </button>			  
			{/if}
		{/if}
	</div>
</div>

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 sm:items-center flex-col">
	<div class="sm:flex sm:items-center px-4 sm:px-6 lg:px-4 py-14">
		<div class="sm:flex-auto border-t">
			<h1 class="mt-8 text-2xl font-semibold leading-6 text-gray-900">Manage Staff</h1>
			<p class="mt-2 text-sm font-medium text-gray-600">
				Here you can manage Administrators and Users. <br />You may have an unlimited amount of
				both, but there can be only one Owner(You).
			</p>
		</div>
	</div>
	<div class="mx-auto max-w-2xl lg:max-w-7xl bg-white">
		<div class="">
			<div class="bg-white">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<!-- First Column -->
					<div class="bg-white p-4">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-base font-semibold leading-6 text-gray-900">Administrators</h3>
								<p class="mt-1 text-sm text-gray-500">
									Can create and remove Users. <br />Only the Owner may remove admins.
								</p>
							</div>
							<div class="flex-shrink-0">
								<button
									data-modal-target="crud-modal"
									data-modal-toggle="crud-modal"
									id="modaltoggle"
									name="modaltoggle"
									on:click={() => {
										invisible = !invisible;
										addAdmin = !addAdmin;
									}}
									type="button"
									class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>+ Add Admin</button
								>
							</div>
						</div>
					</div>

					<!-- Second Column (Duplicate) -->
					<div class="bg-white p-4">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-base font-semibold leading-6 text-gray-900">Users</h3>
								<p class="mt-1 text-sm text-gray-500">
									Basic purchasing permissions.<br />
								</p>
							</div>
							<div class="flex-shrink-0">
								<button
									data-modal-target="crud-modal"
									data-modal-toggle="crud-modal"
									id="modaltoggle"
									name="modaltoggle"
									on:click={() => (invisible = !invisible)}
									type="button"
									class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>+ Add User</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:grid-rows-1">
			<div class="relative lg:col-span-3 h-[480px] mb-10">
				<div
					class="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] border"
				></div>
				<div
					class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
				>
					<div class="p-6 flex flex-col h-full">
						<div class="overflow-y-auto flex-grow pr-2">
							<ul role="list" class="divide-y divide-gray-100">
								<li class="flex justify-between py-5">
									<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
										<img
											class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
											src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
										<div class="min-w-0 flex-auto">
											<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
												<a href="/company" class="hover:underline">Leslie Alexander</a>
											</p>
											<p class="mt-1 text-xs leading-5 text-gray-500 truncate">
												<a href="mailto:leslie.alexander@example.com" class="hover:underline"
													>leslie.alexander@example.com</a
												>
											</p>
										</div>
									</div>
									<div class="flex shrink-0 items-center gap-x-4 ml-4">
										<div class="hidden sm:flex sm:flex-col sm:items-end">
											<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">
												Co-Founder / CEO
											</p>
											<p class="mt-1 text-xs leading-5 text-gray-500 whitespace-nowrap">
												Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
											</p>
										</div>
										<div class="relative flex-none">
											<button
												type="button"
												class="block p-2 text-gray-500 hover:text-gray-900"
												id="options-menu-0-button"
												aria-expanded="false"
												aria-haspopup="true"
											>
												<span class="sr-only">Open options</span>
												<svg
													class="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
													/>
												</svg>
											</button>

											<div
												class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="options-menu-0-button"
												tabindex="-1"
											>
												<a
													href="/company"
													class="block px-3 py-1 text-sm leading-6 text-gray-900"
													role="menuitem"
													tabindex="-1"
													id="options-menu-0-item-0"
													>Demote User<span class="sr-only">, Leslie Alexander</span></a
												>
												<a
													href="/company"
													class="block px-3 py-1 text-sm leading-6 text-gray-900"
													role="menuitem"
													tabindex="-1"
													id="options-menu-0-item-1"
													>Remove<span class="sr-only">, Leslie Alexander</span></a
												>
											</div>
										</div>
									</div>
								</li>
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
					class="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tr-[2rem] border"
				></div>
				<div
					class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tr-[calc(2rem+1px)]"
				>
					<div class="p-6 flex flex-col h-full">
						<div class="overflow-y-auto flex-grow pr-2">
							<ul role="list" class="divide-y divide-gray-100">
								<li class="flex justify-between py-5">
									<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
										<img
											class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
											src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
										<div class="min-w-0 flex-auto">
											<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
												<a href="/company" class="hover:underline">Leslie Alexander</a>
											</p>
											<p class="mt-1 text-xs leading-5 text-gray-500 truncate">
												<a href="mailto:leslie.alexander@example.com" class="hover:underline"
													>leslie.alexander@example.com</a
												>
											</p>
										</div>
									</div>
									<div class="flex shrink-0 items-center gap-x-4 ml-4">
										<div class="hidden sm:flex sm:flex-col sm:items-end">
											<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">
												Co-Founder / CEO
											</p>
											<p class="mt-1 text-xs leading-5 text-gray-500 whitespace-nowrap">
												Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
											</p>
										</div>
										<div class="relative flex-none">
											<button
												type="button"
												class="block p-2 text-gray-500 hover:text-gray-900"
												id="options-menu-0-button"
												aria-expanded="false"
												aria-haspopup="true"
											>
												<span class="sr-only">Open options</span>
												<svg
													class="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
													/>
												</svg>
											</button>

											<div
												class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="options-menu-0-button"
												tabindex="-1"
											>
												<a
													href="/company"
													class="block px-3 py-1 text-sm leading-6 text-gray-900"
													role="menuitem"
													tabindex="-1"
													id="options-menu-0-item-0"
													>Promote User<span class="sr-only">, Leslie Alexander</span></a
												>
												<a
													href="/company"
													class="block px-3 py-1 text-sm leading-6 text-gray-900"
													role="menuitem"
													tabindex="-1"
													id="options-menu-0-item-1"
													>Remove<span class="sr-only">, Leslie Alexander</span></a
												>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					class="pointer-events-none absolute inset-0 rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tr-[2rem]"
				></div>
			</div>
			<!-- Repeat the same structure for the second column -->
		</div>
	</div>
</div>
