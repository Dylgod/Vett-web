<script lang="ts">
	import Dropdown from '$lib/components/dropdowns/candidates.svelte';

	export let data;
	let invisible = false;
	let addRole = false;
</script>

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<h2 class="sr-only" id="profile-overview-title">User Dashboard</h2>
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
						<p class="text-sm font-medium text-gray-600">Welcome back,</p>
						<p class="text-xl font-bold text-gray-900 sm:text-2xl">{data.user.email}</p>
						<p class="text-sm font-medium text-gray-600">Product Designer</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="mt-8 text-2xl font-semibold leading-6 text-gray-900">Dashboard</h1>
			</div>
		</div>
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
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Candidates</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Skills</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Status</th
								>
								<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							<tr>
								<td
									class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
									>React Developer</td
								>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">4</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
									>React, Backend, JavaScript</td
								>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Pending</td>
								<td
									class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
								>
									<a href="/profile" class="text-indigo-600 hover:text-indigo-900"
										>Edit<span class="sr-only">Edit row</span></a
									>
								</td>
							</tr>

							<!-- More people... -->
						</tbody>
					</table>
					<button
						data-modal-target="crud-modal"
						data-modal-toggle="crud-modal"
						id="modaltoggle"
						name="modaltoggle"
						on:click={() => {
							invisible = !invisible;
							addRole = !addRole;
						}}
						type="button"
						class="w-full flex justify-center rounded-lg h-fit border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						<span
							class=" flex text-sm font-semibold text-gray-900 justify-center justify-items-center place-items-center gap-2"
							>Create a new role
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Main modal -->
	<div class="fixed z-50" class:invisible={!invisible}>
		<div class="grid h-screen place-items-center">
			<div
				id="crud-modal"
				tabindex="-1"
				aria-hidden="true"
				class="fixed grid h-screen place-items-center overflow-y-auto overflow-x-hidden m-auto md:inset-0 w-screen bg-slate-950/50"
			>
				<div class="relative p-4 w-full max-w-md max-h-full">
					{#if addRole}
						<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<!-- Modal header -->
							<div
								class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
							>
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New Role</h3>
								<button
									type="button"
									class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="crud-modal"
									on:click={() => {
										invisible = !invisible;
										addRole = !addRole;
									}}
								>
									<svg
										class="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span class="sr-only">Close modal</span>
								</button>
							</div>
							<!-- Modal body -->
							<form class="p-4 md:p-5 flex flex-col">
								<div class="gap-4 mb-4">
									<div class="">
										<label
											for="name"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>Role</label
										>
										<input
											type="text"
											name="role"
											id="role"
											class="border bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder="Position at the Company"
										/>
									</div>
								</div>
								<div class="gap-4 mb-4">
									<div class="">
										<label
											for="name"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>Candidates</label
										>
										<Dropdown />
									</div>
								</div>
								<button
									type="submit"
									class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end"
								>
									<svg
										class="me-1 -ms-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
											clip-rule="evenodd"
										></path></svg
									>
									Send Invite
								</button>
							</form>
						</div>
					{/if}
					<!-- Modal content -->
				</div>
			</div>
		</div>
	</div>
</div>
