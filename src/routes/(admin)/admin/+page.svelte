<script lang="ts">
	import AdminRow from '$lib/components/orders/admin_row.svelte';
	import AdminSendEmails from '$lib/components/admin_send_emails/admin_send_emails.svelte';
	import AdminSendResults from '$lib/components/admin_send_results/admin_send_results.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { emailStore } from '$lib/stores';

	export let data: PageData;
	let tasks = data.tasks as Task[];

	interface SendEmailsActionResult {
		success: boolean;
		error?: string;
		updatedData?: {
			id: number;
			status: string;
			checkpoint: string;
			emails: string;
		}[];
	}

	interface TaskActionResponse {
		success: boolean;
		error?: string;
		updatedData?: {
			id: number;
			status: string;
			checkpoint: string;
			emails: string;
		}[];
	}

	let activeTab = 0;
	let adminorder_modal_invisible = false;
	let showNotification = false;
	let showCompleted = false;
	let notificationText: string = 'Email Template Saved!';

	let role = '';
	let skills: string[] = [];
	let emails: [string, boolean | 'fail'][];
	let result_page_emails: string[];
	let supabase_emails_column: [string, boolean | 'fail'][];
	let targeted_emails_for_mailing: string[] = [];
	let company_name: string = '';
	let order_id: string;
	let manager_uuid: string;

	let emailTemplate: string;

	let colorIndex = 0;
	const bg_colors: string[] = [
		'bg-red-50',
		'bg-blue-50',
		'bg-purple-50',
		'bg-green-50',
		'bg-pink-50',
		'bg-yellow-50'
	];
	const text_colors: string[] = [
		'text-red-700',
		'text-blue-700',
		'text-purple-700',
		'text-green-700',
		'text-pink-700',
		'text-yellow-700'
	];
	const ring_colors: string[] = [
		'ring-red-300',
		'ring-blue-300',
		'ring-purple-300',
		'ring-green-400',
		'ring-pink-300',
		'ring-yellow-400'
	];

	const getUpcomingTasks = (tasks: Task[]) => {
		return tasks.filter((task) => task.Type === 'onboarding' || task.Type === 'create_takehome');
	};

	const getCurrentTasks = (tasks: Task[]) => {
		return tasks.filter(
			(task) =>
				task.Type !== 'onboarding' && task.Type !== 'create_takehome' && task.Type !== 'completed'
		);
	};

	const getCompletedTasks = (tasks: Task[]) => {
		return tasks.filter((task) => task.Type === 'completed');
	};

	function getNextColor(): string[] {
		const bg = bg_colors[colorIndex];
		const text = text_colors[colorIndex];
		const ring = ring_colors[colorIndex];
		colorIndex = (colorIndex + 1) % bg_colors.length;
		return [bg, text, ring];
	}

	function showNotification_alert(text: string) {
		notificationText = text;
		showNotification = true;
		setTimeout(() => {
			showNotification = false;
		}, 3000);
	}

	function saveTemplate() {
		showNotification_alert('Email Template Saved!');
		console.log(emailTemplate);
	}

	function resetOrderModal() {
		adminorder_modal_invisible = !adminorder_modal_invisible;
		role = '';
		skills = [];
		colorIndex = 0;
		activeTab = 0;
		targeted_emails_for_mailing = [];
		company_name = '';
		order_id = '';
		manager_uuid = '';
		emailTemplate = '';
		emailStore.set({ emails: [], loading: false });
	}

	function showTaskModal(task: Task) {
		role = task.Role;
		skills = task.Skills;
		emails = Array.isArray(task.Emails) ? task.Emails : JSON.parse(task.Emails);
		result_page_emails = emails.map((email) => email[0]);
		company_name = task.Company_name;
		order_id = task.Order_id;
		supabase_emails_column = task.Emails;
		manager_uuid = task.Manager_id;

		emailTemplate = `Greetings,

${company_name} has requested that you participate in a technical evaluation as part of the interview process.

Our technical evaluation process is two steps:

1. A small project to demonstrate your skills. The project is not timed, and you may complete it at whatever pace is most convenient for you. We evaluate projects based on their functionality and readability.

2. After you have submitted your project we will have a video call to discuss the project and your experience. We never do trivia or leetcode style questions.

Projects normally take between 2-4 hours to complete. The technical interview takes approximately one hour.

The outline for the project is:
<...steps go here...>

You can schedule your technical interview with ${company_name} by clicking the calendar link below.`;

		adminorder_modal_invisible = !adminorder_modal_invisible;
	}

	const handleEmailSubmit = () => {
		return async ({ result }: { result: ActionResult }) => {
			emailStore.update((store) => ({ ...store, loading: true, error: undefined }));

			const actionResult = result as ActionResult & {
				data?: SendEmailsActionResult;
			};

			if (actionResult.type === 'success' && actionResult.data?.success) {
				const updatedOrder = actionResult.data.updatedData?.[0];

				if (updatedOrder) {
					const updatedEmails = Array.isArray(updatedOrder.emails)
						? updatedOrder.emails
						: JSON.parse(updatedOrder.emails);

					emailStore.update((store) => ({
						...store,
						emails: updatedEmails,
						loading: false
					}));

					tasks = tasks.map((task) => {
						if (task.Order_id === updatedOrder.id.toString()) {
							return {
								...task,
								Type: updatedOrder.checkpoint as Task['Type'],
								Status: updatedOrder.status as Task['Status'],
								Emails: updatedEmails
							};
						}
						return task;
					});

					emails = updatedEmails;
					supabase_emails_column = updatedEmails;
					targeted_emails_for_mailing = [];
				}
			} else {
				emailStore.update((store) => ({
					...store,
					loading: false,
					error: actionResult.data?.error || 'Failed to send emails'
				}));
			}
		};
	};

	const handleResultsSubmit = () => {
		return async ({ result }: { result: ActionResult }) => {
			const actionResult = result as ActionResult & {
				data?: TaskActionResponse;
			};

			if (actionResult.type === 'success' && actionResult.data?.success) {
				const updatedOrder = actionResult.data.updatedData?.[0];

				if (updatedOrder) {
					tasks = tasks.map((task) => {
						if (task.Order_id === order_id) {
							return {
								...task,
								Type: 'completed' as Task['Type']
							};
						}
						return task;
					});

					showNotification_alert('Results Email Sent!');
					resetOrderModal();
				}
			} else {
				showNotification_alert('Failed to send results email');
			}
		};
	};

	$: upcomingTasks = getUpcomingTasks(tasks);
	$: currentTasks = getCurrentTasks(tasks);
	$: completedTasks = getCompletedTasks(tasks);
