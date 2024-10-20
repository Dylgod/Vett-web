<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	type Admin = {
		uuid: string;
		name: string | undefined;
		email: string | undefined;
		// logo: any?
	};

	export let admin: Admin;
	export let rank: string;
	export let index: number;

	let isMenuOpen = false;
	let menuButton: HTMLButtonElement;
	let menuContent: HTMLDivElement;

	const dispatch = createEventDispatcher();

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

    function closeMenu(event: MouseEvent) {
    if (!menuButton || !menuContent) return;
    if (!menuButton.contains(event.target as Node) && !menuContent.contains(event.target as Node)) {
        isMenuOpen = false;
    }
}

	function handleAction(action: 'demote' | 'delete') {
		dispatch(action, { admin, index });
		isMenuOpen = false;
	}

    onMount(() => {
        document.addEventListener('click', closeMenu);
    });

    onDestroy(() => {
        document.removeEventListener('click', closeMenu);
    });
</script>

<li class="flex justify-between py-5">
	<div class="flex min-w-0 gap-x-4 flex-grow overflow-hidden">
		<img
			class="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50"
			src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			alt=""
		/>
		<div class="min-w-0 flex-auto">
			<p class="text-sm font-semibold leading-6 text-gray-900 truncate">
				<a href="/company" class="hover:underline">{admin.name}</a>
			</p>
			<p class="mt-1 text-xs leading-5 text-gray-500 truncate">
				<a href="mailto:leslie.alexander@example.com" class="hover:underline">{admin.email}</a>
			</p>
		</div>
	</div>
	<div class="flex shrink-0 items-center gap-x-4 ml-4">
		<div class="hidden sm:flex sm:flex-col sm:items-end">
			<p class="text-sm leading-6 text-gray-900 whitespace-nowrap">
				{rank}
			</p>
		</div>
		<div class="relative flex-none">
			<button
				bind:this={menuButton}
				type="button"
				class="block p-2 text-gray-500 hover:text-gray-900"
				id="options-menu-{index}-button"
				aria-expanded={isMenuOpen}
				aria-haspopup="true"
				on:click={toggleMenu}
			>
				<span class="sr-only">Open options</span>
				<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
					/>
				</svg>
			</button>

			{#if isMenuOpen}
				<div
					bind:this={menuContent}
					class="absolute right-0 z-10 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
					style="top: 100%; margin-top: 0.5rem;"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu-{index}-button"
					tabindex="-1"
				>
					<button
						on:click={() => handleAction('demote')}
						class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-100/50 w-full text-left"
						role="menuitem"
						tabindex="-1"
					>
						Demote User<span class="sr-only">, {admin.name}</span>
					</button>
					<button
						on:click={() => handleAction('delete')}
						class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-100/50 w-full text-left"
						role="menuitem"
						tabindex="-1"
					>
						Remove<span class="sr-only">, {admin.name}</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
</li>
