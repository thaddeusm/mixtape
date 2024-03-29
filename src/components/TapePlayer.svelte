<script>
	import { onMount } from 'svelte';

	import { setArtwork, getImageColors } from './../artwork.js';

	import TapeCog from './../icons/TapeCog.svelte';
	import Play from './../icons/Play.svelte';
	import Pause from './../icons/Pause.svelte';
	import Next from './../icons/Next.svelte';
	import Previous from './../icons/Previous.svelte';

	import { artwork, artworkColors, music, queue, queuePosition, authorized, playing, mixMeta, mode, loadingTracks } from './../stores.js';

	let artwork_value;
	let artwork_colors_value;
	let music_value;
	let queue_value;
	let queue_position_value;
	let authorized_value;
	let playing_value;
	let mix_meta_value;
	let mode_value;
	let loading_tracks_value;

	const unsubscribeArtwork = artwork.subscribe(value => {
		artwork_value = value;
	});

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
	});

	const unsubscribeQueue = queue.subscribe(value => {
		queue_value = value;
	});

	const unsubscribeQueuePosition = queuePosition.subscribe(value => {
		queue_position_value = value;
	});

	const unsubscribeAuthorized = authorized.subscribe(value => {
		authorized_value = value;
	});

	const unsubscribePlaying = playing.subscribe(value => {
		playing_value = value;
	});

	const unsubscribeMixMeta = mixMeta.subscribe(value => {
		mix_meta_value = value;
	});

	const unsubscribeMode = mode.subscribe(value => {
		mode_value = value;
	});

	const unsubscribeLoadingTracks = loadingTracks.subscribe(value => {
		loading_tracks_value = value;
	});

	export let playable = false;

	let loading = false;

	let duration = 100;
	let currentTime = 0;

	let interval = null;
	let rotation = 0;

	let durations = [];

	$: if (playing_value) {
		startInterval();
	} else {
		clearInterval(interval);
	}

	$: {
		if (queue_position_value > 0) {
			currentTime = durations.slice(0, queue_position_value).reduce((acc, currentValue) => {
				return acc + currentValue;
			});

			if ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)) {
				if (document.hidden) {
					clearInterval(interval);
					pause();
				}
			}
		} else {
			currentTime = 0;
		}
	}

	$: if (queue_value.length) {
		duration = totalDuration();
	}

	// update query params dynamically
	$: {
		if ('URLSearchParams' in window && mode_value == 'edit' && queue_value.length > 0) {
			let searchParams = new URLSearchParams(window.location.search);
			searchParams.set('title', mix_meta_value.title);
			searchParams.set('description', mix_meta_value.description);

			let songs = [];
			for (let i=0; i<queue_value.length; i++) {
				songs.push(queue_value[i].attributes.playParams.id);
			}
			searchParams.set('songs', JSON.stringify(songs));

			let newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();

			history.pushState(null, '', newRelativePathQuery);
		}
	}

	$: portionRemaining = (currentTime / duration) * 100;
	$: portionPassed = 100 - portionRemaining;

	$: leftStyle = `border: ${portionPassed / 3 > 3 ? Math.floor(portionPassed) / 3 : 3}px solid black; transform: rotate(${rotation}deg)`;
	$: rightStyle = `border: ${portionRemaining / 3 > 3 ? Math.floor(portionRemaining) / 3 : 3}px solid black; transform: rotate(${rotation}deg)`;
	$: background = `background: linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%), url('${artwork_value}'); background-position: center; box-shadow: .2rem .2rem 0 ${artwork_colors_value.DarkVibrant || 'black'}, -.2rem -.2rem 0 ${artwork_colors_value.LightMuted || 'white'};`;

	$: actionButtonColor = artwork_colors_value.DarkVibrant;
	$: defaultButtonColor = artwork_colors_value.Muted;

	async function checkQueryParams() {
		if ('URLSearchParams' in window && mode_value !== 'edit') {
			let params = new URLSearchParams(window.location.search);

			if (params.get('title') && params.get('description') && params.get('songs')) {
				loadingTracks.set(true);
				mixMeta.set({
					title: params.get('title'),
					description: params.get('description')
				});

				let songs = JSON.parse(params.get('songs'));

				for (let i=0; i<songs.length; i++) {
					let obj = {
						"song": songs[i]
					};

					if (i == 0) {
						await music_value.setQueue(obj);
					} else {
						await music_value.playLater(obj);
					}

					queue.set(music_value.queue.items);

					await setArtwork(queue_value[0].attributes.artwork.url);
					await getImageColors();
				}

				loadingTracks.set(false);
				duration = await totalDuration();
			} else {
				mode.set('edit');
			}
		}
	}

	function totalDuration() {
		let total = 0;
		durations = [];

		for (let i=0; i<queue_value.length; i++) {
			let item = queue_value[i];
			let trackDuration = item.attributes.durationInMillis / 1000;

			durations.push(trackDuration);

			total += trackDuration;
		}

		return total;
	}

	function startInterval() {
		interval = setInterval(() => {
			currentTime++;

			if (currentTime >= duration + 2) {
				pause();
				reset();
			}

			rotation -= 60;
		}, 1000)
	}

	function reset() {
		queuePosition.set(0);
		duration = 100;
		currentTime = 0;

		clearInterval(interval);
		rotation = 0;
	}

	async function play() {
		loading = true;
		await music_value.play();
		loading = false;
	}

	async function pause() {
		loading = true;
		await music_value.pause();
		loading = false;
	}

	async function stop() {
		loading = true;
		await music_value.stop();
		loading = false;
	}

	async function next() {
		loading = true;
		await music_value.changeToMediaAtIndex(queue_position_value + 1);
		loading = false;
	}

	async function previous() {
		loading = true;
		await music_value.changeToMediaAtIndex(queue_position_value - 1);
		loading = false;
	}

	function startListeners() {
		music_value.addEventListener('playbackStateDidChange', () => {
			if (music_value.isPlaying) {
				playing.set(true);
			} else {
				playing.set(false);
			}
		});

		music_value.addEventListener('queuePositionDidChange', async () => {
			queuePosition.set(music_value.queue.position);

			await setArtwork(queue_value[queue_position_value].attributes.artwork.url);
			await getImageColors();
		});

		music_value.addEventListener('mediaPlaybackError', () => {
			playing.set(false);
		});
	}

	onMount(() => {
		if (playable) {
			checkQueryParams();
			startListeners();
		}
	});
