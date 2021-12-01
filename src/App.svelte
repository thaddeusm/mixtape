<script>
	import { onMount } from 'svelte';
	import TapePlayer from './components/TapePlayer.svelte';
	import { artworkColors, music, state } from './stores.js';

	let artwork_colors_value;
	let music_value;
	let state_value;

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
	});

	const unsubscribeState = state.subscribe(value => {
		state_value = value;
	});

	$: colors = `background: linear-gradient(to bottom right, ${artwork_colors_value.DarkVibrant} 0%, ${artwork_colors_value.LightVibrant} 100%)`;

	let initialized;

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

		music.set(await MusicKit.getInstance());

		return true;
	}

	onMount(async () => {
		initialized = await initalizeMusicKit();

		if (initialized) {
			state.set('initialized');
		}
	});
</script>

<svelte:head>
	<meta name="theme-color" content={artwork_colors_value.LightVibrant} media="(prefers-color-scheme: light)">
	<meta name="theme-color" content={artwork_colors_value.DarkVibrant} media="(prefers-color-scheme: dark)">
</svelte:head>

<main>
	{#await initialized}
		<h1>initializing...</h1>
	{:then}
		{#if $state == 'initialized'}
			<TapePlayer
				music={$music}
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
