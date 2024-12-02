<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;

	let showNotification = false;
	let notificationText: string = '';

	function showNotification_alert(text: string) {
		notificationText = text;
		showNotification = true;
		setTimeout(() => {
			showNotification = false;
		}, 3000);
	}

	onMount(async () => {
		if (data.expired) {
			showNotification_alert(data.message);
		}

		// Remove the parameters from url
		const newUrl = $page.url.pathname; // Gets current path without query params
		goto(newUrl, { replaceState: true }); // Replace current URL without params
	});
</script>

{#if showNotification}
	<div class="notification font-semibold">{notificationText}</div>
{/if}

<div class="flex pt-20 flex-col justify-center sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
			Sign in to Vett
		</h2>
		<p class="mt-3 text-center text-lg leading-9 tracking-tight text-gray-900">
			We suggest using the <strong>email address you use at work.</strong>
		</p>
	</div>

	<div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-6 sm:rounded-lg sm:px-12">
			<form class="space-y-4" method="POST" action="?/magicLogin">
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<!-- In case we bring normal account flow back. -->
				<!-- <div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900"
							>Remember me</label
						>
					</div>

					<div class="text-sm leading-6">
						<a href="/login" class="font-semibold text-blue-600 hover:text-blue-500"
							>Forgot password?</a
						>
					</div>
				</div> -->

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
						>Sign In With Email</button
					>
				</div>
			</form>

			<div>
				<div class="relative mt-4">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div class="relative flex justify-center text-sm font-medium leading-6">
						<span class="bg-white px-6 text-gray-900">Or Sign In With</span>
					</div>
				</div>

				<div class="mt-4 grid grid-cols-2 gap-4">
					<form>
						<button
							formaction="?/oauthLogin&provider=google"
							type="submit"
							class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
						>
							<svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
									fill="#EA4335"
								/>
								<path
									d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
									fill="#4285F4"
								/>
								<path
									d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
									fill="#FBBC05"
								/>
								<path
									d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
									fill="#34A853"
								/>
							</svg>
							<span class="text-sm font-semibold leading-6">Google</span>
						</button>
					</form>
					<form>
						<button
							formaction="?/oauthLogin&provider=apple"
							type="submit"
							class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
						>
							<svg
								class="h-5 w-5"
								fill="#000000"
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 22.773 22.773"
								xml:space="preserve"
							>
								<path
									d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
						c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
								/>
								<path
									d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
						c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
						c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
						c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
						c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
						c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
								/>
							</svg>
							<span class="text-sm font-semibold">Apple</span>
						</button>
					</form>
				</div>
			</div>
			<div
				class="flex rounded-md bg-neutral-100 outline outline-gray-300 outline-1 p-3 mt-5 justify-center"
			>
				<div class="flex">
					<div class="flex-shrink-0">
						<svg
							class="h-5 w-5 text-gray-500"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3 flex-1 md:flex md:justify-between">
						<p class="text-sm text-gray-500">
							We’ll email you a magic code for a password-free sign in. Dont have an account?
							<a href="/register" class="font-semibold leading-6 text-blue-600 hover:text-blue-500"
								>Sign up here!</a
							>
						</p>
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
		background: #8f3c3c;
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
