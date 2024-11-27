<script lang="ts">
	import { enhance } from '$app/forms';

	let showNotification = false;
	let notificationText: string = '';
	let notificationSuccess = true;

	function showNotificationText(message: any, success: boolean) {
		showNotification = true;
		notificationSuccess = success;
		notificationText = message;

		// Hide notification after 3 seconds
		setTimeout(() => {
			showNotification = false;
		}, 5000);
	}
</script>

{#if showNotification}
	<div
		class="notification font-semibold"
		class:success={notificationSuccess}
		class:error={!notificationSuccess}
	>
		{notificationText}
	</div>
{/if}

<div class="relative isolate bg-gray-900 pb-20">
	<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
		<div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
			<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
				<div
					class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2"
				>
					<svg
						class="absolute inset-0 size-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
								width="200"
								height="200"
								x="100%"
								y="-1"
								patternUnits="userSpaceOnUse"
							>
								<path d="M130 200V.5M.5 .5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="100%" y="-1" class="overflow-visible fill-gray-800/20">
							<path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
						</svg>
						<rect
							width="100%"
							height="100%"
							stroke-width="0"
							fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
						/>
					</svg>
					<div
						class="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
						aria-hidden="true"
					>
						<div
							class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
							style="clip-path: polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)"
						></div>
					</div>
				</div>
				<h2 class="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
					Let's work together
				</h2>
				<p class="mt-6 text-lg/8 text-gray-300">
					Fake it until you make it doesnt work with us. Our evaluation process goes beyond the
					resume to ensure compatibillity with your tech stack, helping you build teams you can
					trust. Don't let impressive credentials mask a lack of practical knowledge.
				</p>
				<dl class="mt-10 space-y-4 text-base/7 text-gray-300">
					<div class="flex gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">Email</span>
							<svg
								class="h-7 w-6 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
								/>
							</svg>
						</dt>
						<dd>
							<a class="hover:text-white" href="mailto:support@vett.dev">support@vett.dev</a>
						</dd>
					</div>
				</dl>
			</div>
		</div>
		<form
			method="POST"
			class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
			action="?/sendContactEmail"
			use:enhance={({ formElement }) => {
				return async ({ result }) => {
					if (result.type === 'failure') {
						const errorMessage = result.data?.message || 'An error occurred';
						showNotificationText(errorMessage, false);
					} else if (result.type === 'success') {
						const successMessage = result.data?.message || 'Message sent!';
						showNotificationText(successMessage, true);
						formElement.reset(); // Clear the form only on success
					}
				};
			}}
		>
			<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label for="first-name" class="block text-sm/6 font-semibold text-white"
							>First name</label
						>
						<div class="mt-2.5">
							<input
								type="text"
								name="first-name"
								id="first-name"
								autocomplete="given-name"
								required
								minlength="2"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
							/>
						</div>
					</div>
					<div>
						<label for="last-name" class="block text-sm/6 font-semibold text-white">Last name</label
						>
						<div class="mt-2.5">
							<input
								type="text"
								name="last-name"
								id="last-name"
								autocomplete="family-name"
								required
								minlength="2"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="email" class="block text-sm/6 font-semibold text-white">Email</label>
						<div class="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autocomplete="email"
								required
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="message" class="block text-sm/6 font-semibold text-white">Message</label>
						<div class="mt-2.5">
							<textarea
								name="message"
								id="message"
								required
								minlength="10"
								rows="4"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
							></textarea>
						</div>
					</div>
				</div>
				<div class="mt-8 flex justify-end">
					<button
						type="submit"
						class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
						>Send message</button
					>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	.notification {
		position: fixed;
		top: 8%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem 2rem;
		border-radius: 4px;
		text-align: center;
		z-index: 9999;
		animation: fadeInOut 5s linear 1 forwards;
		min-width: 200px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.notification.success {
		background: #4caf50;
		color: white;
	}

	.notification.error {
		background: #ef4444;
		color: white;
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
