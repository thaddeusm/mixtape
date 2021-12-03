<script>
	import { onMount } from 'svelte';

	import TapeCog from './../icons/TapeCog.svelte';
	import Play from './../icons/Play.svelte';
	import Pause from './../icons/Pause.svelte';
	import Next from './../icons/Next.svelte';
	import Previous from './../icons/Previous.svelte';

	import { artworkColors, music, queue, queuePosition } from './../stores.js';

	let artwork_colors_value;
	let music_value;
	let queue_value;
	let queue_position_value;

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

	export let playable = true;

	let playing = false;
	let playbackStarted = false;

	let duration = 100;
	let currentTime = 0;

	let interval;
	let rotation = 0;

	let artwork = '';

	let durations = [];

	$: if (durations.length > 0 && queue_position_value > 0) {
		currentTime = durations.slice(0, queue_position_value).reduce((acc, currentValue) => {
			return acc + currentValue;
		});
	}

	$: portionRemaining = (currentTime / duration) * 100;
	$: portionPassed = 100 - portionRemaining;

	$: leftStyle = `border: ${portionPassed / 3 > 3 ? Math.floor(portionPassed) / 3 : 3}px solid black; transform: rotate(${rotation}deg)`;
	$: rightStyle = `border: ${portionRemaining / 3 > 3 ? Math.floor(portionRemaining) / 3 : 3}px solid black; transform: rotate(${rotation}deg)`;
	$: background = `background: linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%), url('${artwork}')`;

	$: actionButtonColor = artwork_colors_value.Vibrant;
	$: defaultButtonColor = artwork_colors_value.DarkVibrant;

	async function getImageColors(url) {
		let data = {
			photoURL: url
		};

		let res;
		try {
			res = await fetch('/api/parseImageColors.js', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
				  'Content-Type': 'application/json',
				  'cache-control': 'no-cache'
				},
				body: JSON.stringify(data)
			});

			artworkColors.set(await res.json());
			console.log(artwork_colors_value)
		} catch(err) {
			console.log(err);
		}
	}

	async function getRecentMusic() {
		music_value.authorize().then(async() => {
			let results = await music_value.api.library;

			let recentlyAdded = await results.recentlyAdded();

			let track = recentlyAdded[0].attributes.playParams;

			let artworkUrl = recentlyAdded[0].attributes.artwork.url;

			let arr = artworkUrl.split('{w}x{h}');

			artwork = arr[0] + '500x500cc.jpeg';

			await getImageColors(artwork);

			let obj = {
				[track.kind]: track.id
			};

			await music_value.setQueue(obj);

			queue.set(music_value._player._queue.items);

			duration = await totalDuration();
		});
	}

	async function totalDuration() {
		let total = 0;

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

			queuePosition.set(music_value._player._queue._position);

			if (currentTime >= duration) {
				stop();
			}

			rotation -= 60;
		}, 1000)
	}

	function play() {
		playbackStarted = true;
		playing = true;
		startInterval();
		music_value.play();
	}

	function pause() {
		playing = false;
		clearInterval(interval);
		music_value.pause();
	}

	function stop() {
		playing = false;
		clearInterval(interval);
		music_value.stop();
	}

	function next() {
		music_value.changeToMediaAtIndex(queue_position_value + 1);

		if (!playing) {
			playing = true;
			startInterval();
		}
		queuePosition.set(music_value._player._queue._position);
	}

	function previous() {
		music_value.changeToMediaAtIndex(queue_position_value - 1);

		if (!playing) {
			playing = true;
			startInterval();
		}
		queuePosition.set(music_value._player._queue._position);
	}

	onMount(() => {
		getRecentMusic();
	})
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
		<section id="line">
		</section>
		<section id="controls">
			{#if playable}
				<button on:click={previous} disabled={!playbackStarted || queuePosition == 0}>
					<Previous color={defaultButtonColor} width={'1.5rem'} height={'1.5rem'} />
				</button>
				{#if !playing}
					<button on:click={play}>
						<Play color={actionButtonColor} width={'2rem'} height={'2rem'} />
					</button>
				{:else}
					<button on:click={pause}>
						<Pause color={actionButtonColor} width={'2rem'} height={'2rem'} />
					</button>
				{/if}
				<button on:click={next} disabled={!playbackStarted || queuePosition == queue.length - 1}>
					<Next color={defaultButtonColor} width={'1.5rem'} height={'1.5rem'} />
				</button>
			{/if}
		</section>
	</section>
</div>

<style>
	@media screen and (max-width: 450px) {
		#tape {
			width: 21rem;
			height: 14rem;
		}

		#line {
			height: 420%;
			margin-top: -35%;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		#tape {
			width: 33rem;
			height: 21rem;
		}

		#line {
			height: 400%;
			margin-top: -42%;
		}
	}

	@media screen and (min-width: 801px) {
		#tape {
			width: 35rem;
			height: 22rem;
		}

		#line {
			height: 400%;
			margin-top: -45%;
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
		grid-template-columns: 1fr auto 1fr auto 1fr;
		grid-template-rows: 70% 10% 20%;
		grid-template-areas:
			". left . right ."
			". line line line ."
			". controls controls controls .";
		align-items: center;
		justify-content: center;
		background-repeat: no-repeat;
		box-shadow: .05rem .05rem 0 black, -.05rem -.05rem 0 white;
	}

	#line {
		grid-area: line;
		border-bottom: 3px solid black;
		border-left: 3px solid black;
		border-right: 3px solid black;
		align-self: center;
	}

	aside {
		width: 4rem;
		height: 4rem;
		border-radius: 4.5rem;
		background: transparent;
		text-align: center;
		transition: all .98s linear;
		z-index: 10;
	}

	#leftSpool {
		grid-area: left;
	}

	#rightSpool {
		grid-area: right;
	}

	#controls {
		grid-area: controls;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
	}

	#controls button {
		display: block;
		background: none;
		outline: none;
		border: none;
	}
</style>
