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
	let mix_meta_value;

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });

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
	let storedMixtapes = [];

	async function getStoredMixtapes() {
		let keys = await Object.keys(localStorage);
		let values = await Object.values(localStorage);

		for (let i=0; i<keys.length; i++) {
			if (keys[i].indexOf('mix: ') !== -1) {
				storedMixtapes.push(values[i]);
			}
		}

		console.log(storedMixtapes);
	}

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

		await getStoredMixtapes();
	});
</script>

<svelte:head>
	<meta name="theme-color" content={artwork_colors_value.LightVibrant} media="(prefers-color-scheme: light)">
	<meta name="theme-color" content={artwork_colors_value.DarkVibrant} media="(prefers-color-scheme: dark)">
	<title>
		{$mixMeta.title}
	</title>
</svelte:head>

<div class="container">
	<header>
		<Header />
	</header>
	<main class={$authorized ? 'authorized' : 'unauthorized'}>
		{#await initialized then data}
			{#if !$authorized}
				<section id="tapePlayer">
					<TapePlayer />
				</section>
				<section id="authorization">
					<p>A subscription to Apple Music is required to access {$mixMeta.title}.</p>
					<section id="authorizationButtonContainer">
						<button class="call-to-action" on:click={authorize}>
							Sign in
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
				<section id="tapePlayer">
					<TapePlayer playable={true} />
				</section>
				<section id="description">
					<Description />
				</section>
				<section id="playlist">
					<Playlist />
				</section>
			{/if}
		{/await}
	</main>
	<footer>
		<Footer />
	</footer>
</div>

<style>
@media screen and (max-width: 1100px) {
	.container {
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			"header"
			"main"
			"footer";
	}

	.authorized {
		grid-template-rows: auto auto 1fr;
		grid-template-areas:
			"tapePlayer"
			"description"
			"playlist";
		align-items: center;
	}

	.unauthorized {
		grid-template-rows: 1fr 1fr 1fr;
		grid-template-areas:
			"tapePlayer"
			"authorization"
			"authorization";
		align-items: center;
	}

	main {
		padding-top: 7rem;
	}

	#playlist {
		align-self: flex-end;
	}
}

@media screen and (min-width: 1101px) {
	.container {
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 30% 70%;
		grid-template-areas:
			"header header"
			"main main"
			"footer .";
	}

	.authorized {
		grid-template-rows: auto 500px;
		grid-template-columns: 30% 70%;
		grid-template-areas:
			"tapePlayer description"
			"playlist description";
	}

	.unauthorized {
		grid-template-rows: 1fr;
		grid-template-columns: 30% 70%;
		grid-template-areas:
			"tapePlayer authorization";
		align-items: center;
	}

	#playlist {
		align-self: flex-end;
	}

	#tapePlayer {
		align-self: center;
	}

	#description {
		align-self: flex-start;
		padding-top: 3rem;
	}
}

	.container {
		display: grid;
		height: 100%;
	}

	header {
		grid-area: header;
	}

	main {
		text-align: center;
		grid-area: main;
	}

	.authorized {
		display: grid;
	}

	.unauthorized {
		display: grid;
	}

	#authorization {
		margin: 15% 7%;
		grid-area: authorization;
	}

	#authorizationButtonContainer {
		margin: 5% auto 15% auto;
	}

	#tapePlayer {
		grid-area: tapePlayer;
	}

	#description {
		grid-area: description;
	}

	#playlist {
		grid-area: playlist;
	}

	footer {
		grid-area: footer;
	}
</style>
