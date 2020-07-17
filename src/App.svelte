<script>
	import { onMount } from 'svelte';

	import TapePlayer from './components/TapePlayer.svelte';

	let initialized = false;
	let music;

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

	async function getRecentMusic() {
		music.authorize().then(async() => {
			let results = await music.api.library;

			let recentlyAdded = await results.recentlyAdded();

			let track = recentlyAdded[0].attributes.playParams;

			let obj = {
				[track.kind]: track.id 
			};

			let queue = await music.setQueue(obj);

			music.play();

			// setInterval(async () => {
			// 	console.log(await music._player._currentPlayer.audio.currentTime)
			// }, 1000)
		});
	}

	onMount(async () => {
		initialized = await initalizeMusicKit();
	})
</script>

<main>
	{#await initialized}
		<h1>initializing...</h1>
	{:then}
		<h1>initialized</h1>
		<button on:click={getRecentMusic}>get recent music</button>
		<TapePlayer />
	{/await}
</main>

<style>
	
</style>
