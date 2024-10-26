<script lang="ts">
	import ProfileRow from '$lib/components/orders/profile_row.svelte';
	import AdminRow from '$lib/components/employees/admin_user_row.svelte';
	import NewOwner from '$lib/components/dropdowns/new_owner.svelte';
	import UserRow from '$lib/components/employees/user_row.svelte';
	import ImageCropper from '$lib/components/images/image_cropper.svelte';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let data: PageData;
	let orders = data.orders;
	let invisible = false;
	let addAdmin = false;
	let showNotification = false;
	let rank_of_user = data.rank;

	$: ({ Company_logo } = data);

	let default_company_img = 'screenshots/vett-default.webp';
	let current_image = data.Company_logo;

	let adminsStore = writable(data.admins);
	let usersStore = writable(data.users);
	let ownerStore = writable(data.owner);
	let staffStore = writable(data.staff);

	let edit_company_invisible = false;
	let editCompany = false;

	let company_owner_uuid = data.owner.uuid;
	let current_user = data.user.id;
	let new_company_owner_uuid = data.owner.uuid; // initialized to prevent NaN on form submit without touching the field
	let new_company_name = data.Company_name;
	let old_company_name = data.Company_name;

	// let new_company_logo = ""; ???

	async function handleDemote(
		event: CustomEvent<{
			uuid: string;
			index: number;
			name: string;
			email: string;
			logo: string | null | undefined;
		}>
	) {
		const { uuid, index, name, email, logo } = event.detail;
		try {
			const response = await fetch('/api/demote_admin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ uuid })
			});
			const result = await response.json();
			if (result.success) {
				console.log(`Demoted admin at index ${index}`);
				adminsStore.update((admins) => admins.filter((admin) => admin.uuid !== uuid));
				usersStore.update((users) => [
					...users,
					{ uuid, name, email, type: 'User', isowner: false, logo }
				]);
				console.log('DEMOTING', { uuid, name, email, type: 'Administrator', isowner: false, logo });
				staffStore.update((staff) => staff.filter((admin) => admin.uuid !== uuid));
			} else {
				console.error('Failed to demote admin:', result.error);
			}
		} catch (error) {
			console.error('Error demoting admin:', error);
		}
	}

	async function handlePromote(
		event: CustomEvent<{
			uuid: string;
			index: number;
			name: string;
			email: string;
			logo: string | null | undefined;
		}>
	) {
		const { uuid, index, name, email, logo } = event.detail;
		try {
			const response = await fetch('/api/promote_user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ uuid })
			});
			const result = await response.json();
			if (result.success) {
				console.log(`Promoted user at index ${index}`);
				usersStore.update((users) => users.filter((user) => user.uuid !== uuid));
				adminsStore.update((admins) => [
					...admins,
					{ uuid, name, email, type: 'Administrator', isowner: false, logo }
				]);
				console.log('PROMOTING', {
					uuid,
					name,
					email,
					type: 'Administrator',
					isowner: false,
					logo
				});
				staffStore.update((admins) => [
					...admins,
					{ uuid, name, email, type: 'Administrator', isowner: false, logo }
				]);
			} else {
				console.error('Failed to promote user:', result.error);
			}
		} catch (error) {
			console.error('Error promoting user:', error);
		}
	}

	let formElement: HTMLFormElement;

	async function handleCroppedImage(blob: Blob) {
		// Create a new file with the user's ID as the name
		const imageFile = new File([blob], `${data.Company_id}.webp`, { type: 'image/webp' });

		// Find or create a hidden input for the image
		let imageInput = formElement.querySelector('input[name="companyimage"]');
		console.log('imageInput', imageInput);

		// Create a DataTransfer object to set the file
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(imageFile);
		(imageInput as HTMLInputElement).files = dataTransfer.files;
	}

	function handleDelete(event: CustomEvent<{ index: number }>) {
		const { index } = event.detail;
		// Your delete logic here
		console.log(`Deleting at index ${index}`);
	}

	function handleNewOwner(event: CustomEvent<{ uuid: string }>) {
		const { uuid } = event.detail;
		new_company_owner_uuid = uuid;
	}

	function resetSwitch() {
		edit_company_invisible = !edit_company_invisible;
		editCompany = !editCompany;
	}

	function resetAddAdmin() {
		invisible = !invisible;
		addAdmin = !addAdmin;
		showNotification = true;

		// Hide notification after 3 seconds
		setTimeout(() => {
			showNotification = false;
		}, 3000);
	}

	function resetAddUser() {
		invisible = !invisible;
		showNotification = true;

		// Hide notification after 3 seconds
		setTimeout(() => {
			showNotification = false;
		}, 3000);
	}

	onMount(() => {
		if (!Company_logo) {
			Company_logo = default_company_img;
		}
	});
