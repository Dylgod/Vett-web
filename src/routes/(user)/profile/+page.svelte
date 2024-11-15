<script lang="ts">
	import { enhance } from '$app/forms';
	import Dropdown from '$lib/components/dropdowns/candidates.svelte';
	import Skills from '$lib/components/skills/skills.svelte';
	import ImageCropper from '$lib/components/images/image_cropper.svelte';
	import EmailInputs from '$lib/components/inputs/candidate_emails.svelte';
	import type { PageData } from './$types';
	import ProfileRow from '$lib/components/orders/profile_row.svelte';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto, replaceState } from '$app/navigation';

	export let data: PageData;

	interface Skill {
		text: string;
		color: string;
	}

	const colors: string[] = ['bg-teal-500', 'bg-orange-500', 'bg-rose-500', 'bg-purple-500'];
	let allskills: Skill[] = [];
	let colorIndex = 0;

	let currentStep = 1;
	let skillsList: string[] = [];
	let formskills: string = '';

	// Makes ProfileRow reactive to changes in Supabase
	$: ({ orders } = data);
	$: ({ profileImage } = data);

	let isFormValid = false;
	let showNotification = false;
	let notificationText: string = `Payment Successful!<br />Your order will be displayed on your Profile.`;

	let candidateEmails: string[] = [];
	let formemails: string = '';

	let default_profile_img = 'screenshots/vett-default.webp';

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
	let old_profile_name = data.user.user_metadata.display_name;

	if (new_profile_name === undefined) {
		new_profile_name = '';
		edit_profile_invisible = true;
		editProfile = true;
	}

	function handleEmailsChange(event: CustomEvent<string[]>) {
		candidateEmails = event.detail;

		if (editing_row && order_id) {
			const currentOrder = orders?.find((o) => o.id === order_id);
			if (currentOrder?.emails) {
				try {
					const existingEmailData = JSON.parse(currentOrder.emails as string);
					const emailMap = new Map(
						Array.isArray(existingEmailData[0])
							? existingEmailData
							: existingEmailData.map((email: string) => [email, false])
					);

					// Create new array maintaining existing statuses and setting false for new emails
					const emailTuples = candidateEmails.map((email) => [
						email,
						emailMap.has(email) ? emailMap.get(email) : false
					]);

					formemails = JSON.stringify(emailTuples);
				} catch (e) {
					console.error('Error processing emails:', e);
					// Fallback to all false if there's an error
					formemails = JSON.stringify(candidateEmails.map((email) => [email, false]));
				}
			} else {
				// No existing emails, set all to false
				formemails = JSON.stringify(candidateEmails.map((email) => [email, false]));
			}
		} else {
			// New order, set all to false
			formemails = JSON.stringify(candidateEmails.map((email) => [email, false]));
		}
	}

	function handleSkillsList(event: CustomEvent<string[]>) {
		skillsList = event.detail;
		formskills = JSON.stringify(skillsList);
	}

	function handleColorIndexUpdate(event: CustomEvent<number>) {
		colorIndex = event.detail;
	}

	function handleNextStep() {
		if (currentStep === 1 && !role.trim()) {
			return;
		}
		if (currentStep === 2 && skillsList.length === 0) {
			return;
		}
		if (currentStep === 3 && candidateEmails.length !== numberOfCandidates) {
			return;
		}
		currentStep++;
	}

	function toggleSwitch() {
		onboarding = !onboarding;
	}

	const bg_colors: string[] = [
		'bg-red-200',
		'bg-blue-200',
		'bg-purple-300',
		'bg-green-100',
		'bg-pink-200',
		'bg-yellow-100'
	];

	const ring_colors: string[] = [
		'ring-red-300',
		'ring-blue-300',
		'ring-purple-300',
		'ring-green-400',
		'ring-pink-300',
		'ring-yellow-400'
	];

	function getNextColor(): string[] {
		const bg = bg_colors[colorIndex];
		const ring = ring_colors[colorIndex];
		colorIndex = (colorIndex + 1) % bg_colors.length;
		return [bg, ring];
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
		currentStep = 1;
		candidateEmails = [];
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
			// candidateEmails = order.emails
			// 	? JSON.parse(order.emails as string).map(([email]: [string, boolean | 'fail']) => email)
			// 	: [];
			// formemails = JSON.stringify(candidateEmails);

			const ALLSKILLS: Skill[] = skillsList.map((skill) => {
				const skillObject: Skill = {
					text: skill,
					color: colors[colorIndex]
				};

				colorIndex = (colorIndex + 1) % colors.length;

				return skillObject;
			});
			allskills = ALLSKILLS;

			try {
				const existingEmails = order.emails ? JSON.parse(order.emails as string) : [];
				// If emails are already in tuple format, use them directly
				if (
					Array.isArray(existingEmails) &&
					existingEmails.length > 0 &&
					Array.isArray(existingEmails[0])
				) {
					candidateEmails = existingEmails.map(([email]) => email);
					formemails = JSON.stringify(existingEmails);
				} else {
					// If emails are in string format, convert to tuples with false
					candidateEmails = existingEmails;
					formemails = JSON.stringify(existingEmails.map((email: any) => [email, false]));
				}
			} catch (e) {
				console.error('Error parsing emails:', e);
				candidateEmails = [];
				formemails = '[]';
			}

			editing_row = true;
		};
	}

	let formElement: HTMLFormElement;

	async function handleCroppedImage(blob: Blob) {
		// Create a new file with the user's ID as the name
		const imageFile = new File([blob], `${data.user.id}.webp`, { type: 'image/webp' });

		// Find or create a hidden input for the image
		let imageInput = formElement.querySelector('input[name="image"]');
		console.log('imageInput', imageInput);

		// Create a DataTransfer object to set the file
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(imageFile);
		(imageInput as HTMLInputElement).files = dataTransfer.files;
	}

	function isValidEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	$: isFormValid =
		currentStep === 1
			? role.trim().length > 0
			: currentStep === 2
				? skillsList.length > 0
				: currentStep === 3
					? candidateEmails.length === numberOfCandidates &&
						candidateEmails.every((email) => isValidEmail(email))
					: true;

	$: if (currentStep === 2) {
		colorIndex = 0;
		const ALLSKILLS: Skill[] = skillsList.map((skill) => {
			const skillObject: Skill = {
				text: skill,
				color: colors[colorIndex]
			};

			// Increment colorIndex and wrap around if it exceeds colors array length
			colorIndex = (colorIndex + 1) % colors.length;

			return skillObject;
		});
		allskills = ALLSKILLS;
	}

	$: if (numberOfCandidates < candidateEmails.length) {
		candidateEmails = candidateEmails.slice(0, numberOfCandidates);
		formemails = JSON.stringify(candidateEmails);
	}

	const steps = [
		{ name: 'Role Details', number: 1 },
		{ name: 'Skills', number: 2 },
		{ name: 'Candidates', number: 3 },
		{ name: 'Review', number: 4 }
	];

	onMount(() => {
		if (!profileImage) {
			profileImage = default_profile_img;
		}

		const stripe_success = $page.url.searchParams.get('success');

		if (stripe_success) {
			showNotification = true;

			// Hide notification after 3 seconds
			setTimeout(() => {
				showNotification = false;
			}, 3000);

			// Remove the 'success' parameter from the URL
			const newUrl = $page.url.pathname; // Gets current path without query params
			goto(newUrl, { replaceState: true }); // Replace current URL without params
		}
	});
