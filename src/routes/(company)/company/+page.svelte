<script lang="ts">
	import ProfileRow from '$lib/components/orders/profile_row.svelte';
	import AdminUser from '$lib/components/employees/admin_user.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let orders = data.orders;
	let admins = data.admins;
	let invisible = false;
	let addAdmin = false;

	let edit_company_invisible = false;
	let editCompany = false;

	let new_company_name = data.Company_name;
	let new_company_owner = '';
	// let new_company_logo = ""; ???
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
				<button
					data-modal-target="company-crud-modal"
					data-modal-toggle="company-crud-modal"
					id="companymodaltoggle"
					name="companymodaltoggle"
					type="button"
					on:click={() => {
						edit_company_invisible = !edit_company_invisible;
						editCompany = !editCompany;
					}}
					class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>Edit Company</button
				>
			</div>
		</div>
	</div>
	<div class="px-4 sm:px-6 lg:px-4">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="mt-8 text-2xl font-semibold leading-6 text-gray-900">Active Orders</h1>
				<p class="mt-2 text-sm font-medium text-gray-600">
					Your company's active orders are listed below.<br />If you have any questions relating to
					the status of an on-going order, feel free to contact support
					<a class="text-blue-600 font-bold" href="/support">Here</a>
				</p>
			</div>
		</div>
		{#if orders}
			{#if orders.length > 0}
				<div class="mt-8 flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full table-fixed divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											class="w-1/5 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
											>Role</th
										>
										<th
											scope="col"
											class="w-1/7 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>Candidates</th
										>
										<th
											scope="col"
											class="w-1/2 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Skills</th
										>
										<th
											scope="col"
											class="w-24 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th
										>
										<th scope="col" class="w-20 relative py-3.5 pl-3 pr-4 sm:pr-0">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200">
									{#each orders as order, index (order.id)}
										<ProfileRow
											{index}
											id={order.id}
											role={order.role}
											candidates={order.candidates}
											skills={order.skills}
											status={order.status}
											command="hidden"
										/>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{:else}
				<button
					type="button"
					class="mt-5 p-5 relative w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
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
								<!-- {#each admins as admin, index (admin.id)}
								<AdminUser />
							{/each} -->
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

<div class="fixed z-50" class:invisible={!invisible}>
	<div class="grid h-screen place-items-center">
		<div
			id="crud-modal"
			tabindex="-1"
			aria-hidden="true"
			class="fixed grid h-screen place-items-center overflow-y-auto overflow-x-hidden m-auto md:inset-0 w-screen bg-slate-950/50"
		>
			<div class="relative p-4 w-full max-w-md max-h-full">
				{#if addAdmin}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div
							class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
						>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								Add New Administrator
							</h3>
							<button
								type="button"
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="crud-modal"
								on:click={() => {
									invisible = !invisible;
									addAdmin = !addAdmin;
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
										>Full Name</label
									>
									<input
										type="text"
										name="modalname"
										id="modalname"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Full Name"
									/>
									<label
										for="email"
										class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
										>Email</label
									>
									<input
										type="text"
										name="modalemail"
										id="modalemail"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Email Address"
									/>
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
				{:else}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div
							class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
						>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New User</h3>
							<button
								type="button"
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="crud-modal"
								on:click={() => (invisible = !invisible)}
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
										>Full Name</label
									>
									<input
										type="text"
										name="modalname"
										id="modalname"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Full Name"
									/>
									<label
										for="email"
										class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
										>Email</label
									>
									<input
										type="text"
										name="modalemail"
										id="modalemail"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Email Address"
									/>
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

<div class="fixed z-50" class:invisible={!edit_company_invisible}>
	<div class="grid h-screen place-items-center">
		<div
			id="company-crud-modal"
			tabindex="-1"
			aria-hidden="true"
			class="fixed grid h-screen place-items-center overflow-y-auto overflow-x-auto m-auto md:inset-0 w-screen bg-slate-950/50"
		>
			<div class="relative w-full max-w-md max-h-full">
				{#if editCompany}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div
							class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
						>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								Edit Company Profile
							</h3>
							<button
								type="button"
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="crud-modal"
								on:click={() => {
									edit_company_invisible = !edit_company_invisible;
									editCompany = !editCompany;
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
						<form>
							<div class="space-y-12">
								<div class="border-b border-gray-900/10 pb-12 p-5">
									<p class="mt-1 text-sm leading-6 text-white">
										This information will be displayed on your dashboard as well as in the email you
										send to your staff.
									</p>

									<div class="col-span-full mt-5">
										<label for="logo" class="block text-sm font-medium leading-6 text-white"
											>Logo</label
										>
										<div class="mt-2 flex items-center gap-x-3">
											<svg
												class="h-12 w-12 text-gray-300"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
													clip-rule="evenodd"
												/>
											</svg>
											<button
												type="button"
												class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												>Change</button
											>
										</div>
									</div>

									<div class="mt-6 flex gap-x-6 gap-y-2 flex-col">
										<div class="gap-4">
											<div class="">
												<label
													for="new_company_name"
													class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
													>Company Name</label
												>
												<input
													type="text"
													name="new_company_name"
													id="new_company_name"
													bind:value={new_company_name}
													class="border border-gray-300 text-gray-900 dark:text-white bg-gray-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
													placeholder="The Name of the Company"
												/>
											</div>
										</div>
										<label
											for="companyname"
											class="mt-6 mb-2 block text-sm font-medium leading-6 text-white"
											>Account Owner Email</label
										>
										<div class="">
											<div class="">
												<div class="relative">
													<button
														type="button"
														class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
														aria-haspopup="listbox"
														aria-expanded="true"
														aria-labelledby="listbox-label"
													>
														<span class="block truncate">Tom Cook</span>
														<span
															class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
														>
															<svg
																class="h-5 w-5 text-gray-400"
																viewBox="0 0 20 20"
																fill="currentColor"
																aria-hidden="true"
															>
																<path
																	fill-rule="evenodd"
																	d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
																	clip-rule="evenodd"
																/>
															</svg>
														</span>
													</button>

													<!--
														Select popover, show/hide based on select state.
												  
														Entering: ""
														  From: ""
														  To: ""
														Leaving: "transition ease-in duration-100"
														  From: "opacity-100"
														  To: "opacity-0"
													  -->
													<ul
														class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
														tabindex="-1"
														role="listbox"
														aria-labelledby="listbox-label"
														aria-activedescendant="listbox-option-3"
													>
														<!--
														  Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
												  
														  Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
														-->
														<!-- role="option" -->
														<li
															class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
															id="listbox-option-0"
														>
															<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
															<span class="block truncate font-normal">Wade Cooper</span>

															<!--
															Checkmark, only display for selected option.
												  
															Highlighted: "text-white", Not Highlighted: "text-indigo-600"
														  -->
															<span
																class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
															>
																<svg
																	class="h-5 w-5"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																	aria-hidden="true"
																>
																	<path
																		fill-rule="evenodd"
																		d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
																		clip-rule="evenodd"
																	/>
																</svg>
															</span>
														</li>
														<!-- More items... -->
													</ul>
												</div>
												<div class="mt-3 flex items-center justify-end gap-x-6">
													<button
														type="button"
														class="text-sm font-semibold leading-6 text-gray-900">Cancel</button
													>
													<button
														type="submit"
														class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
														>Save</button
													>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
						<!-- Modal body -->
					</div>
				{/if}
				<!-- Modal content -->
			</div>
		</div>
	</div>
</div>
