<script lang="ts">
	export let data;
</script>

<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<h2 class="sr-only" id="profile-overview-title">User Dashboard</h2>
		<div class="bg-white p-6">
			<div class="sm:flex sm:items-center sm:justify-between">
				<div class="sm:flex sm:space-x-5">
					<div class="flex-shrink-0">
						<img
							class="mx-auto h-20 w-20 rounded-full"
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
						<p class="text-sm font-medium text-gray-600">Welcome back,</p>
						<p class="text-xl font-bold text-gray-900 sm:text-2xl">{data.email}</p>
						<p class="text-sm font-medium text-gray-600">Product Designer</p>
					</div>
				</div>
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
					<table class="min-w-full divide-y divide-gray-300">
						<thead>
							<tr>
								<th
									scope="col"
									class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>Role</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Candidates</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Skills</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Status</th
								>
								<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							<tr>
								<td
									class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
									>React Developer</td
								>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">4</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
									>React, Backend, JavaScript</td
								>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Pending</td>
								<td
									class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
								>
									<a href="/profile" class="text-indigo-600 hover:text-indigo-900"
										>Edit<span class="sr-only">Edit row</span></a
									>
								</td>
							</tr>

							<!-- More people... -->
						</tbody>
					</table>
					<button
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
</div>
