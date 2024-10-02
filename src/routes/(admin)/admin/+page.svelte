<div class="bg-black h-full">
	<div class="pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="overflow-hidden rounded-lg bg-black shadow-md shadow-red-900">
			<h2 class="sr-only" id="profile-overview-title">Admin Dashboard</h2>
			<div class="bg-black p-6">
				<div class="sm:flex sm:items-center sm:justify-between">
					<div class="sm:flex sm:space-x-5 bg-black">
						<div class="flex-shrink-0">
							<img class="mx-auto h-20 w-20 rounded-full" src="screenshots/eric.jpg" alt="" />
						</div>
						<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left bg-black">
							<p class="text-sm font-medium text-white">Welcome back,</p>
							<p class="text-xl font-bold text-red-700 sm:text-2xl">Eric Biggs</p>
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
			<div class="bg-black grid grid-cols-2 sm:mt-16 gap-10 lg:grid-rows-1">
				<div class="-ml-4 -mt-4 flex items-center justify-start sm:flex-nowrap">
					<div class="ml-4 mt-4">
						<h3 class="text-2xl font-semibold leading-6 text-red-700 bg-black">Upcoming Tasks</h3>
					</div>
				</div>
				<div class="-ml-4 -mt-4 flex items-center sm:flex-nowrap bg-black">
					<div class="ml-4 mt-4 bg-black">
						<h3 class="text-2xl font-semibold leading-6 text-red-700 bg-black">Current Tasks</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="mb-8 mx-auto max-w-2xl lg:max-w-7xl bg-black">
			<div class=" grid grid-cols-1 gap-10 sm:mt-6 lg:grid-cols-6 lg:grid-rows-1">
				<div class="relative lg:col-span-3 h-[480px]">
					<div
						class="absolute inset-0 rounded-lg bg-black max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] shadow-md shadow-red-900 outline outline-red-700"
					></div>
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
					>
						<div class="flex flex-col h-full">
							<div class="overflow-y-auto flex-grow pr-2">
								<ul role="list" class="divide-y divide-gray-100 pl-3 pr-3">
									<li
										class=" w-full bg-cyan-700 rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(1rem+1px)] mt-2"
									>
										<button
											on:click={() => alert('clicked')}
											class=" min-w-0 overflow-hidden w-full"
										>
											<div class="flex gap-3 py-2 px-4 w-full justify-between">
												<div class="flex gap-3 w-full">
												<img
													class="h-16 w-16 flex-shrink-0 rounded-full bg-gray-50"
													alt=""
													src="screenshots/eric.jpg"
												/>
												<div class="min-w-0 flex flex-col place-items-start col-span-2">
													<p class="font-semibold text-yellow-400 truncate text-lg">TASK UPDATED</p>
													<p class="font-semibold text-gray-300 truncate text-sm">Shy Apply LLC</p>
													<p class="font-semibold text-gray-300 truncate text-sm">
														PB: Dylan Taylor
													</p>
												</div>
											</div>
												<div class="pr-2">
													<p class="text-sm font-semibold text-gray-300 truncate">#113456</p>
													<p class="text-sm font-semibold text-gray-300 truncate mt-7">10/30/24</p>
												</div>
											</div>
										</button>
									</li>
									<li
										class=" w-full bg-orange-700 rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(1rem+1px)] mt-2"
									>
										<button
											on:click={() => alert('clicked')}
											class=" min-w-0 overflow-hidden w-full"
										>
											<div class="flex gap-3 py-2 px-4 w-full justify-between">
												<div class="flex gap-3 w-full">
												<img
													class="h-16 w-16 flex-shrink-0 rounded-full bg-gray-50"
													alt=""
													src="screenshots/eric.jpg"
												/>
												<div class="min-w-0 flex flex-col place-items-start col-span-2">
													<p class="font-semibold text-yellow-400 truncate text-lg">CREATE TAKEHOME</p>
													<p class="font-semibold text-gray-300 truncate text-sm">Shy Apply LLC</p>
													<p class="font-semibold text-gray-300 truncate text-sm">
														PB: Dylan Taylor
													</p>
												</div>
											</div>
												<div class="pr-2">
													<p class="text-sm font-semibold text-gray-300 truncate">#113456</p>
													<p class="text-sm font-semibold text-gray-300 truncate mt-7">10/30/24</p>
												</div>
											</div>
										</button>
									</li>
									<li
										class=" w-full bg-lime-800 rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(1rem+1px)] mt-2"
									>
										<button
											on:click={() => alert('clicked')}
											class=" min-w-0 overflow-hidden w-full"
										>
											<div class="flex gap-3 py-2 px-4 w-full justify-between">
												<div class="flex gap-3 w-full">
												<img
													class="h-16 w-16 flex-shrink-0 rounded-full bg-gray-50"
													alt=""
													src="screenshots/eric.jpg"
												/>
												<div class="min-w-0 flex flex-col place-items-start col-span-2">
													<p class="font-semibold text-yellow-500 truncate text-lg">ONBOARDING</p>
													<p class="font-semibold text-gray-300 truncate text-sm">Shy Apply LLC</p>
													<p class="font-semibold text-gray-300 truncate text-sm">
														PB: Dylan Taylor
													</p>
												</div>
											</div>
												<div class="pr-2">
													<p class="text-sm font-semibold text-gray-300 truncate">#113456</p>
													<p class="text-sm font-semibold text-gray-300 truncate mt-7">10/30/24</p>
												</div>
											</div>
										</button>
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
						class="absolute inset-0 rounded-lg bg-black max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem] shadow-md shadow-red-900 outline outline-red-700"
					></div>
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
					>
						<div class="p-6 flex flex-col h-full">
							<div class="overflow-y-auto flex-grow pr-2">
								<ul role="list" class="divide-y divide-gray-100"></ul>
							</div>
						</div>
					</div>
					<div
						class="pointer-events-none absolute inset-0 rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
				</div>
				<!-- Repeat the same structure for the second column -->
			</div>
		</div>
	</div>
</div>
