<script lang="ts">
	import { enhance } from '$app/forms';
	import Dropdown from '$lib/components/dropdowns/candidates.svelte';
	import Skills from '$lib/components/skills/skills.svelte';
	import type { PageData } from './$types';
	import ProfileRow from '$lib/components/orders/profile_row.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data: PageData;

	interface Skill {
		text: string;
		color: string;
	}

	const colors: string[] = ['bg-teal-500', 'bg-orange-500', 'bg-rose-500', 'bg-purple-500'];
	let allskills: Skill[] = [];
	let colorIndex = 0;

	let skillsList: string[] = [];
	let formskills: string = '';

	// Makes ProfileRow reactive to changes in Supabase
	$: ({ orders } = data);
	
	let role = '';
	let numberOfCandidates: number = 1;

	// init here. value assigned on btn press
	let candidates_before_edit: number = 1;

	let onboarding = false;
	let order_id: number | null = null;

	let editing_row = false;
	let skillsModalFormAction = '?/submitorder';

	let user_email = data.user.email;
	let rank = data.rank;

	let invisible = false;
	let addRole = false;

	let edit_profile_invisible = false;
	let editProfile = false;
	let new_profile_name = data.user.user_metadata.display_name;

	if (new_profile_name === undefined) {
		new_profile_name = '';
		edit_profile_invisible = true;
		editProfile = true;
	}

	// order matching done by using uuid and id of row in orders table

	function handleSkillsList(event: CustomEvent<string[]>) {
		// Updates skillslist after adding or removing a skill
		skillsList = event.detail;
		formskills = JSON.stringify(skillsList);
		console.log('skillsList', skillsList);
		console.log('formskills', formskills);
	}

	function handleColorIndexUpdate(event: CustomEvent<number>) {
		colorIndex = event.detail;
		console.log(colorIndex);
	}

	function toggleSwitch() {
		onboarding = !onboarding;
		console.log(onboarding);
	}

	function resetSwitch() {
		invisible = !invisible;
		addRole = !addRole;
		role = '';
		numberOfCandidates = 1;
		onboarding = false;
		skillsList = [];
		allskills = [];
		skillsModalFormAction = '?/submitorder';
		editing_row = false;
	}

	function resetProfileModal() {
		edit_profile_invisible = !edit_profile_invisible;
		editProfile = !editProfile;
	}

	function editOrderRow(index: number) {
		return () => {
			// Populate modal with row values. Change submit formaction to update
			let order = orders![index];
			order_id = order.id;
			colorIndex = 0;
			skillsModalFormAction = '?/editorder';
			// shows modal
			invisible = !invisible;
			addRole = !addRole;

			role = order.role;
			numberOfCandidates = order.candidates;
			candidates_before_edit = order.candidates;
			onboarding = order.onboarding;
			skillsList = order.skills;
			formskills = JSON.stringify(skillsList);

			const ALLSKILLS: Skill[] = skillsList.map((skill) => {
				const skillObject: Skill = {
					text: skill,
					color: colors[colorIndex]
				};

				// Increment colorIndex and wrap around if it exceeds colors array length
				colorIndex = (colorIndex + 1) % colors.length;
				console.log(colorIndex);

				return skillObject;
			});
			allskills = ALLSKILLS;
			editing_row = true;
		};
	}

	onMount(() => {
		const url = new URL($page.url);
		const stripe_success = $page.url.searchParams.get('success');

		if (stripe_success) {
			alert('Payment Successful!\nYour order will be displayed on your Profile.');

			// Remove the 'success' parameter from the URL
			url.searchParams.delete('success');
			window.history.replaceState({}, '', url);
		}
	});
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
						{#if data.user.user_metadata.display_name}
							<p class="text-xl font-bold text-gray-900 sm:text-2xl">
								{data.user.user_metadata.display_name}
							</p>
						{:else}
							<p class="text-xl font-bold text-gray-900 sm:text-2xl">{user_email}</p>
						{/if}
						{#if rank === "owner"}
							<p class="text-sm font-medium text-gray-600">Owner</p>
						{:else if rank === "admin"}
							<p class="text-sm font-medium text-gray-600">Administrator</p>
						{:else}
							<p class="text-sm font-medium text-gray-600">Hiring Manager</p>
						{/if}
					</div>
				</div>
				{#if rank === "owner" || "admin"}
					<a
						href="/company"
						class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>View Company</a
					>
				{/if}
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
							{#if orders}
								{#each orders as order, index (order.id)}
									<ProfileRow
										{index}
										id={order.id}
										role={order.role}
										candidates={order.candidates}
										skills={order.skills}
										status={order.status}
										command={editOrderRow(index)}
									/>
								{/each}
							{/if}
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
										resetSwitch();
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
							<form
								class="p-4 md:p-5 flex flex-col"
								method="POST"
								action={skillsModalFormAction}
								use:enhance
								on:submit={resetSwitch}
							>
								<div class="gap-4 mb-4">
									<div class="">
										<label
											for="role"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>Role</label
										>
										<input
											type="text"
											name="role"
											id="role"
											required
											bind:value={role}
											class="border border-gray-300 text-gray-900 dark:text-white bg-gray-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder="Position at the Company"
										/>
									</div>
								</div>
								<div class="gap-4 mb-4">
									<div class="grid grid-cols-3">
										<div>
											<label
												for="candidates"
												class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>Candidates</label
											>
											{#if editing_row}
												<Dropdown bind:value={numberOfCandidates} start={candidates_before_edit} />
											{:else}
												<Dropdown bind:value={numberOfCandidates} />
											{/if}
										</div>
										<fieldset class="col-span-2">
											<legend class="sr-only">Preliminary Meeting</legend>
											<div class="">
												<div class="relative flex items-start">
													<div class="flex items-center">
														<button
															type="button"
															class="mt-5 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
															class:bg-blue-700={onboarding}
															class:dark:bg-gray-600={!onboarding}
															class:bg-gray-50={!onboarding}
															role="switch"
															aria-checked={onboarding}
															aria-labelledby="Preliminary Meeting?"
															on:click={toggleSwitch}
														>
															<span
																aria-hidden="true"
																class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
																class:translate-x-5={onboarding}
																class:translate-x-0={!onboarding}
															></span>
														</button>
														<input
															class="invisible hidden"
															type="checkbox"
															name="onboarding"
															id="onboarding"
															bind:checked={onboarding}
														/>
														<div class="flex flex-col" id="annual-billing-label">
															<span class="ml-3 text-sm font-semibold text-gray-900 dark:text-white"
																>Preliminary Meeting</span
															>
															<span class="mt-1 ml-3 text-sm text-gray-900 dark:text-gray-400"
																>Optional meeting to discuss requirements.</span
															>
														</div>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
									<div class="mt-5">
										<Skills
											on:skillslist={handleSkillsList}
											{allskills}
											initialColorIndex={colorIndex}
											on:colorIndexUpdate={handleColorIndexUpdate}
										/>
										<!-- required might not be doing anything. if break, remove -->
										<input
											class="invisible hidden"
											required
											type="text"
											name="skills"
											id="skills"
											bind:value={formskills}
										/>
									</div>
								</div>
								{#if editing_row}
									<input
										class="invisible hidden"
										type="text"
										id="order_id"
										name="order_id"
										bind:value={order_id}
									/>
									<input
										class="invisible hidden"
										type="text"
										id="candidates_before_edit"
										name="candidates_before_edit"
										bind:value={candidates_before_edit}
									/>
								{/if}
								<button
									type="submit"
									class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-end disabled:bg-gray-600 disabled:hover:bg-gray-600"
									disabled={skillsList.length < 1}
								>
									{#if editing_row}
										{candidates_before_edit != numberOfCandidates
											? 'Continue to Payment'
											: 'Finish Editing'}
									{:else}
										Continue to Payment
									{/if}
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

<div class="fixed z-50" class:invisible={!edit_profile_invisible}>
	<div class="grid h-screen place-items-center">
		<div
			id="profile-crud-modal"
			tabindex="-1"
			aria-hidden="true"
			class="fixed grid h-screen place-items-center overflow-y-auto overflow-x-auto m-auto md:inset-0 w-screen bg-slate-950/50"
		>
			<div class="relative w-full max-w-md max-h-full">
				{#if editProfile}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div
							class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
						>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
								Complete your profile
							</h3>
						</div>
						<form method="POST" action="?/updateUser" use:enhance on:submit={resetProfileModal}>
							<div class="space-y-12">
								<div class="border-b border-gray-900/10 pb-6 p-5">
									<p class="mt-1 text-sm leading-6 text-white">
										This information will be displayed on your profile as well as in the company
										backend.
									</p>

									<div class="col-span-full mt-5">
										<label for="logo" class="block text-sm font-medium leading-6 text-white"
											>Logo (Optional)</label
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
													for="new_profile_name"
													class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
													>Full Name</label
												>
												<input
													type="text"
													name="new_profile_name"
													id="new_profile_name"
													required
													autocomplete="off"
													bind:value={new_profile_name}
													class="border border-gray-300 text-gray-900 dark:text-white bg-gray-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
													placeholder="Ex: Jon Doe"
												/>
											</div>
										</div>
									</div>
									<div class="mt-6 flex justify-end">
										<button
											type="submit"
											class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Complete Profile
										</button>
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
