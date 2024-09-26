<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<form>
		<div class="space-y-12">
			<div class="border-b border-gray-900/10 pb-12 mt-14">
				<h2 class="text-base font-semibold leading-7 text-gray-900">Edit Company Profile</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">
					This information will be displayed on your dashboard as well as in the email you send to
					your staff.
				</p>

				<div class="col-span-full mt-10">
					<label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
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

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-4">
						<label for="companyname" class="block text-sm font-medium leading-6 text-gray-900"
							>Company Name</label
						>
						<div class="mt-2">
							<div
								class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
							>
								<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
									>workcation.com/</span
								>
								<input
									type="text"
									name="username"
									id="username"
									autocomplete="username"
									class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="janesmith"
								/>
							</div>
						</div>
						<label for="companyname" class="block text-sm font-medium leading-6 text-gray-900 mt-10"
							>Account Owner Email</label
						>
						<div class="mt-2">
							<div
								class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
							>
								<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
									>workcation.com/</span
								>
								<input
									type="text"
									name="username"
									id="username"
									autocomplete="username"
									class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="janesmith"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="border-b border-gray-900/10 pb-12">
				<h2 class="text-base font-semibold leading-7 text-gray-900">Staff Panel</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">
					Here you can manage Administrators and Users. <br />You may have an unlimited amount of
					both, but there can be only one Owner(You).
				</p>
			</div>

			<div class="mt-10 sm:mt-16">
				<div class="bg-white">
					<div class="-ml-4 -mt-4 flex items-center justify-start sm:flex-nowrap">
						<div class="ml-4 mt-4">
							<h3 class="text-base font-semibold leading-6 text-gray-900">Administrators</h3>
							<p class="mt-1 text-sm text-gray-500">
								Can create and remove Users. <br>Only the Owner may remove admins.
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
			<div class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
				<div class="relative lg:col-span-3">
					<div
						class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]"
					>
						<ul role="list" class="divide-y divide-gray-100 ml-5 mr-5">
							<li class="flex justify-between gap-x-6 py-5">
								<div class="flex min-w-0 gap-x-4">
									<img
										class="h-12 w-12 flex-none rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div class="min-w-0 flex-auto">
										<p class="text-sm font-semibold leading-6 text-gray-900">
											<a href="#" class="hover:underline">Leslie Alexander</a>
										</p>
										<p class="mt-1 flex text-xs leading-5 text-gray-500">
											<a href="mailto:leslie.alexander@example.com" class="truncate hover:underline"
												>leslie.alexander@example.com</a
											>
										</p>
									</div>
								</div>
								<div class="flex shrink-0 items-center gap-x-6">
									<div class="hidden sm:flex sm:flex-col sm:items-end">
										<p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
										<p class="mt-1 text-xs leading-5 text-gray-500">
											Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
										</p>
									</div>
									<div class="relative flex-none">
										<button
											type="button"
											class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
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

										<!--
                                Dropdown menu, show/hide based on menu state.
                      
                                Entering: "transition ease-out duration-100"
                                  From: "transform opacity-0 scale-95"
                                  To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                  From: "transform opacity-100 scale-100"
                                  To: "transform opacity-0 scale-95"
                              -->
										<div
											class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="options-menu-0-button"
											tabindex="-1"
										>
											<!-- Active: "bg-gray-50", Not Active: "" -->
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
							<li class="flex justify-between gap-x-6 py-5">
								<div class="flex min-w-0 gap-x-4">
									<img
										class="h-12 w-12 flex-none rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div class="min-w-0 flex-auto">
										<p class="text-sm font-semibold leading-6 text-gray-900">
											<a href="#" class="hover:underline">Michael Foster</a>
										</p>
										<p class="mt-1 flex text-xs leading-5 text-gray-500">
											<a href="mailto:michael.foster@example.com" class="truncate hover:underline"
												>michael.foster@example.com</a
											>
										</p>
									</div>
								</div>
								<div class="flex shrink-0 items-center gap-x-6">
									<div class="hidden sm:flex sm:flex-col sm:items-end">
										<p class="text-sm leading-6 text-gray-900">Co-Founder / CTO</p>
										<p class="mt-1 text-xs leading-5 text-gray-500">
											Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
										</p>
									</div>
									<div class="relative flex-none">
										<button
											type="button"
											class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
											id="options-menu-1-button"
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

										<!--
                                Dropdown menu, show/hide based on menu state.
                      
                                Entering: "transition ease-out duration-100"
                                  From: "transform opacity-0 scale-95"
                                  To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                  From: "transform opacity-100 scale-100"
                                  To: "transform opacity-0 scale-95"
                              -->
										<div
											class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="options-menu-1-button"
											tabindex="-1"
										>
											<!-- Active: "bg-gray-50", Not Active: "" -->
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-1-item-0"
												>Demote User<span class="sr-only">, Michael Foster</span></a
											>
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-1-item-1"
												>Remove<span class="sr-only">, Michael Foster</span></a
											>
										</div>
									</div>
								</div>
							</li>
							<li class="flex justify-between gap-x-6 py-5">
								<div class="flex min-w-0 gap-x-4">
									<img
										class="h-12 w-12 flex-none rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div class="min-w-0 flex-auto">
										<p class="text-sm font-semibold leading-6 text-gray-900">
											<a href="#" class="hover:underline">Dries Vincent</a>
										</p>
										<p class="mt-1 flex text-xs leading-5 text-gray-500">
											<a href="mailto:dries.vincent@example.com" class="truncate hover:underline"
												>dries.vincent@example.com</a
											>
										</p>
									</div>
								</div>
								<div class="flex shrink-0 items-center gap-x-6">
									<div class="hidden sm:flex sm:flex-col sm:items-end">
										<p class="text-sm leading-6 text-gray-900">Business Relations</p>
										<div class="mt-1 flex items-center gap-x-1.5">
											<div class="flex-none rounded-full bg-emerald-500/20 p-1">
												<div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
											</div>
											<p class="text-xs leading-5 text-gray-500">Online</p>
										</div>
									</div>
									<div class="relative flex-none">
										<button
											type="button"
											class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
											id="options-menu-2-button"
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

										<!--
                                Dropdown menu, show/hide based on menu state.
                      
                                Entering: "transition ease-out duration-100"
                                  From: "transform opacity-0 scale-95"
                                  To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                  From: "transform opacity-100 scale-100"
                                  To: "transform opacity-0 scale-95"
                              -->
										<div
											class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="options-menu-2-button"
											tabindex="-1"
										>
											<!-- Active: "bg-gray-50", Not Active: "" -->
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-2-item-0"
												>Demote User<span class="sr-only">, Dries Vincent</span></a
											>
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-2-item-1"
												>Remove<span class="sr-only">, Dries Vincent</span></a
											>
										</div>
									</div>
								</div>
							</li>
							<li class="flex justify-between gap-x-6 py-5">
								<div class="flex min-w-0 gap-x-4">
									<img
										class="h-12 w-12 flex-none rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div class="min-w-0 flex-auto">
										<p class="text-sm font-semibold leading-6 text-gray-900">
											<a href="#" class="hover:underline">Lindsay Walton</a>
										</p>
										<p class="mt-1 flex text-xs leading-5 text-gray-500">
											<a href="mailto:lindsay.walton@example.com" class="truncate hover:underline"
												>lindsay.walton@example.com</a
											>
										</p>
									</div>
								</div>
								<div class="flex shrink-0 items-center gap-x-6">
									<div class="hidden sm:flex sm:flex-col sm:items-end">
										<p class="text-sm leading-6 text-gray-900">Front-end Developer</p>
										<p class="mt-1 text-xs leading-5 text-gray-500">
											Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
										</p>
									</div>
									<div class="relative flex-none">
										<button
											type="button"
											class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
											id="options-menu-3-button"
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

										<!--
                                Dropdown menu, show/hide based on menu state.
                      
                                Entering: "transition ease-out duration-100"
                                  From: "transform opacity-0 scale-95"
                                  To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                  From: "transform opacity-100 scale-100"
                                  To: "transform opacity-0 scale-95"
                              -->
										<div
											class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="options-menu-3-button"
											tabindex="-1"
										>
											<!-- Active: "bg-gray-50", Not Active: "" -->
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-3-item-0"
												>Demote User<span class="sr-only">, Lindsay Walton</span></a
											>
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-3-item-1"
												>Remove<span class="sr-only">, Lindsay Walton</span></a
											>
										</div>
									</div>
								</div>
							</li>
							<li class="flex justify-between gap-x-6 py-5">
								<div class="flex min-w-0 gap-x-4">
									<img
										class="h-12 w-12 flex-none rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div class="min-w-0 flex-auto">
										<p class="text-sm font-semibold leading-6 text-gray-900">
											<a href="#" class="hover:underline">Courtney Henry</a>
										</p>
										<p class="mt-1 flex text-xs leading-5 text-gray-500">
											<a href="mailto:courtney.henry@example.com" class="truncate hover:underline"
												>courtney.henry@example.com</a
											>
										</p>
									</div>
								</div>
								<div class="flex shrink-0 items-center gap-x-6">
									<div class="hidden sm:flex sm:flex-col sm:items-end">
										<p class="text-sm leading-6 text-gray-900">Designer</p>
										<p class="mt-1 text-xs leading-5 text-gray-500">
											Last seen <time datetime="2023-01-23T13:23Z">3h ago</time>
										</p>
									</div>
									<div class="relative flex-none">
										<button
											type="button"
											class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
											id="options-menu-4-button"
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

										<!--
                                Dropdown menu, show/hide based on menu state.
                      
                                Entering: "transition ease-out duration-100"
                                  From: "transform opacity-0 scale-95"
                                  To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                  From: "transform opacity-100 scale-100"
                                  To: "transform opacity-0 scale-95"
                              -->
										<div
											class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="options-menu-4-button"
											tabindex="-1"
										>
											<!-- Active: "bg-gray-50", Not Active: "" -->
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-4-item-0"
												>Demote User<span class="sr-only">, Courtney Henry</span></a
											>
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-4-item-1"
												>Remove<span class="sr-only">, Courtney Henry</span></a
											>
										</div>
									</div>
								</div>
							</li>
							<li class="flex justify-between gap-x-6 py-5">
								<div class="flex min-w-0 gap-x-4">
									<img
										class="h-12 w-12 flex-none rounded-full bg-gray-50"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div class="min-w-0 flex-auto">
										<p class="text-sm font-semibold leading-6 text-gray-900">
											<a href="#" class="hover:underline">Tom Cook</a>
										</p>
										<p class="mt-1 flex text-xs leading-5 text-gray-500">
											<a href="mailto:tom.cook@example.com" class="truncate hover:underline"
												>tom.cook@example.com</a
											>
										</p>
									</div>
								</div>
								<div class="flex shrink-0 items-center gap-x-6">
									<div class="hidden sm:flex sm:flex-col sm:items-end">
										<p class="text-sm leading-6 text-gray-900">Director of Product</p>
										<div class="mt-1 flex items-center gap-x-1.5">
											<div class="flex-none rounded-full bg-emerald-500/20 p-1">
												<div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
											</div>
											<p class="text-xs leading-5 text-gray-500">Online</p>
										</div>
									</div>
									<div class="relative flex-none">
										<button
											type="button"
											class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
											id="options-menu-5-button"
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

										<!--
                                Dropdown menu, show/hide based on menu state.
                      
                                Entering: "transition ease-out duration-100"
                                  From: "transform opacity-0 scale-95"
                                  To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                  From: "transform opacity-100 scale-100"
                                  To: "transform opacity-0 scale-95"
                              -->
										<div
											class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="options-menu-5-button"
											tabindex="-1"
										>
											<!-- Active: "bg-gray-50", Not Active: "" -->
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-5-item-0"
												>Demote User<span class="sr-only">, Tom Cook</span></a
											>
											<a
												href="#"
												class="block px-3 py-1 text-sm leading-6 text-gray-900"
												role="menuitem"
												tabindex="-1"
												id="options-menu-5-item-1">Remove<span class="sr-only">, Tom Cook</span></a
											>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div
						class="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]"
					></div>
				</div>
				<div class="relative lg:col-span-3">
					<div class="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]"></div>
					<div
						class="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]"
					></div>
					<div
						class="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]"
					></div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
			<button
				type="submit"
				class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Save</button
			>
		</div>
	</form>
</div>
