<script>
	let header_invisible = false;
</script>

<header class="bg-slate-900">
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex items-center gap-x-12">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Vett</span>
				<svg
					class="w-8 h-8 fill-current text-white"
					id="Layer_1"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 57.09 45.74"
					><title>Vett Home</title><path
						d="M0.51,0H16.83a0.51,0.51,0,0,1,.25.06,0.5,0.5,0,0,1,.18.17h0L37.13,32a0.49,0.49,0,0,1,0,.54h0L29,45.51h0a0.5,0.5,0,0,1-.18.17,0.51,0.51,0,0,1-.49,0,0.5,0.5,0,0,1-.18-0.17h0L0.08,0.77A0.5,0.5,0,0,1,0,.52H0A0.5,0.5,0,0,1,.06.26,0.5,0.5,0,0,1,.25.07h0A0.5,0.5,0,0,1,.51,0h0ZM34.72,0H56.58a0.5,0.5,0,0,1,.26.07h0A0.5,0.5,0,0,1,57,.26a0.51,0.51,0,0,1,.06.26h0A0.5,0.5,0,0,1,57,.77L46.08,18.21h0a0.5,0.5,0,0,1-.18.17,0.51,0.51,0,0,1-.49,0,0.5,0.5,0,0,1-.18-0.17h0L34.3,0.77A0.5,0.5,0,0,1,34.22.52h0A0.5,0.5,0,0,1,34.28.26,0.5,0.5,0,0,1,34.47.07h0A0.5,0.5,0,0,1,34.72,0h0Z"
					/></svg
				>
			</a>
			<div class="hidden lg:flex lg:gap-x-12">
				<a href="/" class="text-sm font-semibold leading-6 text-white">Home</a>
				<a href="/about" class="text-sm font-semibold leading-6 text-white">About Us</a>
				<a href="/blog" class="text-sm font-semibold leading-6 text-white">Blog</a>
				<a href="/#pricing" class="text-sm font-semibold leading-6 text-white">Pricing</a>
			</div>
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-4 lg:items-center">
			<a
				href="/register"
				class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Sign Up</a
			>
			<a href="/login" class="text-sm font-semibold leading-6 text-white"
				>Log in <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	<div class="lg:hidden" role="dialog" aria-modal="true" class:invisible={!header_invisible}>
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-10"></div>
		<div
			class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">Vett</span>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt=""
					/>
				</a>
				<button
					type="button"
					class="-m-2.5 rounded-md p-2.5 text-gray-700"
					on:click={() => (header_invisible = !header_invisible)}
				>
					<span class="sr-only">Close menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						<a
							href="/"
							class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>Home</a
						>
						<a
							href="/about"
							class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>About Us</a
						>
						<a
							href="/blog"
							class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>Blog</a
						>
					</div>
					<div class="py-6">
						<a
							href="/login"
							class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>Log in</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
