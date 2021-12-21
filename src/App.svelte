<script>
	import { onMount } from 'svelte';
	import Header from './components/Header.svelte';
	import TapePlayer from './components/TapePlayer.svelte';
	import Description from './components/Description.svelte';
	import Playlist from './components/Playlist.svelte';
	import Footer from './components/Footer.svelte';

	import { artworkColors, music, authorized, colorPreference, mixMeta } from './stores.js';

	let artwork_colors_value;
	let music_value;
	let authorized_value;
	let color_preference_value;

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
	});

	const unsubscribeAuthorized = authorized.subscribe(value => {
		authorized_value = value;
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
				}
			});

			let token = await res.json();

			return token;
		} catch(err) {
			console.log(err);
		}
	}

	async function initalizeMusicKit() {
		await MusicKit.configure({
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
			authorized.set(true);
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
				authorized.set(true);
			} else {
				authorized.set(false);
			}
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setColorPreference);
		setColorPreference();
	});
</script>

<svelte:head>
	<meta name="theme-color" content={artwork_colors_value.LightVibrant} media="(prefers-color-scheme: light)">
	<meta name="theme-color" content={artwork_colors_value.DarkVibrant} media="(prefers-color-scheme: dark)">
	{#if $mixMeta.title !== 'Mixtape Title'}
		<title>
			 Mixtape | {$mixMeta.title}
		</title>
	{:else}
		<title>
			Mixtape
		</title>
	{/if}
</svelte:head>

<Header />
<main>
	{#await initialized}
		<h1>initializing...</h1>
	{:then}
		{#if !$authorized}
			<TapePlayer />
			<section id="authorization">
				<p>A subscription to Apple Music is required.</p>
				<section id="authorizationButtonContainer">
					<button class="call-to-action" on:click={authorize}>
						Authorize
					</button>
				</section>
				<p>
					Don't have a subscription?
				</p>
				<p>
					<a href="https://www.apple.com/apple-music/" target="_blank">Try Apple Music</a>
				</p>
			</section>
		{:else}
			<TapePlayer playable={true} />
			<Description />
			<Playlist />
		{/if}
	{/await}
</main>
<Footer />

<style>
	main {
		text-align: center;
		padding-top: 7rem;
	}

	#authorization {
		margin: 15% 7%;
	}

	#authorizationButtonContainer {
		margin: 5% auto 15% auto;
	}
</style>
