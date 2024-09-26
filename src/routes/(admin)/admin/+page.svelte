<div class="bg-black h-full">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="sm:flex sm:items-center">
				<div class="sm:flex-auto">
					<h1 class="mt-8 text-2xl font-semibold leading-6 text-white">Dashboard</h1>
				</div>
			</div>
		</div>
		<div class="mt-10 sm:mt-16">
			<div class="bg-white">
				<div class="-ml-4 -mt-4 flex items-center justify-start sm:flex-nowrap">
					<div class="ml-4 mt-4">
						<h3 class="text-base font-semibold leading-6 text-gray-900">Administrators</h3>
						<p class="mt-1 text-sm text-gray-500">
							Can create and remove Users. <br />Only the Owner may remove admins.
						</p>
					</div>
					<div class="ml-4 mt-4 flex-shrink-0">
						<button
							type="button"
							class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Create new job</button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 bg-black">
			<div class="mt-10 grid grid-cols-1 gap-10 sm:mt-16 lg:grid-cols-6 lg:grid-rows-1">
				<div class="relative lg:col-span-3 h-[480px]">
					<div
						class="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
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
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
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
						class="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
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
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
													>
												</div>
											</div>
										</div>
									</li>
									<li class="flex justify-between py-5">
										<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
											<img
												class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
												src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
											<div class="min-w-0 flex-auto">
												<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
													<a href="#" class="hover:underline">Leslie Alexander</a>
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
												<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">Co-Founder / CEO</p>
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
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-0"
														>Demote User<span class="sr-only">, Leslie Alexander</span></a
													>
													<a
														href="#"
														class="block px-3 py-1 text-sm leading-6 text-gray-900"
														role="menuitem"
														tabindex="-1"
														id="options-menu-0-item-1"
														>Remote<span class="sr-only">, Leslie Alexander</span></a
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
				<!-- Repeat the same structure for the second column -->
			</div>
		</div>
	</div>
</div>

