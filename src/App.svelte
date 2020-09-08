<script>
	import { onMount } from 'svelte';

	import TapePlayer from './components/TapePlayer.svelte';

	let initialized = false;
	let music = null;

	async function initalizeMusicKit() {
		MusicKit.configure({
		    developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJBQ1RMVUNKTUgifQ.eyJpYXQiOjE1OTEwMzY5MjcsImV4cCI6MTYwNjU4ODkyNywiaXNzIjoiN0ozQk5SWVoyNiJ9.tFxM5qPN-RJDVTB-4IuIjCXBc7YpvpICYXO_fzdfYnkrfktR5AyWVhTlrXyJMCsLIGoRVMd0Roy9kYcoUXINgg',
		    app: {
		      name: 'Mixtape Message',
		      build: '0.0.1'
		    }
		});

		music = await MusicKit.getInstance();

		return true;
	}

	onMount(async () => {
		initialized = await initalizeMusicKit();
	});
</script>

<main>
	{#await initialized}
		<h1>initializing...</h1>
	{:then}
		{#if music}
			<TapePlayer  
				{music}
			/>
		{/if}
	{/await}
</main>

<style>
	main {
		display: grid;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
