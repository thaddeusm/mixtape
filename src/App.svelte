<script>
	import { onMount } from 'svelte';
	import TapePlayer from './components/TapePlayer.svelte';
	import Playlist from './components/Playlist.svelte';
	import { artworkColors, music, state, colorPreference } from './stores.js';

	let artwork_colors_value;
	let music_value;
	let state_value;
	let color_preference_value;

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
	});

	const unsubscribeState = state.subscribe(value => {
		state_value = value;
	});

	const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

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

	async function authorize() {
		music_value.authorize().then(() => {
			console.log('authorized');
		});
	}

	function setColorPreference() {
		let preference = 'light';

		if (window.matchMedia) {
	    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
	      preference = 'dark';
	    }
	  }

		colorPreference.set(preference);
	}

	onMount(async () => {
		initialized = await initalizeMusicKit();

		if (initialized) {
			if (music_value.isAuthorized) {
				state.set('authorized');
			} else {
				state.set('initialized');
			}
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorPreference);
		setColorPreference();
	});
</script>

<svelte:head>
	<meta name="theme-color" content={artwork_colors_value.LightVibrant} media="(prefers-color-scheme: light)">
	<meta name="theme-color" content={artwork_colors_value.DarkVibrant} media="(prefers-color-scheme: dark)">
</svelte:head>

<header>
	<h1>Mixtape</h1>
</header>
<main>
	{#await initialized}
		<h1>initializing...</h1>
	{:then}
		{#if $state == 'initialized'}
			<TapePlayer
				playable={false}
			/>
			<section id="authorization">
				<p>a subscription to Apple Music is required</p>
				<p>to listen:</p>
				<section id="authorizationButtonContainer">
					<button class="call-to-action" on:click={authorize}>
						Authorize
					</button>
				</section>
			</section>
		{:else if $state == 'authorized'}
			<TapePlayer />
			<Playlist />
		{/if}
	{/await}
</main>

<style>
	header {
		padding: 5%;
	}

	main {
		text-align: center;
	}

	#authorization {
		padding: 10% 5%;
	}
</style>
