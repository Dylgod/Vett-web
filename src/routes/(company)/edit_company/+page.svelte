<script>
	let invisible = false;
	let addAdmin = false;
</script>

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
					<label for="logo" class="block text-sm font-medium leading-6 text-gray-900">Logo</label>
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
						<div class="mt-2 sm:max-w-md">
							<div class="mt-2 sm:max-w-md">
								<div class="relative mt-2">
									<button
										type="button"
										class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
										aria-haspopup="listbox"
										aria-expanded="true"
										aria-labelledby="listbox-label"
									>
										<span class="block truncate">Tom Cook</span>
										<span
											class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
										>
											<svg
												class="h-5 w-5 text-gray-400"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>

									<!--
									Select popover, show/hide based on select state.
							  
									Entering: ""
									  From: ""
									  To: ""
									Leaving: "transition ease-in duration-100"
									  From: "opacity-100"
									  To: "opacity-0"
								  -->
									<ul
										class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
										tabindex="-1"
										role="listbox"
										aria-labelledby="listbox-label"
										aria-activedescendant="listbox-option-3"
									>
										<!--
									  Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
							  
									  Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
									-->
									<!-- role="option" -->
										<li
											class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
											id="listbox-option-0"
											
										>
											<!-- Selected: "font-semibold", Not Selected: "font-normal" -->
											<span class="block truncate font-normal">Wade Cooper</span>

											<!--
										Checkmark, only display for selected option.
							  
										Highlighted: "text-white", Not Highlighted: "text-indigo-600"
									  -->
											<span
												class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
											>
												<svg
													class="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														fill-rule="evenodd"
														d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
														clip-rule="evenodd"
													/>
												</svg>
											</span>
										</li>
										<!-- More items... -->
									</ul>
								</div>
							</div>
							<div class="mt-3 flex items-center justify-end gap-x-6">
								<button type="button" class="text-sm font-semibold leading-6 text-gray-900"
									>Cancel</button
								>
								<button
									type="submit"
									class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>Save</button
								>
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

			<div class="mx-auto max-w-2xl lg:max-w-7xl bg-white">
				<div class="mt-10 sm:mt-16">
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
												invisible = !invisible;
												addAdmin = !addAdmin;
											}}
											type="button"
											class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											>+ Add Admin</button
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
											on:click={() => (invisible = !invisible)}
											type="button"
											class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											>+ Add User</button
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
														<a href="/edit_company" class="hover:underline">Leslie Alexander</a>
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
													<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">
														Co-Founder / CEO
													</p>
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

													<div
														class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
														role="menu"
														aria-orientation="vertical"
														aria-labelledby="options-menu-0-button"
														tabindex="-1"
													>
														<a
															href="/edit_company"
															class="block px-3 py-1 text-sm leading-6 text-gray-900"
															role="menuitem"
															tabindex="-1"
															id="options-menu-0-item-0"
															>Demote User<span class="sr-only">, Leslie Alexander</span></a
														>
														<a
															href="/edit_company"
															class="block px-3 py-1 text-sm leading-6 text-gray-900"
															role="menuitem"
															tabindex="-1"
															id="options-menu-0-item-1"
															>Remove<span class="sr-only">, Leslie Alexander</span></a
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
														<a href="/edit_company" class="hover:underline">Leslie Alexander</a>
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
													<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">
														Co-Founder / CEO
													</p>
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

													<div
														class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
														role="menu"
														aria-orientation="vertical"
														aria-labelledby="options-menu-0-button"
														tabindex="-1"
													>
														<a
															href="/edit_company"
															class="block px-3 py-1 text-sm leading-6 text-gray-900"
															role="menuitem"
															tabindex="-1"
															id="options-menu-0-item-0"
															>Promote User<span class="sr-only">, Leslie Alexander</span></a
														>
														<a
															href="/edit_company"
															class="block px-3 py-1 text-sm leading-6 text-gray-900"
															role="menuitem"
															tabindex="-1"
															id="options-menu-0-item-1"
															>Remove<span class="sr-only">, Leslie Alexander</span></a
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
	</form>
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
							<form class="p-4 md:p-5 flex flex-col">
								<div class="gap-4 mb-4">
									<div class="">
										<label
											for="name"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>Email</label
										>
										<input
											type="text"
											name="modalemail"
											id="modalemail"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder="Type admin email"
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
							<form class="p-4 md:p-5 flex flex-col">
								<div class="gap-4 mb-4">
									<div class="">
										<label
											for="name"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>Email</label
										>
										<input
											type="text"
											name="modalemail"
											id="modalemail"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder="Type user email"
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
</div>
