<script>
	import { onMount } from 'svelte';

	import TapePlayer from './components/TapePlayer.svelte';

	import { artworkColors } from './stores.js';

	let artwork_colors_value;

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	$: colors = `background: linear-gradient(to bottom right, ${artwork_colors_value.DarkVibrant} 0%, ${artwork_colors_value.LightVibrant} 100%)`;

	let initialized = false;
	let music = null;

	async function getToken() {
		let res;
		try {
			res = await fetch('/api/generateMusicKitToken.js', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
				  'Content-Type': 'application/json',
				  'cache-control': 'no-cache'
				},
				body: JSON.stringify('test')
			});

			let token = await res.json();

			return token;
		} catch(err) {
			console.log(err);
		}
	}

	async function initalizeMusicKit() {
		MusicKit.configure({
		    developerToken: await getToken(),
				app: {
		      name: 'Mixtape Message',
		      build: '0.0.1'
		    }
		});

		music = await MusicKit.getInstance();

		return true;
	}

	async function getArtists() {
		music.authorize().then(async() => {
			let results = await music.api.library;

			let artists = await results.artists({limit: 50, offset: 49});

			console.log(artists)
		});
	}

	onMount(async () => {
		initialized = await initalizeMusicKit();

		await getArtists();
	});
</script>

<svelte:head>
	<meta name="theme-color" content={artwork_colors_value.LightVibrant} media="(prefers-color-scheme: light)">
	<meta name="theme-color" content={artwork_colors_value.DarkVibrant} media="(prefers-color-scheme: dark)">
</svelte:head>

<main style={colors}>
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