</script>

<div class="container">
	<section id="tape" style={background}>
		<aside id="leftSpool" style={leftStyle}>
			<TapeCog />
		</aside>
		<section id="center">

		</section>
		<aside id="rightSpool" style={rightStyle}>
			<TapeCog />
		</aside>
		<section id="line"></section>
		<section id="controls">
			{#if $authorized && $queue.length > 0}
				<button class="simple" on:click={previous} disabled={$queuePosition == 0 || loading}>
					<Previous color={defaultButtonColor} width={'1.5rem'} height={'1.5rem'} />
				</button>
				{#if !$playing}
					<button class="simple" on:click={play} disabled={loading}>
						<Play color={actionButtonColor} width={'2rem'} height={'2rem'} />
					</button>
				{:else}
					<button class="simple" on:click={pause} disabled={loading}>
						<Pause color={actionButtonColor} width={'2rem'} height={'2rem'} />
					</button>
				{/if}
				<button class="simple" on:click={next} disabled={$queuePosition == $queue.length - 1 || loading}>
					<Next color={defaultButtonColor} width={'1.5rem'} height={'1.5rem'} />
				</button>
			{/if}
		</section>
	</section>
</div>

<style>
	@media screen and (max-width: 1300px) {
		#tape {
			width: 20rem;
			max-width: 310px;
			height: 13rem;
			grid-template-columns: 1fr 5rem 5rem 5rem 1fr;
		}

		#line {
			height: 405%;
			margin-top: -35%;
		}
	}

	@media screen and (min-width: 1301px) {
		#tape {
			width: 31rem;
			height: 21rem;
			grid-template-columns: 1fr 8rem 6rem 8rem 1fr;
		}

		#line {
			height: 405%;
			margin-top: -40%;
		}
	}

	@keyframes rotate {
		from {transform: rotate(0deg);}
		to {transform: rotate(360deg);}
	}

	.container {
		box-sizing: content-box;
	}

	#tape {
		border: .1rem solid black;
		border-radius: 1rem;
		margin: 0 auto;
		display: grid;
		grid-template-rows: 70% 10% 20%;
		grid-template-areas:
			". left . right ."
			". line line line ."
			". controls controls controls .";
		align-items: center;
		justify-content: center;
		background-repeat: no-repeat;
		transition: box-shadow .5s ease-in;
	}

	aside {
		width: 4rem;
		height: 4rem;
		border-radius: 4.5rem;
		background: transparent;
		transition: all .98s linear;
		z-index: 10;
	}

	#leftSpool {
		grid-area: left;
	}

	#rightSpool {
		grid-area: right;
		justify-self: right;
	}

	#line {
		grid-area: line;
		border-bottom: 1px solid black;
		border-left: 1px solid black;
		border-right: 1px solid black;
		align-self: center;
	}

	#controls {
		grid-area: controls;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
	}
</style>