</script>

{#if showNotification}
	<div class="notification font-semibold">{notificationText}</div>
{/if}

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
				<div class="-ml-4 -mt-4 flex items-center justify-between sm:flex-nowrap gruvboxDark-bgH">
					<div class="ml-4 mt-4 gruvboxDark-bgH">
						<h3 class="text-2xl font-semibold leading-6 text-gruvboxDark-red gruvboxDark-bgH">
							Current Tasks
						</h3>
					</div>
					<div class="flex items-center gap-2 mr-4 mt-4">
						<span class="text-sm text-gray-300">Show Completed</span>
						<input
							type="checkbox"
							class="peer sr-only opacity-0"
							id="toggle"
							bind:checked={showCompleted}
						/>
						<label
							for="toggle"
							class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-600 px-0.5 outline-gray-600 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-150 peer-checked:bg-gruvboxDark-red peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-600 peer-checked:peer-focus-visible:outline-gruvboxDark-red"
						>
							<span class="sr-only">Enable</span>
						</label>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-8 mx-auto max-w-2xl lg:max-w-7xl gruvboxDark-bgH">
			<div class="grid grid-cols-1 gap-10 sm:mt-6 lg:grid-cols-6 lg:grid-rows-1">
				<!-- Upcoming Tasks Column -->
				<div class="relative lg:col-span-3 h-[480px]">
					<div
						class="absolute inset-0 rounded-lg gruvboxDark-bgH shadow-md shadow-gruvboxDark-red2 outline outline-gruvboxDark-red"
					></div>
					<div class="relative flex h-full flex-col overflow-hidden rounded-md">
						<div class="flex flex-col h-full">
							<div class="overflow-y-auto">
								<ul role="list" class="pl-3 pr-3">
									{#each upcomingTasks.sort((a, b) => parseInt(b.Order_id) - parseInt(a.Order_id)) as task}
										<AdminRow {task} command={() => showTaskModal(task)} />
									{/each}
								</ul>
							</div>
						</div>
					</div>
					<div
						class="pointer-events-none absolute inset-0 rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
				</div>

				<!-- Current Tasks Column -->
				<div class="relative lg:col-span-3 h-[480px]">
					<div
						class="absolute inset-0 rounded-lg gruvboxDark-bgH shadow-md shadow-gruvboxDark-red2 outline outline-gruvboxDark-red"
					></div>
					<div class="relative flex h-full flex-col overflow-hidden rounded-md">
						<div class="flex flex-col h-full">
							<div class="overflow-y-auto">
								<ul role="list" class="pl-3 pr-3">
									{#each currentTasks.sort((a, b) => parseInt(b.Order_id) - parseInt(a.Order_id)) as task}
										<AdminRow {task} command={() => showTaskModal(task)} />
									{/each}

									{#if showCompleted}
										{#each completedTasks.sort((a, b) => parseInt(b.Order_id) - parseInt(a.Order_id)) as task}
											<AdminRow {task} command={() => showTaskModal(task)} />
										{/each}
									{/if}
								</ul>
							</div>
						</div>
					</div>
					<div
						class="pointer-events-none absolute inset-0 rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="fixed z-50" class:invisible={!adminorder_modal_invisible}>
	<div class="grid h-screen place-items-center">
		<div
			class="fixed grid h-screen place-items-center overflow-y-auto overflow-x-hidden m-auto md:inset-0 w-screen bg-slate-950/50"
		>
			<div class="relative p-4 w-full max-w-2xl max-h-full">
				<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<!-- Modal Header -->
					<div
						class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
					>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
							Take Home Assignment
						</h3>
						<button
							type="button"
							class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							on:click={resetOrderModal}
						>
							✕
							<span class="sr-only">Close modal</span>
						</button>
					</div>

					<!-- Tabs -->
					<div class="px-6 py-4 border-b border-gray-200">
						<div class="flex justify-between">
							<button
								class="text-sm font-medium {activeTab === 0
									? 'text-blue-500'
									: 'text-gray-300 hover:text-blue-300'}"
								on:click={() => (activeTab = 0)}
							>
								Create Takehome
							</button>
							<button
								class="text-sm font-medium {activeTab === 1
									? 'text-blue-500'
									: 'text-gray-300 hover:text-blue-300'}"
								on:click={() => {
									activeTab = 1;
									colorIndex = 0;
								}}
							>
								Send Take Home
							</button>
							<button
								class="text-sm font-medium {activeTab === 2
									? 'text-blue-500'
									: 'text-gray-300 hover:text-blue-300'}"
								on:click={() => {
									activeTab = 2;
									colorIndex = 0;
								}}
							>
								Review and Report
							</button>
						</div>
					</div>

					<!-- Content -->
					<div class="p-5 px-10">
						{#if activeTab === 0}
							<div class="space-y-6">
								<p class="text-md font-medium text-gray-900 dark:text-white">Role Name: {role}</p>
								<div class="flex flex-wrap gap-1">
									<p class="pr-2 text-md font-medium text-gray-900 dark:text-white">Skills:</p>
									{#each skills as skill}
										{@const [bg, text, ring] = getNextColor()}
										<span
											class="inline-flex items-center rounded-md {bg} px-2 py-1 text-xs font-medium {text} ring-1 ring-inset {ring}"
											>{skill}</span
										>
									{/each}
								</div>
								<textarea
									bind:value={emailTemplate}
									class="border border-gray-300 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-64 resize-none font-mono whitespace-pre-wrap"
									placeholder="Enter email template here..."
									spellcheck="false"
									wrap="soft"
								></textarea>
								<div class="flex justify-end">
									<button
										on:click={saveTemplate}
										class="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 disabled:bg-gray-600"
									>
										Save Template
									</button>
								</div>
							</div>
						{:else if activeTab === 1}
							<form method="POST" action="?/sendCandidateEmails" use:enhance={handleEmailSubmit}>
								<input
									type="hidden"
									name="emails_as_string"
									value={JSON.stringify(targeted_emails_for_mailing)}
								/>
								<input type="hidden" name="email_body" value={emailTemplate} />
								<input type="hidden" name="order_id" value={order_id} />
								<input type="hidden" name="company_name" value={company_name} />
								<input type="hidden" name="manager_uuid" value={manager_uuid} />
								<input
									type="hidden"
									name="supabase_emails_column"
									value={JSON.stringify(supabase_emails_column)}
								/>
								<AdminSendEmails
									myemails={emails}
									bind:selected={targeted_emails_for_mailing}
									resend_email_body={emailTemplate}
									resend_email_company_name={company_name}
									resend_supabase_emails_column={JSON.stringify(supabase_emails_column)}
									resend_order_id={order_id}
								/>
							</form>
						{:else}
							<form method="POST" action="?/finalizeResults" use:enhance={handleResultsSubmit}>
								<input type="hidden" name="company_name" value={company_name} />
								<input type="hidden" name="manager_uuid" value={manager_uuid} />
								<input type="hidden" name="result_order_id" value={order_id} />
								<AdminSendResults emails={result_page_emails} />
							</form>
						{/if}
					</div>
				</div>
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
		background: #3c8f3e;
		color: white;
		padding: 1rem 2rem;
		border-radius: 4px;
		text-align: center;
		z-index: 9999;
		animation: fadeInOut 3s linear 1 forwards;
		min-width: 200px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

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