</script>

{#if showNotification}
	<div class="notification font-semibold">
		{@html notificationText}
	</div>
{/if}

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<h2 class="sr-only" id="profile-overview-title">User Dashboard</h2>
		<div class="bg-white p-6">
			<div class="sm:flex sm:items-center sm:justify-between">
				<div class="sm:flex sm:space-x-5">
					<div class="flex-shrink-0">
						<img
							class="mx-auto h-20 w-20 rounded-full outline outline-1 outline-slate-300"
							src={profileImage}
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
						{#if rank === 'owner'}
							<p class="text-sm font-medium text-gray-600">Owner</p>
						{:else if rank === 'admin'}
							<p class="text-sm font-medium text-gray-600">Administrator</p>
						{:else}
							<p class="text-sm font-medium text-gray-600">Hiring Manager</p>
						{/if}
					</div>
				</div>
				{#if rank !== 'user'}
					<div class="flex gap-2">
						<a
							href="/company"
							class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							>View Company</a
						>
						<button
							type="button"
							class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							on:click={() => {
								edit_profile_invisible = !edit_profile_invisible;
								editProfile = !editProfile;
							}}>Edit Profile</button
						>
					</div>
				{:else}
					<button
						type="button"
						class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						on:click={() => {
							edit_profile_invisible = !edit_profile_invisible;
							editProfile = !editProfile;
						}}>Edit Profile</button
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
				class="fixed grid h-screen place-items-center overflow-y-auto overflow-x-hidden m-auto md:inset-0 w-screen bg-slate-950/50"
			>
				<div class="relative p-4 w-full max-w-2xl max-h-full">
					{#if addRole}
						<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<!-- Modal Header -->
							<div
								class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
							>
								<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
									{editing_row ? 'Edit Role' : 'Add New Role'}
								</h3>
								<button
									type="button"
									class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									on:click={resetSwitch}
								>
									<X class="w-4 h-4" />
									<span class="sr-only">Close modal</span>
								</button>
							</div>

							<!-- Progress Steps -->
							<div class="px-6 py-4 border-b border-gray-200">
								<div class="flex justify-between">
									{#each steps as step, i}
										<div class="flex items-center">
											<div
												class="w-8 h-8 rounded-full flex items-center justify-center {currentStep >
												step.number
													? 'bg-blue-600 text-white'
													: currentStep === step.number
														? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
														: 'bg-gray-100 text-gray-600 font-semibold'}"
											>
												{step.number}
											</div>
											<span class="ml-2 text-sm font-medium text-gray-900 dark:text-white"
												>{step.name}</span
											>
											{#if i < steps.length - 1}
												<div class="w-12 h-0.5 mx-2 bg-gray-200" />
											{/if}
										</div>
									{/each}
								</div>
							</div>

							<!-- Form Content -->
							<form
								class="p-5 px-10"
								method="POST"
								action={skillsModalFormAction}
								use:enhance
								on:submit={resetSwitch}
							>
								<input type="hidden" name="candidates" value={numberOfCandidates} />
								<input type="hidden" name="role" value={role} />
								<input type="hidden" name="skills" value={formskills} />
								<input type="hidden" name="candidate_emails" value={formemails} />
								<input type="hidden" name="onboarding" value={onboarding.toString()} />
								{#if currentStep === 1}
									<!-- Role Details Step -->
									<div class="gap-4 mb-4">
										<div class="mb-4 mt-2">
											<label
												for="role"
												class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Role
											</label>
											<input
												type="text"
												name="role"
												id="role"
												required
												bind:value={role}
												class="border border-gray-300 text-gray-900 dark:text-white bg-gray-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
												placeholder="Position at the Company"
												on:input={(e) => (role = e.currentTarget.value.trim())}
											/>
										</div>
										<div class="grid grid-cols-3 pt-3">
											<div>
												<label
													for="candidates"
													class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Candidates
												</label>
												{#if editing_row}
													<Dropdown
														bind:value={numberOfCandidates}
														start={candidates_before_edit}
													/>
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
																<span
																	class="ml-3 text-sm font-semibold text-gray-900 dark:text-white"
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
									</div>
								{/if}
								{#if currentStep === 2}
									<!-- Skills Step -->
									<div class="gap-4 mb-4">
										<Skills
											on:skillslist={handleSkillsList}
											{allskills}
											initialColorIndex={colorIndex}
											on:colorIndexUpdate={handleColorIndexUpdate}
										/>
										<input
											class="invisible hidden"
											required
											type="text"
											name="skills"
											id="skills"
											bind:value={formskills}
										/>
									</div>
								{/if}
								{#if currentStep === 3}
									<EmailInputs
										{numberOfCandidates}
										bind:emailInputs={candidateEmails}
										on:change={handleEmailsChange}
									/>
								{/if}
								{#if currentStep === 4}
									<!-- Review Step -->
									<div class="space-y-4">
										<div class="border-b border-gray-200 pb-4">
											<h4 class="text-md font-medium text-white dark:text-white">Role Details</h4>
											<p class="mt-1 text-sm text-gray-200 dark:text-gray-200">{role}</p>
											<p class="mt-1 text-sm text-gray-200">Candidates: {numberOfCandidates}</p>
											<p class="mt-1 text-sm text-gray-200">
												Preliminary Meeting: {onboarding ? 'Yes' : 'No'}
											</p>
										</div>
										<div class="border-b border-gray-200 pb-4">
											<h4 class="text-md font-medium text-white">Skills</h4>
											<div class="mt-1 flex flex-wrap gap-2">
												{#each skillsList as skill}
													{@const [bg, ring] = getNextColor()}
													<span
														class="inline-flex items-center px-2 py-1 rounded-md {bg} {ring} text-gruvbox-fg0 text-sm font-semibold"
													>
														{skill}
													</span>
												{/each}
											</div>
										</div>
										<div>
											<h4 class="text-md font-medium text-white">Candidates</h4>
											<div class="mt-1 space-y-2">
												{#each candidateEmails as candidate}
													<div class="text-sm text-gray-200 dark:text-gray-200">
														{candidate}
													</div>
												{/each}
											</div>
										</div>
									</div>
								{/if}

								<!-- Hidden inputs for editing -->
								{#if editing_row}
									<input type="hidden" name="order_id" bind:value={order_id} />
									<input
										type="hidden"
										name="candidates_before_edit"
										bind:value={candidates_before_edit}
									/>
								{/if}

								<!-- Navigation Footer -->
								<div class="mt-6 flex justify-between">
									<button
										type="button"
										class="flex items-center px-4 py-2 text-sm font-medium text-white hover:text-gray-500 disabled:opacity-0 dark:text-white"
										on:click={() => currentStep--}
										disabled={currentStep === 1}
									>
										<ChevronLeft class="w-5 h-5 mr-1" />
										Back
									</button>

									{#if currentStep < 4}
										<button
											type="button"
											class="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
											on:click={handleNextStep}
											disabled={!isFormValid}
										>
											Next
											<ChevronRight class="w-5 h-5 ml-1" />
										</button>
									{:else}
										<button
											type="submit"
											class="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
											disabled={!isFormValid}
										>
											{editing_row && candidates_before_edit !== numberOfCandidates
												? 'Continue to Payment'
												: editing_row
													? 'Finish Editing'
													: 'Submit Order'}
										</button>
									{/if}
								</div>
							</form>
						</div>
					{/if}
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
							{#if new_profile_name !== undefined}
								<button
									type="button"
									class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="crud-modal"
									on:click={() => {
										edit_profile_invisible = !edit_profile_invisible;
										editProfile = !editProfile;
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
							{/if}
						</div>
						<form
							bind:this={formElement}
							method="POST"
							action="?/updateProfile"
							use:enhance
							on:submit={resetProfileModal}
							enctype="multipart/form-data"
						>
							<div class="space-y-12">
								<div class="border-b border-gray-900/10 pb-6 p-5">
									<p class="mt-1 text-sm leading-6 text-white">
										This information will be displayed on your profile as well as in the company
										backend.
									</p>

									<ImageCropper
										defaultImage={default_profile_img}
										currentImage={profileImage}
										onImageCropped={handleCroppedImage}
									/>
									<input type="file" name="image" id="image" style="display: none;" />

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
												<input
													type="text"
													name="old_profile_name"
													id="old_profile_name"
													autocomplete="off"
													bind:value={old_profile_name}
													class="invisible hidden"
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

<style>
	.notification {
		position: fixed;
		top: 8%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #4caf50;
		color: white;
		padding: 1rem 2rem;
		border-radius: 4px;
		text-align: center;
		z-index: 9999;
		animation: fadeInOut 3s linear 1 forwards;
		min-width: 200px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	/*  */

	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}
		5% {
			opacity: 1;
		}
		95% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
