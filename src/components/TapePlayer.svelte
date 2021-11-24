<script>
	import { onMount } from 'svelte';

	import TapeCog from './../icons/TapeCog.svelte';

	import { artworkColors } from './../stores.js';

	let artwork_colors_value;

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	export let music;

	let playing = false;
	let playbackStarted = false;

	let duration = 100;
	let currentTime = 0;

	let interval;
	let rotation = 0;

	let artwork = '';

	let queue = [];
	let durations = [];
	let queuePosition = 0;

	$: if (durations.length > 0 && queuePosition > 0) {
		currentTime = durations.slice(0, queuePosition).reduce((acc, currentValue) => {
			return acc + currentValue;
		});
	}

	$: portionRemaining = (currentTime / duration) * 100;
	$: portionPassed = 100 - portionRemaining;

	$: leftStyle = `border: ${portionPassed / 3 > 3 ? Math.floor(portionPassed) / 3 : 3}px solid black; transform: rotate(${rotation}deg)`;
	$: rightStyle = `border: ${portionRemaining / 3 > 3 ? Math.floor(portionRemaining) / 3 : 3}px solid black; transform: rotate(${rotation}deg)`;
	$: background = `background: linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%), url('${artwork}')`;

	$: buttonBackground = `background: ${artwork_colors_value.LightVibrant}`;

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

			console.log(artwork_colors_value);
		} catch(err) {
			console.log(err);
		}
	}

	async function getRecentMusic() {
		music.authorize().then(async() => {
			let results = await music.api.library;

			// console.log(await results.search('love', {limit: 10, types: 'songs'}));
			console.log(await results.playlists({limit: 5}));

			let recentlyAdded = await results.recentlyAdded();

			let track = recentlyAdded[0].attributes.playParams;

			let artworkUrl = recentlyAdded[0].attributes.artwork.url;

			let arr = artworkUrl.split('{w}x{h}');

			artwork = arr[0] + '500x500cc.jpeg';

			await getImageColors(artwork);

			let obj = {
				[track.kind]: track.id
			};

			await music.setQueue(obj);

			queue = music._player._queue.items;

			duration = await totalDuration();
		});
	}

	async function totalDuration() {
		let total = 0;

		for (let i=0; i<queue.length; i++) {
			let item = queue[i];
			let trackDuration = item.attributes.durationInMillis / 1000;

			durations.push(trackDuration);

			total += trackDuration;
		}

		return total;
	}

	function startInterval() {
		interval = setInterval(() => {
			currentTime++;

			queuePosition = music._player._queue._position;

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

		music.play();
	}

	function pause() {
		playing = false;
		clearInterval(interval);

		music.pause();
	}

	function stop() {
		playing = false;
		clearInterval(interval);

		music.stop();
	}

	function next() {
		music.changeToMediaAtIndex(queuePosition + 1);

		if (!playing) {
			playing = true;
			startInterval();
		}
		queuePosition = music._player._queue._position;
	}

	function previous() {
		music.changeToMediaAtIndex(queuePosition - 1);

		if (!playing) {
			playing = true;
			startInterval();
		}
		queuePosition = music._player._queue._position;
	}

	onMount(async() => {
		await getRecentMusic();
	});
</script>

<div class="container">
	<section id="tape" style={background}>
		<aside id="leftSpool" style={leftStyle}>
			<!-- <h1>x</h1> -->
			<TapeCog />
		</aside>
		<section id="center">

		</section>
		<aside id="rightSpool" style={rightStyle}>
			<!-- <h1>x</h1> -->
			<TapeCog />
		</aside>
		<section id="line">
		</section>
	</section>
	<section id="buttons">
		<button style={buttonBackground} on:click={play} disabled={playing}>play</button>
		<button style={buttonBackground} on:click={pause} disabled={!playing}>pause</button>
		<button style={buttonBackground} on:click={next} disabled={!playbackStarted || queuePosition == queue.length - 1}>next</button>
		<button style={buttonBackground} on:click={previous} disabled={!playbackStarted || queuePosition == 0}>previous</button>
	</section>
	<ul>
		{#each queue as item, index}
			{#if queuePosition == index}
				<li><strong>{item.attributes.name} by {item.attributes.artistName}</strong></li>
			{/if}
		{/each}
	</ul>
</div>

<style>
	@media screen and (max-width: 450px) {
		#tape {
			width: 18rem;
			height: 11rem;
		}

		#line {
			height: 420%;
			margin-top: -35%;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		#tape {
			width: 26rem;
			height: 16rem;
		}

		#line {
			height: 400%;
			margin-top: -42%;
		}
	}

	@media screen and (min-width: 801px) {
		#tape {
			width: 28rem;
			height: 17rem;
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

	h1 {
		text-anchor: middle;
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
		grid-template-rows: 90% 10%;
		grid-template-areas:
			". left . right ."
			". line line line .";
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
		align-self: flex-start;
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

	h1 {
		display: inline-block;
	}

	#buttons {
		text-align: center;
		padding: 1rem;
	}
</style>
