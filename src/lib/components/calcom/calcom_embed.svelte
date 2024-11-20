<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let height = '800px';
	let isAuthenticated = false;
	let isLoading = true;
	let error: string | null = null;
	let currentView = '/auth/login';
	let unsubscribe: (() => void) | null = null;
	let iframe: HTMLIFrameElement;

	// Configuration
	const CAL_URL = 'http://localhost:5174';
	const ALLOWED_VIEWS = ['/auth/login', '/bookings/upcoming', '/settings/my-account'];

	function handleMessage(event: MessageEvent) {
		if (event.origin === CAL_URL) {
			console.log('Received message:', event.data);

			// Handle height adjustments
			if (event.data.type === 'calendar-height') {
				height = `${event.data.height}px`;
			}

			// Handle authentication state changes
			if (event.data.type === 'cal:session:connected') {
				isAuthenticated = true;
				currentView = '/bookings/upcoming';
				error = null;
				isLoading = false;
			}

			if (event.data.type === 'cal:session:disconnected') {
				handleSignOut();
			}

			// Handle navigation events
			if (event.data.type === 'navigation:changed') {
				const newPath = event.data.path;
				if (ALLOWED_VIEWS.includes(newPath)) {
					currentView = newPath;
				}
			}
		}
	}

	function handleSignOut() {
		isAuthenticated = false;
		currentView = '/auth/login';
		if (browser) {
			localStorage.removeItem('cal:session');
			// Redirect to Cal.com login page in a new tab
			window.open(`${CAL_URL}/auth/logout`, '_blank');
		}
	}

	// Check if user is already authenticated using localStorage
	function checkExistingSession() {
		if (browser) {
			const calSession = localStorage.getItem('cal:session');
			if (calSession) {
				try {
					const session = JSON.parse(calSession);
					if (session && session.expires && new Date(session.expires) > new Date()) {
						isAuthenticated = true;
						currentView = '/bookings/upcoming';
					} else {
						// Session expired
						localStorage.removeItem('cal:session');
					}
				} catch (e) {
					console.error('Error parsing cal session:', e);
					localStorage.removeItem('cal:session');
				}
			}
			isLoading = false;
		}
	}

	function handleIframeError() {
		error = 'Unable to load Cal.com. Please ensure you are logged in.';
		isLoading = false;
	}

	onMount(() => {
		if (browser) {
			checkExistingSession();
			window.addEventListener('message', handleMessage);
			unsubscribe = () => {
				window.removeEventListener('message', handleMessage);
			};
		}
	});

	onDestroy(() => {
		if (browser && unsubscribe) {
			unsubscribe();
		}
	});

	$: embedUrl = `${CAL_URL}${currentView}?embedType=inline&auth=true`;
</script>

<div class="calendar-embed bg-gruvboxDark-bgH">
	{#if isLoading}
		<div class="loading">Loading...</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
			<a
				href={`${CAL_URL}/auth/login`}
				target="_blank"
				rel="noopener noreferrer"
				class="login-link"
			>
				Login to Cal.com
			</a>
		</div>
	{:else}
		<iframe
			bind:this={iframe}
			src={embedUrl}
			style="width: 100%; height: {height}; border: none; border-radius: 4px;"
			allow="camera; microphone; fullscreen"
			title="Cal.com"
			on:error={handleIframeError}
		/>
	{/if}
</div>

<style>
	.calendar-embed {
		width: 100%;
		min-height: 800px;
		background: white;
		border-radius: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.loading,
	.error {
		height: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}

	.error {
		color: #ef4444;
	}

	.login-link {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #0ea5e9;
		color: white;
		border-radius: 0.25rem;
		text-decoration: none;
	}

	.login-link:hover {
		background-color: #0284c7;
	}
</style>
