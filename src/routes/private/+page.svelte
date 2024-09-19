<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ users, supabase, user } = data);

	let handleSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
	$: handleSubmit = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const user = (new FormData(form).get('user') ?? '') as string;
		if (!user) return;

		const { error } = await supabase.from('users').insert({ user });
		if (error) console.error(error);

		invalidate('supabase:db:users');
		form.reset();
	};
</script>

<h1>Private page for user: {user?.email}</h1>
<h2>Notes</h2>
<ul>
	{#each users as user}
		<li>{user.first_name}</li>
	{/each}
</ul>
<form on:submit={handleSubmit}>
	<label>
		Add a user
		<input name="user" type="text" />
	</label>
</form>