</script>

{#if showNotification}
	<div class="notification font-semibold">Invite Sent!</div>
{/if}

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<h2 class="sr-only" id="profile-overview-title">Company Dashboard</h2>
		<div class="bg-white p-6">
			<div class="sm:flex sm:items-center sm:justify-between">
				<div class="sm:flex sm:space-x-5">
					<div class="flex-shrink-0">
						<img
							class="mx-auto h-20 w-20 rounded-full outline outline-1 outline-slate-300"
							src={Company_logo}
							alt=""
						/>
					</div>
					<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
						<p class="text-sm font-medium text-gray-600">Company Dashboard</p>
						{#if data.Company_name}
							<p class="mt-2 text-xl font-bold text-gray-900 sm:text-3xl">{data.Company_name}</p>
						{:else}
							<p class="mt-2 text-xl font-bold text-gray-900 sm:text-3xl">My Company</p>
						{/if}
					</div>
				</div>
				<button
					data-modal-target="company-crud-modal"
					data-modal-toggle="company-crud-modal"
					id="companymodaltoggle"
					name="companymodaltoggle"
					type="button"
					on:click={() => {
						if (company_owner_uuid === current_user) {
							edit_company_invisible = !edit_company_invisible;
							editCompany = !editCompany;
						}
					}}
					class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-default"
					class:hover:bg-gray-50={company_owner_uuid === current_user}
					class:cursor-pointer={company_owner_uuid === current_user}>Edit Company</button
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
											class="w-1/2 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>Skills</th
										>
										<th
											scope="col"
											class="w-24 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>Status</th
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
					class="mt-5 p-5 relative w-full rounded-lg border-2 border-dashed border-gray-300 text-center cursor-default focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
				both, but there can be only one Owner.
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
										if (rank_of_user === 'owner') {
											invisible = !invisible;
											addAdmin = !addAdmin;
										}
									}}
									type="button"
									class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									class:hover:bg-gray-400={rank_of_user !== 'owner'}
									class:bg-gray-400={rank_of_user !== 'owner'}
									class:focus-visible:outline-indigo-400={rank_of_user !== 'owner'}
									class:cursor-default={rank_of_user !== 'owner'}>+ Add Admin</button
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
									on:click={() => {
										if (rank_of_user !== 'user') {
											invisible = !invisible;
										}
									}}
									type="button"
									class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									class:hover:bg-gray-400={rank_of_user === 'user'}
									class:bg-gray-400={rank_of_user === 'user'}
									class:focus-visible:outline-indigo-400={rank_of_user === 'user'}
									class:cursor-default={rank_of_user === 'user'}>+ Add User</button
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
					<div class="px-6 py-2 flex flex-col h-full">
						<div class="overflow-y-auto flex-grow pr-2">
							<ul class="divide-y divide-gray-100">
								<AdminRow
									index={0}
									name={$ownerStore.name}
									email={$ownerStore.email}
									rank={$ownerStore.type}
									uuid={$ownerStore.uuid}
									isowner={$ownerStore.isowner}
									logo={$ownerStore.logo}
									rank_of_user={'disabled'}
								/>
								{#each $adminsStore as admin, index (admin.uuid)}
									<AdminRow
										{index}
										name={admin.name}
										email={admin.email}
										rank={admin.type}
										uuid={admin.uuid}
										isowner={admin.isowner}
										logo={admin.logo}
										{rank_of_user}
										on:demote={handleDemote}
										on:delete={handleDelete}
									/>
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
					class="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tr-[2rem] border"
				></div>
				<div
					class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tr-[calc(2rem+1px)]"
				>
					<div class="px-6 py-2 flex flex-col h-full">
						<div class="overflow-y-auto flex-grow pr-2">
							<ul role="list" class="divide-y divide-gray-100">
								{#each $usersStore as user, index (user.uuid)}
									<UserRow
										{index}
										name={user.name}
										email={user.email}
										rank={user.type}
										uuid={user.uuid}
										logo={user.logo}
										{rank_of_user}
										on:promote={handlePromote}
										on:delete={handleDelete}
									/>
								{/each}
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
						<form
							class="p-4 md:p-5 flex flex-col"
							method="POST"
							action="?/addAdmin"
							use:enhance
							on:submit={resetAddAdmin}
						>
							<div class="gap-4 mb-4">
								<div class="">
									<label
										for="new_admin_name"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Full Name</label
									>
									<input
										type="text"
										name="new_admin_name"
										id="new_admin_name"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Full Name"
									/>
									<label
										for="new_admin_email"
										class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
										>Email</label
									>
									<input
										type="text"
										name="new_admin_email"
										id="new_admin_email"
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
						<form
							class="p-4 md:p-5 flex flex-col"
							method="POST"
							action="?/addUser"
							use:enhance
							on:submit={resetAddUser}
						>
							<div class="gap-4 mb-4">
								<div class="">
									<label
										for="new_user_name"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>Full Name</label
									>
									<input
										type="text"
										name="new_user_name"
										id="new_user_name"
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Full Name"
									/>
									<label
										for="new_user_email"
										class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
										>Email</label
									>
									<input
										type="text"
										name="new_user_email"
										id="new_user_email"
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
			<div class="relative w-1/3 p-8 max-h-full">
				{#if editCompany}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<!-- Modal header -->
						<div
							class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
						>
							<h3 class="pl-5 text-lg font-semibold text-gray-900 dark:text-white">
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
						<form
							bind:this={formElement}
							method="POST"
							action="?/editcompany"
							use:enhance
							on:submit={resetSwitch}
							enctype="multipart/form-data"
						>
							<div class="space-y-12">
								<div class="border-b border-gray-900/10 pb-6 p-5 pl-10">
									<p class="mt-1 text-sm leading-6 text-white w-11/12">
										This information will be displayed on your dashboard as well as in the email you
										send to your staff.
									</p>

									<ImageCropper
										defaultImage={default_company_img}
										currentImage={Company_logo}
										onImageCropped={handleCroppedImage}
									/>
									<input type="file" name="companyimage" id="companyimage" style="display: none;" />

									<div class="mt-8 flex gap-x-6 gap-y-2 flex-col">
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
													class="border border-gray-300 text-gray-900 dark:text-white bg-gray-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-60 p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
													placeholder="The Name of the Company"
												/>
												<input
													type="text"
													name="old_company_name"
													id="old_company_name"
													autocomplete="off"
													bind:value={old_company_name}
													class="invisible hidden"
												/>
											</div>
										</div>
										<label
											for="new_company_owner"
											class="block mt-8 text-sm font-medium text-gray-900 dark:text-white"
											>Company Owner</label
										>
										<NewOwner people={$staffStore} on:change={handleNewOwner} />
										<input
											type="text"
											name="new_company_owner"
											id="new_company_owner"
											bind:value={new_company_owner_uuid}
											class="invisible hidden"
											placeholder="The Owner of the Company"
										/>
										<div class="mt-8 flex items-center justify-end gap-x-6 pr-5">
											<button
												type="submit"
												class="rounded-md bg-blue-600 w-24 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>Save</button
											>
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
		animation: fadeIn 0.3s ease-in;
		min-width: 200px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translate(-50%, -60%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}
</style>
